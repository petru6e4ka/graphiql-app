import { Button as UIButton } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';

interface MyButtonProps extends ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ type = 'button', ...props }: MyButtonProps) {
  return <UIButton type={type} color="teal" {...props} />;
}
