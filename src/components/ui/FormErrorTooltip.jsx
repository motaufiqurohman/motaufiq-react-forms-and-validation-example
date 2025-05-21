import { SlClose } from "react-icons/sl";
import { twMerge } from "tailwind-merge";

export default function FormErrorTooltip({
  message,
  onClick,
  onClose,
  className,
}) {
  return (
    <div className={twMerge("relative -top-5.5 z-10", className)}>
      <div className="absolute right-3.5 top-6 w-3 h-3 bg-red-500 rotate-45"></div>
      <div className="absolute right-3.5 top-6 w-3 h-3 bg-red-200 rotate-45 translate-y-[-1.3px] z-10"></div>
      <div className="absolute -right-1.5 -bottom-8 bg-red-200 border border-red-500 text-red-500 text-xs px-2 py-1 rounded shadow min-w-60 max-w-100 max-h-10 overflow-hidden overflow-ellipsis flex">
        <div
          onClick={onClick}
          className="relative z-50 flex-2/3 pr-1 cursor-pointer"
        >
          {message}
        </div>
        <div
          onClick={onClose}
          className="flex items-center text-[14px] z-30 translate-x-[0px] cursor-pointer"
        >
          <SlClose />
        </div>
      </div>
    </div>
  );
}
