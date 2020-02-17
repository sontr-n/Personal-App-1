import { useState } from 'react';

export const useForm = (initializeValue) => {
  const [values, setValues] = useState(initializeValue);

  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  ];
}