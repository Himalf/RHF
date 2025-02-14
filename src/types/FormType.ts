import { HTMLProps } from "react";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
}

export interface Form {
  fullName: string;
  email: string;
  password: string;
  username: string;
  hobbies: { name: string }[];
}
