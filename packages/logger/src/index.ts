export const log = (message: unknown, error?: unknown) => {
  if (error) {
    console.error("logger:", message, error);
  } else {
    console.log("logger:", message);
  }
};
