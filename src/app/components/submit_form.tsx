"use client";

// ts-ignore because experimental_useFormStatus is not in the types
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import type React from "react";

interface SubmitProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Submit(props: SubmitProps) {
  const { pending }: import("react-dom").FormStatus = useFormStatus();
  return <button type="submit" {...props} disabled={pending} />;
}
