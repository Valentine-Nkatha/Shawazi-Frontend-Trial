
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const agreementSchema = yup.object().shape({
    parcel_number: yup.string().required("Parcel number is required"),
    date_created: yup.string()
        .required("Date created is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    contract_duration: yup.number().required("Contract duration is required").positive("Must be a positive number"),
    agreed_amount: yup.number().required("Agreed amount is required").positive("Must be a positive number"),
    installment_schedule: yup.number().required("Installment schedule is required").positive("Must be a positive number"),
    penalties_interest_rate: yup.number().required("Penalties interest rate is required").positive("Must be a positive number"),
    down_payment: yup.number().required("Down payment is required").positive("Must be a positive number"),
    remaining_amount: yup.number().required("Remaining amount is required").positive("Must be a positive number"),
    total_amount_made: yup.number().required("Total amount made is required").positive("Must be a positive number"),
});

type AgreementFormData = yup.InferType<typeof agreementSchema>;

const CreateAgreement: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AgreementFormData>({
        resolver: yupResolver(agreementSchema), // Correctly typed resolver
    });

    const onSubmit: SubmitHandler<AgreementFormData> = async (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Parcel Number</label>
                <input {...register("parcel_number")} />
                {errors.parcel_number && <p>{errors.parcel_number.message}</p>}
            </div>
            <div>
                <label>Date Created</label>
                <input type="date" {...register("date_created")} />
                {errors.date_created && <p>{errors.date_created.message}</p>}
            </div>
            <div>
                <label>Contract Duration (in months)</label>
                <input type="number" {...register("contract_duration")} />
                {errors.contract_duration && <p>{errors.contract_duration.message}</p>}
            </div>
            <div>
                <label>Agreed Amount</label>
                <input type="number" {...register("agreed_amount")} />
                {errors.agreed_amount && <p>{errors.agreed_amount.message}</p>}
            </div>
            <div>
                <label>Installment Schedule</label>
                <input type="number" {...register("installment_schedule")} />
                {errors.installment_schedule && <p>{errors.installment_schedule.message}</p>}
            </div>
            <div>
                <label>Penalties Interest Rate (%)</label>
                <input type="number" {...register("penalties_interest_rate")} />
                {errors.penalties_interest_rate && <p>{errors.penalties_interest_rate.message}</p>}
            </div>
            <div>
                <label>Down Payment</label>
                <input type="number" {...register("down_payment")} />
                {errors.down_payment && <p>{errors.down_payment.message}</p>}
            </div>
            <div>
                <label>Remaining Amount</label>
                <input type="number" {...register("remaining_amount")} />
                {errors.remaining_amount && <p>{errors.remaining_amount.message}</p>}
            </div>
            <div>
                <label>Total Amount Made</label>
                <input type="number" {...register("total_amount_made")} />
                {errors.total_amount_made && <p>{errors.total_amount_made.message}</p>}
            </div>
            <button type="submit">Submit Agreement</button>
        </form>
    );
};

export default CreateAgreement;
