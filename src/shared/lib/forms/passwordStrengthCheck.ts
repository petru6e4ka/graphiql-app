export const passwordStrengthCheck = (invalidMessage: string) => (value: string) => {
  if (value.length < 8) {
    return invalidMessage;
  }

  if (!/[0-9]/.test(value)) {
    return invalidMessage;
  }

  if (!/[A-Za-z\u0400-\u04FF]/.test(value)) {
    return invalidMessage;
  }

  if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) {
    return invalidMessage;
  }

  return null;
};
