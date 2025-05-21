import { useEffect, useRef, useState } from "react";

import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

import { RiErrorWarningLine } from "react-icons/ri";

import FormRequirements from "../ui/FormRequirements.jsx";
import FormErrorTooltip from "../ui/FormErrorTooltip.jsx";

const DEFAULT_VARIANTS_STATUS = "valid";

const textareaClass = tv({
  variants: {
    status: {
      valid: "text-gray-900 border-gray-600 focus:border-blue-500",
      invalid: "text-gray-900 border-red-500 focus:border-red-500",
    },
    defaultVariants: {
      status: DEFAULT_VARIANTS_STATUS,
    },
  },
});

const labelClass = tv({
  variants: {
    status: {
      valid: "text-gray-600 peer-focus:text-blue-500",
      invalid:
        "text-gray-500 peer-focus:text-red-500 peer-not-placeholder-shown:text-gray-700",
    },
    defaultVariants: {
      status: DEFAULT_VARIANTS_STATUS,
    },
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

export default function TextArea({
  id,
  name,
  icon,
  label,
  inputMode,
  autoComplete,
  requirements,
  value,
  onChange,
  inputErrorMessage,
}) {
  const textareaRef = useRef();

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

  function handleFocusTextarea() {
    textareaRef.current?.focus();
  }

  return (
    <div className="mb-4.5">
      <div className="relative">
        {hasError && (
          <RiErrorWarningLine
            className="text-red-500 absolute top-3 right-3 cursor-pointer"
            onClick={handleToggleTooltip}
          />
        )}
        {showTooltip && (
          <FormErrorTooltip
            message={inputErrorMessage}
            onClick={handleFocusTextarea}
            onClose={handleToggleTooltip}
          />
        )}
        <textarea
          ref={textareaRef}
          id={id}
          name={name}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder=""
          value={value}
          onChange={onChange}
          className={twMerge(
            "peer w-full min-h-9.5 px-9 py-2 text-sm border rounded-md outline-none",
            textareaClass({ status })
          )}
          rows={2}
        />
        <label
          htmlFor={id}
          className={twMerge(
            "absolute text-sm left-9 top-2 translate-[1px] transition-all bg-white rounded-md",
            "peer-focus:-top-2.5 peer-focus:left-4 peer-focus:translate-[0px] peer-focus:px-2",
            "peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:translate-[0px] peer-not-placeholder-shown:px-2",
            labelClass({ status })
          )}
        >
          {label}
        </label>
        <span
          className={twMerge(
            "absolute top-2.5 left-2.5 w-6 max-w-6 flex justify-center items-center",
            iconClass({ status })
          )}
        >
          {icon}
        </span>
      </div>
      <FormRequirements
        requirements={requirements}
        className="mt-0 translate-y-[-2px]"
        onClick={handleFocusTextarea}
      />
    </div>
  );
}
