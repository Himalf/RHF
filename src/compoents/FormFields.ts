export const formFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    validation: {
      required: "Full name is required",
    },
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    validation: {
      minLength: {
        value: 6,
        message: "Username should be at least 6 letters",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Enter a valid email address",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password should be at least 6 characters",
      },
    },
  },
];
