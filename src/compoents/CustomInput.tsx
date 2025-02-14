import { forwardRef, HTMLProps, Ref } from "react";
interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
}

const CustomInput = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const { label, error, ...inputProps } = props;
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <input {...inputProps} ref={ref} className="border border-black" />
        {error && <p>Error message: {error}</p>}
      </div>
    );
  }
);

export default CustomInput;
