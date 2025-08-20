 async function isImageUrlValid(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    const contentType = res.headers.get("Content-Type") || "";
    return res.ok && contentType.startsWith("image/");
  } catch {
    return false;
  }
}
export default isImageUrlValid;