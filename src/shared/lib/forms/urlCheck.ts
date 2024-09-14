const url = /(\b(https?|ftp|file):\/\/)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;

export const urlCheck = (invalidMessage: string) => (value: string) => {
  if (value.length < 10 || !url.test(value)) {
    return invalidMessage;
  }

  return null;
};
