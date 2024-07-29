export const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;

export const validateUsername = (username: string): boolean => {
  return usernameRegex.test(username);
};
