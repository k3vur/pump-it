import { Field } from "@base-ui/react";

type TextInputProps = Readonly<Field.Control.Props>;

export function TextInput({ ...controlProps }: TextInputProps) {
  return (
    <Field.Control
      className="w-full rounded-full bg-gray-500 px-4 py-2 text-center font-space-grotesk outline outline-primary"
      {...controlProps}
    />
  );
}
