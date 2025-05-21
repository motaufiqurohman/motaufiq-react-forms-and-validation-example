import { useEffect, useRef, useState } from "react";

import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

import { FaCheck } from "react-icons/fa6";
import { RiErrorWarningLine } from "react-icons/ri";

import FormErrorTooltip from "../ui/FormErrorTooltip.jsx";

const checkboxClass = tv({
  variants: {
    status: {
      valid: "border-gray-600",
      invalid: "border-red-500",
    },
  },
  defaultVariants: {
    status: "valid",
  },
});

export default function CustomCheckBox({
  children,
  id,
  name,
  value,
  onChange,
  inputErrorMessage,
}) {
  const checkboxRef = useRef(null);

  const [showTooltip, setShowTooltip] = useState(false);

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

  function handleToggleTooltip() {
    setShowTooltip((prev) => !prev);
  }

  function handleFocusCheckbox() {
    checkboxRef.current?.focus();
  }

  return (
    <div className="relative">
      {hasError && (
        <RiErrorWarningLine
          className="text-red-500 absolute top-1 right-3 cursor-pointer translate-y-[0.5px] z-10"
          onClick={handleToggleTooltip}
        />
      )}
      {showTooltip && (
        <FormErrorTooltip
          message={inputErrorMessage}
          onClick={handleFocusCheckbox}
          onClose={handleToggleTooltip}
          className="-top-7"
        />
      )}
      <div className="relative flex h-6">
        <input
          ref={checkboxRef}
          id={id}
          name={name}
          type="checkbox"
          checked={value}
          onChange={onChange}
          className="peer w-5 h-5 absolute z-10 top-0.5 opacity-0 cursor-pointer"
        />
        <span
          className={twMerge(
            "relative w-5 h-5 rounded border-1 self-center mr-2 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-blue-500 peer-checked:bg-green-600 peer-checked:border-green-600",
            checkboxClass({ status })
          )}
        ></span>
        <span className="absolute left-0 top-0 translate-y-[2px] w-5 h-5 hidden justify-center items-center peer-checked:flex">
          <FaCheck className="text-sm text-white" />
        </span>
        <label
          htmlFor={id}
          className="text-sm text-gray-600 self-end cursor-pointer pr-1"
        >
          {children}
        </label>
      </div>
    </div>
  );
}
