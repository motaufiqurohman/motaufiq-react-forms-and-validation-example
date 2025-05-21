import { useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";
import clsx from "clsx";

import Modal from "../../../components/ui/Modal.jsx";
import RegisterCard from "../components/RegisterCard.jsx";
import Input from "../../../components/ui/Input.jsx";
import TextArea from "../../../components/ui/TextArea.jsx";
import CustomCheckBox from "../../../components/ui/CustomCheckBox.jsx";
import Button from "../../../components/ui/Button.jsx";

import { INPUT_FIELDS } from "../constants/inputFields.jsx";
import { registerValidationSchema } from "../schemas/registerValidation.js";

export default function RegisterPage() {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    idNumber: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    country: "",
    password: "",
    confirmPassword: "",
    termCondition: false,
  });
  const [errors, setErrors] = useState({});

  async function handleChange(e) {
    const { id, value, checked } = e.target;

    let newValue = value;
    if (id === "termCondition") {
      newValue = checked;
    } else if (id === "phone") {
      if (value.startsWith("0")) {
        newValue = value.slice(1);
      } else if (value.startsWith("62")) {
        newValue = value.slice(2);
      } else if (value.startsWith("+62")) {
        newValue = value.slice(3);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [id]: newValue,
    }));

    if (registerValidationSchema.fields[id]) {
      try {
        await registerValidationSchema.validateAt(id, {
          ...formData,
          [id]: newValue,
        });

        setErrors((prev) => ({
          ...prev,
          [id]: null, // clear error data on specific input field by input field id
        }));
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          [id]: err.message,
        }));
      }
    }
  }

  useEffect(() => {
    console.log("after", formData);
  }, [formData]);

  async function handleClick() {
    const trimmedData = { ...formData };
    for (const [key, value] of Object.entries(trimmedData)) {
      if (typeof value === "string") {
        trimmedData[key] = value.trim();
      } else {
        trimmedData[key] = value;
      }
    }

    console.log("before", formData);
    setFormData(trimmedData);

    try {
      await registerValidationSchema.validate(trimmedData, {
        abortEarly: false,
      });
      setErrors({}); // clear error state
      modalRef.current?.open();
    } catch (err) {
      const newErrors = {};
      for (const error of err.inner) {
        if (!newErrors[error.path]) {
          newErrors[error.path] = error.message;
        }
      }
      setErrors(newErrors);
    }
  }

  return (
    <>
      <Modal
        ref={modalRef}
        message="Your data has been successfully submitted and is now being processed. Please wait for further updates."
      />
      <RegisterCard title="Registration Form">
        {INPUT_FIELDS.map((field) => {
          if (
            ["text", "email", "tel", "date", "password"].includes(field.type)
          ) {
            return (
              <Input
                key={field.id}
                id={field.id}
                name={field.name}
                icon={field.icon}
                label={field.label}
                type={field.type}
                inputMode={field.inputMode}
                autoComplete={field.autoComplete}
                requirements={field.requirements}
                value={formData[field.id]}
                onChange={handleChange}
                inputErrorMessage={errors[field.id]}
                className={twMerge(
                  clsx({ "no-spinner": field.id === "phone" })
                )}
              />
            );
          } else if (field.type === "textarea") {
            return (
              <TextArea
                key={field.id}
                id={field.id}
                name={field.name}
                icon={field.icon}
                label={field.label}
                requirements={field.requirements}
                value={formData[field.id]}
                onChange={handleChange}
                inputErrorMessage={errors[field.id]}
              />
            );
          } else if (field.type === "checkbox") {
            return (
              <CustomCheckBox
                key={field.id}
                id={field.id}
                name={field.name}
                label={field.label}
                inputErrorMessage={errors[field.id]}
                value={formData[field.id]}
                onChange={handleChange}
              >
                I agree to the <u>Term of Service</u> and <u>Privacy Policy</u>
              </CustomCheckBox>
            );
          }
        })}
        <Button onClick={handleClick} className="float-right w-55 mt-8">
          Register
        </Button>
      </RegisterCard>
    </>
  );
}
