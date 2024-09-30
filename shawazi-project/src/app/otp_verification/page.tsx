"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

const OtpVerification = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const phoneFromQuery = searchParams.get('phone_number');
        const phoneFromCookie = getCookie('userPhone') as string;
        setPhoneNumber(phoneFromQuery || phoneFromCookie || null);
    }, [searchParams]);

    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value; 
        setOtp(newOtp);
    
        if (value && inputRefs.current[index + 1]) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
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

            const isVerified = true;

            if (isVerified) {
                router.push('/sidebar');
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-60 h-60 bg-foreground rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/2 translate-y-1/5"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-foreground rounded-full translate-x-1/5 translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-foreground rounded-full translate-x-1/9 mr-[9%] translate-y-[80%]"></div>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto z-10 bg-white p-6 sm:p-8 rounded-lg">
            </div>
            <div className="border-2 border-primary rounded-lg p-12 mx-auto w-[90%] md:w-[60%] lg:w-[40%] bg-white shadow-md">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">Verify Code</h2>
                <p className="text-center mb-6">Please enter the verification code sent to your phone number</p>
                <form onSubmit={handleSubmit} className="space-y-9">
                    <div className="flex justify-center space-x-6 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {inputRefs.current[index] = el}}
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
