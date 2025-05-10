import { InputHTMLAttributes } from "react";

import { Input } from "../../ui";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { ClearButton } from "../clear-button";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
};

export const FormInput = ({
  name,
  label,
  required,
  className,
  ...props
}: Props) => {
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...props} />
        <ClearButton />
      </div>

      <ErrorText text={"SOME ERROR"} className="mt-2" />
    </div>
  );
};
