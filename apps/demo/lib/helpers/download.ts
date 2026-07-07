/**
 * Downloads a file from the given URL and saves it with the specified filename and type.
 *
 * @param src The URL or Blob of the file to download.
 * @param filename The name to save the downloaded file as.
 * @param type The MIME type of the file.
 */
export default async function download(
  src: string | Blob,
  filename: string,
  type: string,
) {
  let blob: Blob;
  if (typeof src === "string") {
    const response = await fetch(src);
    blob = await response.blob();
  } else blob = src;
  const file = new File([blob], filename, { type });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
