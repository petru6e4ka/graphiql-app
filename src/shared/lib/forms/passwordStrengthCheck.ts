export const passwordStrengthCheck = (value: string) => {
  if (value.length < 8) {
    return 'Invalid password';
  }

  if (!/[0-9]/.test(value)) {
    return 'Invalid password';
  }

  if (!/\p{Letter}/u.test(value)) {
    return 'Invalid password';
  }

  if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) {
    return 'Invalid password';
  }

  return null;
};
