import { useState } from 'react';
import { signupUser as registerAPI } from '@/app/utils/userRegister';

interface RegisterData {
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    confirm_password: string; 
    role: string;
}

interface ApiError {
    message: string;
}

const useRegister = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const userRegister = async (registerData: RegisterData) => {
        setIsSubmitting(true);
        setErrorMessage(''); 
        setSuccessMessage(''); 

        try {
            const { data } = await registerAPI(registerData); 

            if (!data) {
                setErrorMessage('Registration failed. Please try again.');
                return;
            }

            setSuccessMessage('User registered successfully!');
        } catch (error) {

            if (isApiError(error)) {
                setErrorMessage(error.message || 'An error occurred. Please try again.');
            } else {
                setErrorMessage('An unknown error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false); 
        }
    };

    const isApiError = (error: unknown): error is ApiError => {
        return typeof error === 'object' && error !== null && 'message' in error;
    };

    return {
        isSubmitting,
        errorMessage,
        successMessage,
        userRegister,
    };
};

export default useRegister;
