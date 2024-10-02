// src/app/agreementNext/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { FormData } from "@/app/utils/types";
import { useRouter } from "next/navigation";
import SideBar from "../components/SideBarPwa";
import ContractReviewPopup from "../components/ContractReview";

const TermsAndConditions = () => {
  const [agreement, setAgreement] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedTerms, setCheckedTerms] = useState<Record<string, boolean>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [userRole] = useState<"buyer" | "seller" | "lawyer">("buyer");
  const router = useRouter();

  const fetchAgreements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/agreements");
      if (!response.ok) {
        throw new Error(`Failed to fetch agreements: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No agreements found");
      }

      const mostRecentAgreement = data.sort(
        (a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
      )[0];
      setAgreement(mostRecentAgreement);

      const initialCheckedTerms =
        mostRecentAgreement.terms?.reduce((acc: { [x: string]: boolean; }, term: { id: string | number; }) => {
          acc[term.id] = false;
          return acc;
        }, {} as Record<string, boolean>) || {};
      setCheckedTerms(initialCheckedTerms);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgreements();
  }, []);

  const handleTermCheck = (termId: string) => {
    setCheckedTerms((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
  };

  const handleViewDetails = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (response: {
    buyer_agreed?: boolean;
    seller_agreed?: boolean;
  }) => {
    try {
      if (!agreement) {
        throw new Error("No agreement found");
      }
      const updatedAgreement = { ...agreement, ...response };
      const res = await fetch(`/api/agreements/${agreement.agreement_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAgreement),
      });

      if (!res.ok) {
        throw new Error("Failed to update agreement");
      }

      const result = await res.json();
      setAgreement(result);
      setShowPopup(false);

      if (userRole === "buyer" && result.buyer_agreed) {
        router.push("/components/AgreedPage");
      } else if (userRole === "seller" && result.seller_agreed) {
        router.push("/AgreedPage");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  if (loading) return <div className="text-center py-4">Loading agreement details...</div>;

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchAgreements}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry Loading Agreement
        </button>
      </div>
    );
  }

  if (!agreement) return <div className="text-center py-4">No agreement found.</div>;

  return (
    <div className="flex">
      <SideBar userRole={""} />
      <div className="p-4 max-w-3xl mx-auto flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-center">Terms And Conditions</h1>
        <div className="mb-6 p-6 border rounded gap-x-10">
          <h2 className="text-lg font-semibold">Agreement Details</h2>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1"><strong>Parcel Number:</strong> {agreement.parcel_number}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1"><strong>Date Created:</strong> {new Date(agreement.date_created).toLocaleDateString()}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1"><strong>Contract Duration:</strong> {agreement.contract_duration} months</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1"><strong>Agreed Amount:</strong> Ksh {agreement.agreed_amount}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1"><strong>Installment Schedule:</strong> {agreement.installment_schedule} months</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1"><strong>Penalties Interest Rate:</strong> {agreement.penalties_interest_rate}%</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1"><strong>Down Payment:</strong> Ksh {agreement.down_payment}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1"><strong>Remaining Amount:</strong> Ksh {agreement.remaining_amount}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1"><strong>Total Amount Made:</strong> Ksh {agreement.total_amount_made}</p>
          </div>
        </div>

        {agreement.terms &&
          agreement.terms.map((term) => (
            <div key={term.id} className="mb-4 p-4 border rounded shadow bg-green-50 flex justify-between items-center">
              <div className="flex-1">
                <span>{term.text}</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={checkedTerms[term.id] || false}
                  onChange={() => handleTermCheck(String(term.id))}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
              </div>
            </div>
          ))}

        <button
          onClick={handleViewDetails}
          className="mt-4 w-full bg-hover text-white p-2 rounded hover:bg-green-200"
        >
          View Agreement Details
        </button>

        {showPopup && (
          <ContractReviewPopup
            params={{ userRole }}
            onClose={handleClosePopup}
            onSubmit={handleSubmit}
            agreement={agreement} userRole={"buyer"} onAgreementUpdate={function (): void {
              throw new Error("Function not implemented.");
            } }          />
        )}
      </div>
    </div>
  );
};

export default TermsAndConditions;

