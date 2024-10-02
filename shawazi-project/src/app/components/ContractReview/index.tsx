
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, CheckCircle } from 'lucide-react';
import { ContractReviewPopupProps } from "@/app/utils/types";

const ContractReviewPopup: React.FC<ContractReviewPopupProps> = ({ onClose, onSubmit, agreement, userRole }) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAgree = async (agreed: boolean) => {
    if (!agreement || agreement.agreement_id === undefined) {
      setError('Agreement ID is missing. Cannot update agreement.');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      await onSubmit({
        buyer_agreed: userRole === 'buyer' ? agreed : undefined,
        seller_agreed: userRole === 'seller' ? agreed : undefined,
      });

      setIsLoading(false);
      setSuccessMessage('Contract update successful!');
      setTimeout(() => {
        onClose();
        router.push(`/components/${userRole.charAt(0).toUpperCase() + userRole.slice(1)}_agree`);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-indigo-600">Terms And Conditions</h1>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800" aria-label="Close popup">
              <X size={24} />
            </button>
          </div>
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
              <CheckCircle className="mr-2" size={20} />
              {successMessage}
            </div>
          )}
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-indigo-500">Agreement Details</h2>
            {[
              { label: "Agreement ID", value: agreement.agreement_id },
              { label: "Date Created", value: new Date(agreement.date_created).toLocaleDateString() },
              { label: "Contract Duration", value: `${agreement.contract_duration} months` },
              { label: "Agreed Amount", value: `Ksh ${agreement.agreed_amount}` },
              { label: "Installment Schedule", value: agreement.installment_schedule },
              { label: "Penalties Interest Rate", value: `${agreement.penalties_interest_rate}%` },
              { label: "Down Payment", value: `Ksh ${agreement.down_payment}` },
              { label: "Remaining Amount", value: `Ksh ${agreement.remaining_amount}` },
              { label: "Total Amount Made", value: `Ksh ${agreement.total_amount_made}` },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center my-2">
                <p className='flex-1 text-gray-700'><strong>{item.label}:</strong> {item.value}</p>
              </div>
            ))}
          </div>
          {(userRole === 'buyer' || userRole === 'seller') && !successMessage && (
            <div className="mb-4">
              <p className="font-semibold text-lg">Do you agree to the terms?</p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => handleAgree(true)} 
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  disabled={isLoading}
                >
                  {isLoading ? 'Agreeing...' : 'Agree'}
                </button>
                <button 
                  onClick={() => handleAgree(false)} 
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  disabled={isLoading}
                >
                  {isLoading ? 'Disagreeing...' : 'Disagree'}
                </button>
              </div>
            </div>
          )}
          {userRole === 'lawyer' && (
            <div className="mb-4">
              <h2 className="font-semibold text-lg">Agreement Status:</h2>
              <p>Buyer Agreed: {agreement.buyer_agreed ? 'Yes' : 'No'}</p>
              <p>Seller Agreed: {agreement.seller_agreed ? 'Yes' : 'No'}</p>
            </div>
          )}
        </div>
        <div className="p-4 bg-indigo-100 rounded-b-lg">
          <p className="mb-2 font-medium text-center text-gray-800">Both parties have a right to agree or disagree to the terms and conditions.</p>
          <p className="text-xs text-center text-gray-500">Please review the details above.</p>
        </div>
      </div>
    </div>
  );
};

export default ContractReviewPopup;
