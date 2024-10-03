"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

const OtpVerification = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const phoneFromQuery = searchParams.get('phone_number');
        const phoneFromCookie = getCookie('userPhone') as string; // Ensure this matches what you set in Login
        setPhoneNumber(phoneFromQuery || phoneFromCookie || null);

        // Retrieve user_role cookie
        const roleFromCookie = getCookie('user_role') as string; // Ensure this matches what you set in Login
        if (roleFromCookie) {
            setUserRole(roleFromCookie);
            console.log('User role from cookie:', roleFromCookie); // Should log the correct role
        } else {
            console.error('User role cookie is not set or is empty');
        }
    }, [searchParams]);

    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const otpString = otp.join('');
            if (otpString.length !== 6) {
                setError('OTP must be 6 characters.');
                setLoading(false);
                return;
            }

            // Here you would typically make an API call to verify the OTP
            // For this example, we're assuming the OTP is always correct
            const isVerified = true;

            if (isVerified) {
                console.log('User role before redirection:', userRole); // Check the user role
                if (userRole) {
                    switch (userRole.toLowerCase()) {
                        case 'lawyer':
                            router.push('/lawyer/draft-contract');
                            break;
                        case 'buyer':
                            router.push('/land-display');
                            break;
                        case 'seller':
                            router.push('/seller-home');
                            break;
                        default:
                            router.push('/profile');
                            break;
                    }
                } else {
                    // Redirect to a default route if userRole is not defined
                    router.push('/profile');
                }
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            console.error('Error verifying OTP:', err); // Log error
            setError('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center relative overflow-hidden">
            <div className="border-2 border-primary rounded-lg p-12 mx-auto w-[90%] md:w-[60%] lg:w-[40%] bg-white shadow-md">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">Verify Code</h2>
                <p className="text-center mb-6">Please enter the verification code sent to your phone number</p>
                <form onSubmit={handleSubmit} className="space-y-9">
                    <div className="flex justify-center space-x-6 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el }}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-16 text-center text-3xl border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button
                        type="submit"
                        className={`w-full bg-primary text-white py-4 px-4 rounded-md text-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;