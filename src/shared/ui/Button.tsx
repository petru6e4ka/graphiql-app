import { Button as UIButton } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';

interface MyButtonProps extends ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button(props: MyButtonProps) {
  return <UIButton color="teal" {...props} />;
}
