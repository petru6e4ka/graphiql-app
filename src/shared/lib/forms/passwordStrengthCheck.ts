const containsDigitRegex = /[0-9]/;
const containsLetterRegex = /[A-Za-z\u0400-\u04FF]/;
const containsSpecialCharRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;

export const passwordStrengthCheck = (invalidMessage: string) => (value: string) => {
  if (value.length < 8 || !containsDigitRegex.test(value) || !containsLetterRegex.test(value) || !containsSpecialCharRegex.test(value)) {
    return invalidMessage;
  }

  return null;
};
