'use client'

// import ContractReviewPopup from "@/app/ContractReview/page";
import React, { useEffect, useState, useCallback } from "react";
import ContractReviewPopup from "../ContractReview/page";

const SellerPage = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);

  const fetchSellerAgreements = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/seller/agreements/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched agreements:', data);
      setAgreements(data);
      setLastRefresh(new Date());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching seller agreements:", error);
      setError("Failed to fetch agreements. Please try again later.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSellerAgreements();

    const intervalId = setInterval(() => {
      fetchSellerAgreements();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [fetchSellerAgreements]);

  const recentAgreement = agreements.length > 0 ? agreements[0] : null;

  const handleRefresh = () => {
    fetchSellerAgreements();
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAgreementUpdate = () => {
    fetchSellerAgreements(); // Refresh data after agreement update
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Seller Dashboard</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold mb-4">Your Most Recent Listing</h2>
        {recentAgreement ? (
          <div className="space-y-3">
            <p><strong className="text-gray-700">Property:</strong> {recentAgreement.parcel_number || 'N/A'}</p>
            <p><strong className="text-gray-700">Listed Price:</strong> ${recentAgreement.agreed_amount?.toLocaleString() || 'N/A'}</p>
            <p><strong className="text-gray-700">Status:</strong> {recentAgreement.seller_agreed ? 'Agreed' : 'Pending'}</p>
            <p>
              <strong className="text-gray-700">Seller Agreement Status:</strong>
              <span className={`ml-2 px-2 py-1 rounded ${recentAgreement.seller_agreed ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                {recentAgreement.seller_agreed ? 'Agreed' : 'Disagreed'}
              </span>
            </p>
            <p><strong className="text-gray-700">Last Updated:</strong> {new Date(recentAgreement.date_created).toLocaleString()}</p>
            <details className="mt-4">
              <summary className="cursor-pointer text-indigo-600 hover:text-indigo-800">View Full Listing Details</summary>
              <pre className="mt-2 p-3 bg-gray-200 rounded text-xs overflow-auto">
                {JSON.stringify(recentAgreement, null, 2)}
              </pre>
            </details>
            <button 
              onClick={handleShowPopup}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Review Listing
            </button>
          </div>
        ) : (
          <p className="text-gray-600 italic">No listings found.</p>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button 
          onClick={handleRefresh} 
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Refresh Data
        </button>
        <p className="text-sm text-gray-600">Last refreshed: {lastRefresh.toLocaleString()}</p>
      </div>

      {showPopup && recentAgreement && (
        <ContractReviewPopup
          onClose={handleClosePopup}
          onAgreementUpdate={handleAgreementUpdate}
          agreement={recentAgreement}
          userRole="seller"
        />
      )}
    </div>
  );
};

export default SellerPage;