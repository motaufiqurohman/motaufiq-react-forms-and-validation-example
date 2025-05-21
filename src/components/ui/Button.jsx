import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const buttonClass = tv({
  variants: {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500",
      secondary: "bg-white text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
      success:
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      warning:
        "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400",
      info: "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500",
      light:
        "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200",
      dark: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-600",
      link: "bg-transparent text-blue-600 underline hover:text-blue-800 focus:ring-transparent",
      custom: "", // Defines a custom variant with no default styles, allowing full control via className prop
    },
    size: {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-5 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});

export default function Button({
  children,
  onClick,
  variant, // Will be resolved by `tv()` if not explicitly specified
  size, // Will be resolved by `tv()` if not explicitly specified
  className, // Classes passed down from the parent component
  ...props
}) {
  return (
    <button
      // Applies `twMerge` to ensure classes from the parent override internal styles when necessary
      className={twMerge(
        "p-2 rounded-md font-light cursor-pointer outline-none min-w-20 focus:ring-2 focus:ring-offset-2",
        buttonClass({ variant, size }),
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
