import { useEffect, useRef, useState } from "react";

import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

import { RiErrorWarningLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

import FormRequirements from "../ui/FormRequirements.jsx";
import FormErrorTooltip from "../ui/FormErrorTooltip.jsx";

const DEFAULT_VARIANTS_STATUS = "valid";

const inputClass = tv({
  variants: {
    status: {
      valid: "border-gray-600 focus:border-blue-500 pr-3",
      invalid: "border-red-500 focus:border-red-500 pr-8",
    },
  },
  defaultVariants: {
    status: DEFAULT_VARIANTS_STATUS,
  },
});

const labelClass = tv({
  variants: {
    status: {
      valid: "peer-focus:text-blue-500",
      invalid:
        "peer-focus:text-red-500 peer-not-placeholder-shown:text-gray-700",
    },
  },
  defaultVariants: {
    status: DEFAULT_VARIANTS_STATUS,
  },
});

const iconClass = tv({
  variants: {
    status: {
      valid: "text-gray-600",
      invalid: "text-red-500",
    },
  },
  defaultVariants: {
    status: DEFAULT_VARIANTS_STATUS,
  },
});

export default function Input({
  id,
  name,
  icon,
  label,
  type,
  inputMode,
  autoComplete,
  requirements,
  value,
  onChange,
  inputErrorMessage,
  className,
}) {
  const inputRef = useRef(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = Boolean(inputErrorMessage);

  useEffect(() => {
    if (!hasError) {
      setShowTooltip(false);
    }
  }, [hasError]);

  let status = "valid";
  if (hasError) {
    status = "invalid";
  }

  let isPasswordType = type === "password";
  let inputType = type;
  if (isPasswordType && showPassword) {
    inputType = "text";
  }

  let isPhoneField = id === "phone";

  function handleToggleTooltip() {
    setShowTooltip((prev) => !prev);
  }

  function handleFocusInput() {
    inputRef.current?.focus();
  }

  function handleToggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="mb-5">
      <div className="relative">
        {hasError && (
          <RiErrorWarningLine
            className="text-red-500 absolute top-2.5 right-3 cursor-pointer translate-y-[0.5px]"
            onClick={handleToggleTooltip}
          />
        )}
        {hasError && showTooltip && (
          <FormErrorTooltip
            message={inputErrorMessage}
            onClick={handleFocusInput}
            onClose={handleToggleTooltip}
          />
        )}

        {isPasswordType && (
          <>
            {!showPassword && (
              <LuEye
                onClick={handleToggleShowPassword}
                className={twMerge(
                  "text-gray-500 absolute top-3 translate-y-[-1px] right-9.5 cursor-pointer",
                  clsx({ "right-3.5": !hasError })
                )}
              />
            )}
            {showPassword && (
              <LuEyeClosed
                onClick={handleToggleShowPassword}
                className={twMerge(
                  "text-gray-500 absolute top-3 translate-y-[-1px] right-9.5 cursor-pointer",
                  clsx({ "right-3.5": !hasError })
                )}
              />
            )}
          </>
        )}
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={inputType}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder=""
          value={value}
          onChange={onChange}
          className={twMerge(
            "peer w-full px-9 py-2 text-sm border rounded-md outline-none text-gray-900",
            inputClass({ status }),
            clsx({ "pr-10": isPasswordType && !hasError }),
            clsx({ "pr-16": isPasswordType && hasError }),
            clsx({ "pl-17": isPhoneField }),
            className
          )}
        />
        <label
          htmlFor={id}
          className={twMerge(
            "absolute text-sm left-9 top-2 translate-[1px] transition-all text-gray-600 bg-white rounded-md",
            "peer-focus:-top-2.5 peer-focus:left-4 peer-focus:translate-[0px] peer-focus:px-2",
            "peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:translate-[0px] peer-not-placeholder-shown:px-2",
            labelClass({ status }),
            clsx({ "left-17": isPhoneField })
          )}
        >
          <span>{label}</span>
        </label>
        <span
          className={twMerge(
            "absolute top-0 left-2.5 h-full w-6 max-w-6 flex justify-center items-center",
            iconClass({ status })
          )}
        >
          {icon}
        </span>
        {isPhoneField && (
          <span
            className={twMerge(
              "absolute top-0 left-9 h-full w-6 max-w-6 flex justify-center items-center text-sm text-gray-900"
            )}
          >
            +62
          </span>
        )}
      </div>
      <FormRequirements
        requirements={requirements}
        onClick={handleFocusInput}
      />
    </div>
  );
}
