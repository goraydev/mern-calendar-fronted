import { useState } from "react";

export const useFormModal = (initialForm = {}) => {
  const [formValues, setFormValues] = useState(initialForm);

  const onChangeInput = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  return {
    formValues,
    onChangeInput,
    onDateChange,
    setFormValues,
  };
};
