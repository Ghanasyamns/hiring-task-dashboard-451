export const UpdateUrlQuery = (url: string, key: string, value: string) => {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  searchParams.set(key, value);
  return `${url.split("?")[0]}?${searchParams.toString()}`;
};
