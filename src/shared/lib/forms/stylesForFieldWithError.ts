import { __InputStylesNames, CSSProperties } from '@mantine/core';

export const stylesForFieldWithError: Partial<Record<__InputStylesNames, CSSProperties>> = {
  root: {
    position: 'relative',
  },
  input: {
    margin: '5px 0',
  },
  error: {
    position: 'absolute',
  },
};

export const hideErrorMessage = {
  error: {
    display: 'none',
  },
};
