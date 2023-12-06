import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .required("Password is required"),
});
