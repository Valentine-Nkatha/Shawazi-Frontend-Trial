import { useState } from 'react';
import { signupUser as registerAPI } from '@/app/utils/userRegister';

const useRegister = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userLogin = async (registerData: { first_name: string; last_name: string; phone_number: string; password: string; }) => {

    try {
      setIsSubmitting(true);
      const { data, error } = await registerAPI(registerData);
      if (error) {
        setErrorMessage(error);
        setSuccessMessage('');
      } else {
        setSuccessMessage('User Registered successful!');
        setErrorMessage('');
        return data;
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    isSubmitting,
    errorMessage,
    successMessage,
    userLogin,
  };
};
export default useRegister;