import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { DevTool } from "@hookform/devtools";

// Zod Validation Schema
const schema = z.object({
  eventName: z.string().nonempty("Event name is required"),
  organizerEmail: z.string().email("Invalid email format"),
  attendees: z
    .array(
      z.object({
        name: z.string().nonempty("Attendee name is required"),
        age: z
          .number({ invalid_type_error: "Age must be a number" })
          .positive("Age must be positive")
          .int("Age must be an integer"),
      })
    )
    .min(1, "At least one attendee is required"),
});

// Form Data Structure
type FormData = z.infer<typeof schema>;

const EventRegistrationForm = () => {
  const form = useForm<FormData>({
    defaultValues: {
      eventName: "",
      organizerEmail: "",
      attendees: [{ name: "", age: 0 }],
    },
    resolver: zodResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attendees",
  });

  // Submit Handler
  const onSubmit = async (data: FormData) => {
    console.log("Submitted Data: ", data);
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        data
      );
      console.log("Response:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Event Registration</h2>

        <input
          type="text"
          placeholder="Event Name"
          {...register("eventName")}
          className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
        />
        <p className="text-red-600">{errors.eventName?.message}</p>

        <input
          type="email"
          placeholder="Organizer Email"
          {...register("organizerEmail")}
          className="w-full mb-4 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
        />
        <p className="text-red-600">{errors.organizerEmail?.message}</p>

        <div>
          <label className="block font-semibold mb-2">Attendees:</label>
          {fields.map((item, index) => (
            <div key={item.id} className="mb-4">
              <input
                type="text"
                placeholder="Attendee Name"
                {...register(`attendees.${index}.name`)}
                className="w-full mb-2 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
              />
              <p className="text-red-600">
                {errors.attendees?.[index]?.name?.message}
              </p>

              <input
                type="number"
                placeholder="Attendee Age"
                {...register(`attendees.${index}.age`, {
                  valueAsNumber: true, // Convert string to number
                })}
                className="w-full mb-2 p-2 bg-neutral-100 border border-neutral-300 text-black rounded"
              />
              <p className="text-red-600">
                {errors.attendees?.[index]?.age?.message}
              </p>

              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-600 text-white rounded px-2 py-1 mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "", age: 0 })}
            className="bg-green-600 text-white rounded px-2 py-1"
          >
            Add Attendee
          </button>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* React Hook Form DevTool for debugging */}
      <DevTool control={control} />
    </FormProvider>
  );
};

export default EventRegistrationForm;
