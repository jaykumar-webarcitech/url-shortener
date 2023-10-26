import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  styles: Record<string, string>;
  leadingIcon?: React.ReactNode;
}

export default function Input({ styles, leadingIcon, ...props }: InputProps) {
  return (
    <div>
      {props.label && (
        <>
          <label htmlFor={props.id} className={styles.label}>
            {leadingIcon}
            <span>{props.label}</span>
          </label>
        </>
      )}
      <input className={styles.input} {...props} />
    </div>
  );
}
