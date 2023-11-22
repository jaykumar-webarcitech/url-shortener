"use client";

import { useFormStatus } from "react-dom";
import type React from "react";

interface SubmitProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Submit(props: SubmitProps) {
  const { children, ...rest } = props;
  const { pending } = useFormStatus();
  return (
    <button type="submit" {...rest} disabled={pending}>
      {pending ? "Creating..." : children}
    </button>
  );
}
