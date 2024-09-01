export const passwordStrengthCheck = (invalidMessage: string) => (value: string) => {
  if (value.length < 8) {
    return invalidMessage;
  }

  if (!/[0-9]/.test(value)) {
    return invalidMessage;
  }

  if (!/\p{Letter}/u.test(value)) {
    return invalidMessage;
  }

  if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) {
    return invalidMessage;
  }

  return null;
};
