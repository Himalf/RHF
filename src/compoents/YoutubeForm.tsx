import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
const YoutubeForm = () => {
  type FormData = {
    username: string;
    email: string;
    channel: string;
  };
  const form = useForm<FormData>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <form
      className="max-w-md mx-auto my-20 p-6 bg-neutral-900"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <input
        type="text"
        placeholder="Username"
        {...register("username", { required: "username is required" })}
        className="w-full mb-4 p-2 bg-neutral-800 border border-neutral-700 text-white rounded"
      />
      <p className="text-red-600">{errors.username?.message}</p>
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: "email is required" })}
        className="w-full mb-4 p-2 bg-neutral-800 border border-neutral-700 text-white rounded"
      />
      <p className="text-red-600">{errors.email?.message}</p>
      <input
        type="text"
        {...register("channel", { required: "channel is required" })}
        placeholder="Channel"
        className="w-full mb-4 p-2 bg-neutral-800 border border-neutral-700 text-white rounded"
      />
      <p className="text-red-600">{errors.channel?.message}</p>
      <button type="submit" className="w-full p-2 bg-white text-black rounded">
        Submit
      </button>
      <DevTool control={control} />
    </form>
  );
};

export default YoutubeForm;
