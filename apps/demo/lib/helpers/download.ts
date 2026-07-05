/**
 * Downloads a file from the given URL and saves it with the specified filename and type.
 *
 * @param url The URL of the file to download.
 * @param filename The name to save the downloaded file as.
 * @param type The MIME type of the file.
 */
export default async function download(
  url: string,
  filename: string,
  type: string,
) {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], filename, { type });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
