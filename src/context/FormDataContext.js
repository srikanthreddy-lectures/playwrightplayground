// contexts/FormDataContext.js
import { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [apiResult, setApiResult] = useState({});

  const updateFormData = (data) => {
    setFormData(data);
  };

  const updateApiResult = (result) => {
    setApiResult(result);
  }

  return (
    <FormDataContext.Provider value={{ formData, updateFormData, apiResult, updateApiResult }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);