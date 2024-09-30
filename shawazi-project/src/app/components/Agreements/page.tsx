"use client";

import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
// import Sidebar from "../Sidebar";
import { FormData } from "@/app/utils/types";
import { userNewAgreements } from "@/app/hooks/userNewAgreenments";
// import { userNewAgreements } from "@/app/Hooks/userNewAgreenments";

const agreementSchema = yup.object().shape({
    parcel_number: yup.string().required("Parcel number is required"),
    date_created: yup.date().required("Date created is required").typeError("Invalid date format"),
    contract_duration: yup.number().required("Contract duration is required").positive("Must be a positive number"),
    agreed_amount: yup.number().required("Agreed amount is required").positive("Must be a positive number"),
    installment_schedule: yup.number().required("Installment schedule is required").positive("Must be a positive number"),
    penalties_interest_rate: yup.number().required("Penalties interest rate is required").positive("Must be a positive number"),
    down_payment: yup.number().required("Down payment is required").positive("Must be a positive number"),
    remaining_amount: yup.number().required("Remaining amount is required").positive("Must be a positive number"),
    total_amount_made: yup.number().required("Total amount made is required").positive("Must be a positive number"),
});

const CreateAgreement = () => {
  const router = useRouter();
  const { data, loading, error } = userNewAgreements();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(agreementSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setSubmitError(null);
    setSuccessMessage(null); 
    try {
      const response = await fetch('/api/agreements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to create agreement:', errorData);
        throw new Error(errorData.error || 'Failed to create agreement');
      }

      const result = await response.json();
      setSuccessMessage("Agreement created successfully!");
      router.push("/components/AgreementNext");

    } catch (error) {
      console.error("Failed to submit agreement:", error);
      setSubmitError(error.message || "An unexpected error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-center mb-6 text-brown-700">Create Agreement</h1>
      {submitError && <div className="text-red-500 mb-4">{submitError}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Sidebar/> */}
        {[
          { label: "Parcel Number", name: "parcel_number", type: "text" },
          { label: "Date Created", name: "date_created", type: "date" },
          { label: "Contract Duration (in months)", name: "contract_duration", type: "number" },
          { label: "Agreed Amount", name: "agreed_amount", type: "number" },
          { label: "Installment Schedule (in months)", name: "installment_schedule", type: "number" },
          { label: "Penalties Interest Rate (%)", name: "penalties_interest_rate", type: "number" },
          { label: "Down Payment", name: "down_payment", type: "number" },
          { label: "Remaining Amount", name: "remaining_amount", type: "number" },
          { label: "Total Amount Made", name: "total_amount_made", type: "number" },
        ].map(({ label, name, type }, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            {type === "textarea" ? (
              <textarea
                {...register(name as keyof FormData)}
                className="border border-gray-300 rounded-lg w-full p-2"
                
              />
            ) : (
              <input
                type={type}
                {...register(name as keyof FormData)}
                className="border border-gray-300 rounded-lg w-full p-2"
              />
            )}
            {errors[name as keyof FormData] && <p className="text-red-500">{errors[name as keyof FormData]?.message}</p>}
          </div>
        ))}

        <div className="flex space-x-2 mt-6">
          {/* <Link href="/components/Terms"> */}
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 bg-[#508408] text-white font-bold py-2 rounded-lg hover:bg-green-700 transition duration-300 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting ? 'Creating...' : 'Create Agreement'}
          </button>
          {/* </Link> */}
          <button
            type="button"
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-opacity-90 transition duration-300"
            onClick={() => router.push("/components/AgreementNext")}
          >
            On Next Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAgreement;
