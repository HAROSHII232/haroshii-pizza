import { TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import { Textarea } from "../../ui";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
};

export const FormTextarea = ({
  className,
  name,
  label,
  required,
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errotText = errors?.[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "");
  };

  return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label} {required && <RequiredSymbol />}
      </p>
      <div className="relative">
        <Textarea
          className="h-12 text-md resize-none"
          {...register(name)}
          {...props}
        />
        {Boolean(value) && <ClearButton onClick={onClickClear} />}
      </div>
      {errotText && <ErrorText className="mt-2" text={errotText} />}
    </div>
  );
};
