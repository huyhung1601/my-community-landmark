import React, { useCallback, useState } from "react";

export const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const resetValues = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);
  return [values, setValues, handleChange, resetValues];
};
