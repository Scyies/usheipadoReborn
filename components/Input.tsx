import { InputHTMLAttributes, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export interface TextInputRootProps {
  children: ReactNode;
}

function TextInputRoot({ children }: TextInputRootProps) {
  return (
    <div className='flex items-center gap-3 py-4 px-3 h-12 rounded bg-gray-700 w-full focus-within:ring-2 ring-orange-500'>
      {children}
    </div>
  );
}

TextInputRoot.displayName = 'TextInput.Root';

export interface TextInputIconProps {
  children: ReactNode;
}

function TextInputIcon({ children }: TextInputIconProps) {
  return <Slot className='w-6 h-6 text-gray-300'>{children}</Slot>;
}

TextInputIcon.displayName = 'TextInput.Icon';

function TextInputInput({ ...rest }: TextInputInputProps) {
  return (
    <input
      className='bg-transparent flex-1 text-white-200 text-xs outline-none placeholder:text-gray-300'
      {...rest}
    />
  );
}

TextInputInput.displayName = 'TextInput.Input';

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
};

interface InputProps extends TextInputInputProps {
  icon?: ReactNode;
}

export function Input({ icon, ...rest }: InputProps) {
  return (
    <TextInput.Root>
      <TextInput.Icon>{icon}</TextInput.Icon>
      <TextInput.Input {...rest} />
    </TextInput.Root>
  );
}
