export const log = (message: any, error?: any) => {
  if (error) {
    console.error("logger:", message, error);
  } else {
    console.log("logger:", message);
  }
};
