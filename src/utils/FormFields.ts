export const FormFields = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    validation: { required: "Username is required" },
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    validation: {
      required: "Email is required",
      validate: {
        EmailFormat: (value: string) =>
          value.endsWith("fusemachines.com") ||
          "Email should be of example@fusemachines.com",
      },
    },
  },
  {
    name: "channel",
    type: "text",
    placeholder: "Channel",
    validation: { required: "Channel is required" },
  },
  {
    name: "age",
    type: "number",
    placeholder: "Age",
    validation: {
      valueAsNumber: true,
      required: "Age is required",
    },
  },
  {
    name: "dob",
    type: "date",
    placeholder: "Date of Birth",
    validation: {
      required: "Date of Birth is required",
    },
  },
];
