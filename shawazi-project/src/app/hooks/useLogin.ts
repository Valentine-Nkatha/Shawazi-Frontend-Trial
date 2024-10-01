import { useState } from 'react';
import { loginUser as loginAPI } from '@/app/utils/userLogin';

const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userLogin = async (loginData: {phone_number: string, password:string}) => {
    console.log('Attempting login with data:', loginData);

    try {
      setIsSubmitting(true);
      console.log('Login API call started.');
      const { data, error } = await loginAPI(loginData);
      console.log('Login API call response:', { data, error });

      if (error) {
        console.error('Error from login API:', error);
        setErrorMessage(error);
        setSuccessMessage('');

      } else {
        console.log('Login successful. Data received:', data);
        setSuccessMessage('Verify OTP');
        setErrorMessage('');
        return data;

      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setErrorMessage('An error occurred. Please try again.');
      
    } finally {
      console.log('Login API call completed.');
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
export default useLogin;
