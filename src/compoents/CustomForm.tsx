import { Form, useForm } from "react-hook-form";
import CustomInput from "./CustomInput";

interface Form {
  username: string;
}
const CustomForm = () => {
  const { register, formState, handleSubmit } = useForm<Form>();
  const onFormSubmit = (data: Form) => {
    console.log(data);
  };
  const { errors } = formState;
  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CustomInput
          {...register("username", {
            minLength: {
              value: 6,
              message: "Username Should be of 6 letters",
            },
          })}
          label={"username"}
          error={errors.username?.message}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomForm;
