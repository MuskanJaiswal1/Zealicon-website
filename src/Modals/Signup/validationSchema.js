import * as Yup from "yup";
export const validationSchema1 = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name must be at most 50 characters"),
  email: Yup.string()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com|yahoo\.com|jssaten\.ac\.in$/,
      "Only Gmail, Yahoo and Jssaten addresses are allowed"
    )
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^(\+?91|91)?[6789]\d{9}$/, "Invalid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .required("Phone is required"),
});

export const validationSchema2 = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name must be at most 50 characters"),
  id_card: Yup.mixed().required("Id card Photo is required"),
});
