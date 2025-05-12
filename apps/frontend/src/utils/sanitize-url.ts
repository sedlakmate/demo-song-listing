// Remove and unify multiple slashes
export const sanitizeUrl = (url: string) => {
  return url.replace(/([^:]\/)\/+/g, '$1');
};
