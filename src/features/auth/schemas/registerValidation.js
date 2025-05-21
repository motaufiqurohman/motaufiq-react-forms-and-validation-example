import { object, ref, string, boolean, date } from "yup";

const getErrMessage = (fieldName) => ({
  required: `${fieldName} wajib diisi.`,
  min: (minLength) =>
    `${fieldName} must be at least ${minLength} characters long.`,
  max: (maxLength) =>
    `${fieldName} must be at most ${maxLength} characters long.`,
});

export const registerValidationSchema = object({
  fullName: string()
    .required(getErrMessage("Full Name").required)
    .min(5, getErrMessage("Full Name").min(5))
    .max(100, getErrMessage("Full Name").min(100))
    .matches(
      /^[a-zA-Z\s-]+$/,
      "Full Name can only contain letters, spaces, and hyphens (-)."
    )
    .matches(/^[a-zA-Z\s-]+$/, "Full Name cannot contain numbers.")
    .test(
      "two-words",
      "Full Name must include both first and last name.",
      (value) => {
        return value && value.split(" ").length >= 2;
      }
    ),
  userName: string()
    .required(getErrMessage("Username").required)
    .min(4, getErrMessage("Username").min(4))
    .max(30, getErrMessage("Username").max(30))
    .matches(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, dots (.), and underscores(_)."
    )
    .matches(/^[a-zA-Z]/, "Username must start with a letter."),
  idNumber: string()
    .required(getErrMessage("ID Number").required)
    .matches(/^\d{16}$/, "ID Number must be exactly 16 digits."),
  email: string()
    .required(getErrMessage("Email").required)
    .test(
      "no-spaces-or-tabs",
      "Email must not contain spaces or tabs.",
      (value) => (value ? !/[\s\t]/.test(value) : true)
    )
    .email("Invalid email address.")
    .max(320, getErrMessage("Email").max(320)),
  phone: string()
    .required(getErrMessage("Phone Number").required)
    .matches(/^[0-9]+$/, "Phone Number can only contain numbers.")
    .matches(
      /^[1-9][0-9]{9,14}$/,
      "Phone Number must be 10–15 digits and cannot start with 0."
    ),
  dob: date()
    .transform((value, originalValue) =>
      originalValue ? new Date(originalValue) : null
    )
    .required(getErrMessage("Date of Birth").required)
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 17)),
      "Date of Birth must be at least 17 years old."
    ),
  address: string()
    .required(getErrMessage("Address").required)
    .min(5, getErrMessage("Address").min(5))
    .max(500, getErrMessage("Address").min(500))
    .matches(/^[a-zA-Z0-9\s,.'-/]+$/, "Address contains invalid characters."),
  country: string()
    .required(getErrMessage("Country").required)
    .min(2, getErrMessage("Country").min(2))
    .max(50, getErrMessage("Country").min(50))
    .matches(
      /^[a-zA-Z\s-]+$/,
      "${Country} can only contain letters, spaces, and hyphens (-)."
    ),
  password: string()
    .required(getErrMessage("Password").required)
    .min(8, getErrMessage("Password").min(8))
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character."
    )
    .matches(/^\S+$/, "Password must not contain spaces or tabs.")
    .notOneOf([ref("email")], "Password must not be the same as your email."),
  confirmPassword: string()
    .required(getErrMessage("Confirm Password").required)
    .matches(/^\S+$/, "Confirm Password must not contain spaces or tabs.")
    .oneOf([ref("password")], "Confirm Password do not match."),
  termCondition: boolean()
    .oneOf([true], "You must agree to the Terms and Conditions.")
    .required("You must agree to the Terms and Conditions."),
});
