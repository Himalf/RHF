import { forwardRef, Ref } from "react";
import { InputProps } from "../types/FormType";

const CustomInput = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const { label, error, ...inputProps } = props;
    return (
      <div className="mb-4">
        <label htmlFor={label} className="block text-gray-600 font-medium mb-1">
          {label}
        </label>
        <input
          {...inputProps}
          ref={ref}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">
            <span className="font-medium">Error:</span> {error}
          </p>
        )}
      </div>
    );
  }
);
export default CustomInput;
