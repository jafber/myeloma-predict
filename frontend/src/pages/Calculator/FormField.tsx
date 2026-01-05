import { Input } from "../../components/ui/input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../components/ui/field"

type FormFieldProps = {
  id: string;
  label: string;
  description: string;
  placeholder: string;
  step?: number;
  required?: boolean;
  error?: string;
  register: () => any;
}

export const ErrorMessage = (props: { message?: string }) => {
  if (!props.message) return null;
  return <FieldError>{props.message}</FieldError>;
}

export const FormField = (props: FormFieldProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={props.id}>{props.label}</FieldLabel>
      <FieldDescription>
        {props.description}
      </FieldDescription>
      <Input id={props.id} type="number" placeholder={props.placeholder} step={props.step} required={props.required} {...props.register()} />
      {props.error && (<p className="text-red-500 text-sm mt-1">{props.error}</p>)}
    </Field>
  )
}