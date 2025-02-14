import { useFieldArray, useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import { Form } from "../types/FormType";
import { formFields } from "./FormFields";

const CustomForm = () => {
  const { register, formState, handleSubmit, control, getValues, setValue } =
    useForm<Form>({
      defaultValues: {
        username: "Ramlal",
        email: "",
        password: "",
        fullName: "",
        hobbies: [{ name: "" }],
      },
    });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "hobbies",
  });

  const onFormSubmit = (data: Form) => {
    console.log(data);
  };
  const handleSetValues = () => {
    setValue("fullName", "Ramlal Kharel");
    setValue("email", "ramlal@gmail.com");
    setValue("password", "********"),
      setValue("username", "Ramlal"),
      setValue("hobbies", [{ name: "Swim" }, { name: "Sing" }]);
  };
  const { errors } = formState;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {formFields.map((field, i) => (
            <div key={i} className="mb-4">
              <CustomInput
                {...register(field.name as keyof Form, field.validation)}
                label={field.label}
                name={field.name}
                type={field.type}
                error={errors[field.name as keyof Form]?.message as string}
              />
            </div>
          ))}
          <h2 className="text-lg font-semibold mt-4 mb-2">Hobbies</h2>
          {fields.map((item, index) => {
            return (
              <div key={item.id} className="flex gap-4 mb-4 items-center">
                <CustomInput
                  {...register(`hobbies.${index}.name` as const, {
                    required: "Hobby is needed",
                  })}
                  label={`Hobby ${index + 1}`}
                  type="text"
                  error={errors.hobbies?.[index]?.name?.message}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => append({ name: "" })}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors mb-4"
          >
            Add Hobby
          </button>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mt-4"
            onClick={handleSetValues}
          >
            Set Values
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomForm;
