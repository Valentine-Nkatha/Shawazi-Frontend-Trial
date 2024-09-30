"use client"; 
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { verifyOtp } from '@/app/utils/getOtpVerification'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ForgotPasswordSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^\d+$/, 'Phone number must contain only numbers')
        .min(10, 'Phone number must be at least 10 digits long')
        .required('Phone number is required'),
    newPassword: Yup.string()
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .min(6, 'Password must be at least 6 characters long')
        .required('New password is required')
});

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter(); 

    const handleReceiveOtp = async (values: { phoneNumber: string; newPassword: string }) => {
        setLoading(true);
        setError('');

        try {

            const otpSent = true;

            if (!otpSent) {
                setError('Failed to send OTP. Please try again.');
                return;
            }

            router.push(`/otp_verification?phone_number=${encodeURIComponent(values.phoneNumber)}`);

        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">Forgot Password</h2>
            
            <Formik
                initialValues={{ phoneNumber: '', newPassword: '' }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={handleReceiveOtp}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6 w-full max-w-md bg-white p-6 shadow-lg rounded-md">
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <Field
                                type="text"
                                name="phoneNumber"
                                className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                                placeholder="Enter your phone number"
                            />
                            <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <Field
                                type="password"
                                name="newPassword"
                                className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
                                placeholder="Enter a new password"
                            />
                            <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-md"
                            disabled={isSubmitting || loading}
                        >
                            {loading ? 'Sending OTP...' : 'Receive OTP'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ForgotPassword;
