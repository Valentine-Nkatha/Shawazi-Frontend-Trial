import { useState } from 'react';
import { signupUser as registerAPI } from '@/app/utils/userRegister';

// Define the structure of the registration data
interface RegisterData {
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    confirm_password: string; // Add this field
    role: string; // Add this field
}

// Define a type for the error response from the API
interface ApiError {
    message: string;
}

const useRegister = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const userRegister = async (registerData: RegisterData) => {
        setIsSubmitting(true); // Start submitting
        setErrorMessage(''); // Reset error message
        setSuccessMessage(''); // Reset success message

        try {
            const { data } = await registerAPI(registerData); // Pass all required fields

            // Check if data is undefined or an error response
            if (!data) {
                setErrorMessage('Registration failed. Please try again.');
                return;
            }

            setSuccessMessage('User registered successfully!');
        } catch (error) {
            // Ensure we handle the error correctly
            if (isApiError(error)) {
                setErrorMessage(error.message || 'An error occurred. Please try again.');
            } else {
                setErrorMessage('An unknown error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false); // Stop submitting
        }
    };

    // Type guard to check if error is of type ApiError
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
