import { twMerge } from "tailwind-merge";

import { PiInfoBold } from "react-icons/pi";
export default function FormRequirements({ requirements, className, onClick }) {
  return (
    <aside
      className={twMerge(
        "text-gray-500 mt-1 text-xs cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <span>
        <PiInfoBold className="inline-block mr-1 translate-y-[-1px] text-sm" />
        <span>{requirements}</span>
      </span>
    </aside>
  );
}
