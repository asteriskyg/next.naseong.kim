export const revalidateByTag = async (tag: string) => {
  if (!process.env.NEXT_PUBLIC_APP_URL)
    throw new Error("NEXT_PUBLIC_APP_URL is not defined.");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?tag=${tag}`,
    { method: "POST" },
  );

  if (!res.ok) return undefined;
  return res.json();
};

export const revalidateByPath = async (path: string) => {
  if (!process.env.NEXT_PUBLIC_APP_URL)
    throw new Error("NEXT_PUBLIC_APP_URL is not defined.");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=${path}`,
    { method: "POST" },
  );

  if (!res.ok) return undefined;
  return res.json();
};
