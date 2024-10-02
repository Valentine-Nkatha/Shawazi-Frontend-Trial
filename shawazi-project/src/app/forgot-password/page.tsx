"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaPhoneAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";

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
            const otpSent = true; // Simulating OTP sending

            if (!otpSent) {
                setError('Failed to send OTP. Please try again.');
                return;
            }

            router.push(`/otp_verification?phone_number=${encodeURIComponent(values.phoneNumber)}`);

        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-60 h-60 bg-foreground rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/2 translate-y-1/5"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-foreground rounded-full translate-x-1/5 translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/9 mr-[9%] translate-y-[80%]"></div>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto z-10 bg-white p-6 sm:p-8 rounded-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">Forgot Password</h2>
                
                <Formik
                    initialValues={{ phoneNumber: '', newPassword: '' }}
                    validationSchema={ForgotPasswordSchema}
                    onSubmit={handleReceiveOtp}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="phoneNumber" className="block text-lg sm:text-xl font-medium text-primary mb-1">
                                    <FaPhoneAlt className="inline w-4 h-4 mr-2" /> Phone Number:
                                </label>
                                <Field
                                    type="text"
                                    name="phoneNumber"
                                    className="w-full border text-[16px] sm:text-[18px] border-foreground border-2 rounded-md shadow-sm p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-foreground"
                                    placeholder="Enter your phone number"
                                />
                                <ErrorMessage name="phoneNumber" component="div" className="mt-1 text-xs text-border-color" />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="flex items-center text-lg sm:text-xl font-medium text-primary mb-2">
                                    <RiLockPasswordFill className="w-6 h-6 mr-2" /> New Password:
                                </label>
                                <Field
                                    type="password"
                                    name="newPassword"
                                    className="w-full border text-[16px] sm:text-[18px] border-foreground border-2 rounded-md shadow-sm p-2 sm:p-3 focus:outline-none focus:ring-1 focus:ring-foreground"
                                    placeholder="Enter a new password"
                                />
                                <ErrorMessage name="newPassword" component="div" className="mt-1 text-xs text-border-color" />
                            </div>
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 sm:py-4 rounded-md text-lg sm:text-xl hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                disabled={isSubmitting || loading}
                            >
                                {loading ? 'Sending OTP...' : 'Receive OTP'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgotPassword;
