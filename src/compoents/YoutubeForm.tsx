import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const YoutubeForm = () => {
  // Define the form data structure using TypeScript interface
  type FormData = {
    username: string;
    email: string;
    channel: string;
    // Nested object fields for social media
    social: {
      twitter: string;
      facebook: string;
    };
    // Array fields for static phone numbers
    phoneNumbers: string[];
    // Array fields for dynamic phone numbers with objects
    phNumbers: {
      number: string;
    }[];
    // Numeric and Date fields
    age: number;
    dob: Date;
  };

  // Initialize the form with default values using React Hook Form
  const form = useForm<FormData>({
    defaultValues: {
      username: "Hari", // Pre-filled username
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""], // Two static phone number fields by default
      phNumbers: [{ number: "" }], // One dynamic phone number field by default
      age: 18,
      dob: new Date(), // Default to current date
    },
  });

  // Destructuring methods from useForm and useFieldArray hooks
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers", // Managing dynamic phone numbers
    control,
  });

  // Watch all field values for debugging or dynamic rendering
  const watchFieldValue = watch();

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  //   get values method
  const handleGetValues = () => {
    window.confirm(JSON.stringify(getValues()));
    return (
      <div className="w-screen h-screen bg-red-800 text-white">
        GetValues: {JSON.stringify(getValues())}
      </div>
    );
  };
  const handleSetValues = () => {
    setValue("username", "Ramlal");
    setValue("email", "ram@fusemachines.com");
    setValue("channel", "Ram's Channel");
    setValue("social.twitter", "@ramlal");
    setValue("social.facebook", "ramlal.fb");
    setValue("phoneNumbers.0", "1234567890");
    setValue("phoneNumbers.1", "0987654321");
    setValue("phNumbers", [{ number: "1111111111" }, { number: "2222222222" }]);
    setValue("age", 25);
    setValue("dob", new Date("2000-01-01"));
  };

  return (
    <form
      className="max-w-md mx-auto my-20 p-6 bg-white rounded-lg shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Displaying watched field values for debugging */}
      {/* <div className="mb-4">Values : {JSON.stringify(watchFieldValue)}</div> */}

      {/* Username Field */}
      <input
        type="text"
        placeholder="Username"
        {...register("username", { required: "Username is required" })}
        className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
      />
      <p className="text-red-600">{errors.username?.message}</p>

      {/* Email Field with custom validation */}
      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          validate: {
            EmailFormat: (value) => {
              // Custom validation to allow only specific domain
              return (
                value.endsWith("fusemachines.com") ||
                "Email should be of example@fusemachines.com"
              );
            },
          },
        })}
        className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
      />
      <p className="text-red-600">{errors.email?.message}</p>

      {/* Channel Field */}
      <input
        type="text"
        {...register("channel", { required: "Channel is required" })}
        placeholder="Channel"
        className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
      />
      <p className="text-red-600">{errors.channel?.message}</p>

      {/* Social Media Fields */}
      <input
        type="text"
        {...register("social.twitter")}
        placeholder="Twitter"
        className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
      />
      <input
        type="text"
        {...register("social.facebook")}
        placeholder="Facebook"
        className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
      />

      {/* Static Phone Numbers */}
      <input
        type="text"
        {...register("phoneNumbers.0")}
        placeholder="Phone Number 1"
        className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
      />
      <input
        type="text"
        {...register("phoneNumbers.1")}
        placeholder="Phone Number 2"
        className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
      />

      {/* Dynamic Phone Numbers */}
      <div>
        <label className="block text-black mb-2">List of phone numbers</label>
        {fields.map((val, i) => (
          <div key={val.id} className="mb-4 flex gap-2">
            <input
              type="text"
              {...register(`phNumbers.${i}.number` as const)}
              className="w-full p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
            />
            {/* Remove Button */}
            {i > 0 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="bg-red-600 text-white rounded px-2 py-1"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {/* Add Button */}
        <button
          type="button"
          onClick={() => append({ number: "" })}
          className="bg-green-600 text-white rounded px-2 py-1"
        >
          Add
        </button>
      </div>

      {/* Numeric and date values */}
      <input
        type="number"
        {...register("age", {
          valueAsNumber: true,
          required: "Age is required",
        })}
        placeholder="Age"
        className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
      />
      <p className="text-red-600">{errors.age?.message}</p>

      <input
        type="date"
        {...register("dob", {
          //   valueAsDate: true,
          required: "Date of Birth is required",
        })}
        placeholder="Date of Birth"
        className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
      />
      <p className="text-red-600">{errors.dob?.message}</p>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded mt-4"
      >
        Submit
      </button>
      <button
        type="button"
        className="w-full p-2 bg-blue-600 text-white rounded mt-4"
        onClick={handleGetValues}
      >
        Get Values
      </button>
      <button
        type="button"
        className="w-full p-2 bg-blue-600 text-white rounded mt-4"
        onClick={handleSetValues}
      >
        Set Values
      </button>

      {/* React Hook Form DevTool for debugging */}
      <DevTool control={control} />
    </form>
  );
};

export default YoutubeForm;
