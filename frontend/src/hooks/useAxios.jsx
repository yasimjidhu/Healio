import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url,options) => {
    setLoading(true); 
    setError(null); 

    try {
      const response = await axios(url,options);
      console.log('resonse of login in useaxios',response.data)
      return { response, error: null };
    } catch (axiosError) {
      setError(axiosError);
      return { response: null, error: axiosError };
    } finally {
      setLoading(false); 
    }
  };

  return { request, loading, error }; 
};

export default useAxios;
