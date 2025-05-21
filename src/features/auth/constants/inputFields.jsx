import { FiUser } from "react-icons/fi";
import { LuCircleUser } from "react-icons/lu";
import { LiaIdCard } from "react-icons/lia";
import { FaRegEnvelope } from "react-icons/fa6";
import { LiaPhoneSolid } from "react-icons/lia";
import { RiCalendarEventLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { PiGlobe } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";

export const INPUT_FIELDS = [
  {
    id: "fullName",
    type: "text",
    autoComplete: "name",
    inputMode: "text",
    name: "fullName",
    icon: <FiUser className="text-lg" />,
    label: "Full Name",
    requirements:
      "Must be 5–100 characters, contain only letters, spaces, or hyphens (-), and include both first and last name.",
  },
  {
    id: "userName",
    type: "text",
    autoComplete: "off",
    inputMode: "text",
    name: "userName",
    icon: <LuCircleUser className="text-lg" />,
    label: "Username",
    requirements:
      "Must be 4–30 characters, start with a letter, and contain only letters, numbers, dots (.), or underscores (_).",
  },
  {
    id: "idNumber",
    type: "text",
    autoComplete: "off",
    inputMode: "numeric",
    name: "idNumber",
    icon: <LiaIdCard className="text-lg" />,
    label: "ID Number",
    requirements: "Must be exactly 16 digits.",
  },
  {
    id: "email",
    type: "text", // Using type="text" instead of type="email" to avoid silent auto-trimming, which prevents Yup from validating spaces or tabs correctly, making it impossible for Yup to catch spaces or tabs.
    autoComplete: "email",
    inputMode: "email",
    name: "email",
    icon: <FaRegEnvelope className="text-sm" />,
    label: "Email",
    requirements:
      "Must be a valid email address (example@example.com). No spaces or tabs allowed.",
  },
  {
    id: "phone",
    type: "tel",
    autoComplete: "tel",
    inputMode: "numeric",
    name: "phone",
    icon: <LiaPhoneSolid className="text-lg" />,
    label: "Phone Number",
    requirements:
      "Must be 10–15 digits long, contain only numbers, and cannot start with zero. No symbols or spaces allowed.",
  },
  {
    id: "dob",
    type: "date",
    autoComplete: "bday",
    inputMode: "none",
    name: "dob",
    icon: <RiCalendarEventLine className="text-md" />,
    label: "Date Of Birth",
    requirements:
      "Must be a valid date in the past. You must be at least 17 years old.",
  },
  {
    id: "address",
    type: "textarea",
    autoComplete: "address",
    inputMode: "text",
    name: "address",
    icon: <AiOutlineHome />,
    label: "Address",
    requirements:
      "Must be 5–500 characters and contain only valid address characters.",
  },
  {
    id: "country",
    type: "text",
    autoComplete: "country",
    inputMode: "text",
    name: "country",
    icon: <PiGlobe className="text-md" />,
    label: "Country",
    requirements: "Letters, spaces, or hyphens only (2–50 characters).",
  },
  {
    id: "password",
    type: "password",
    autoComplete: "new-password",
    inputMode: "none",
    name: "password",
    icon: <RiLockPasswordLine className="text-md" />,
    label: "Password",
    requirements:
      'At least 8 characters, must include a number, lowercase, uppercase, and special character (!@#$%^&*(),.?":{}|<>). No spaces or tabs allowed. Must not be the same as your email.',
  },
  {
    id: "confirmPassword",
    type: "password",
    autoComplete: "new-password",
    inputMode: "none",
    name: "confirmPassword",
    icon: <RiLockPasswordLine className="text-md" />,
    label: "Confirm Password",
    requirements: "Must match the password.",
  },
  {
    id: "termCondition",
    type: "checkbox",
    name: "termCondition",
    icon: null,
    label: "Term and Condition",
    requirements: null,
  },
];
