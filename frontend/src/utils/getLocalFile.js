export default function getImageFile(event) {
  //get the target from the event

  const { type, name, size } = event.target.files[0];
  if (
    type === "image/jpg" ||
    type === "image/png" ||
    type === "image/jpeg" ||
    type === "image/svg" ||
    type === "image/gif" ||
    type === "image/tiff"
  ) {
    return [
      { name, type, size, validImage: true },
      event.target.files[0],
    ];
  }
  return false;
}
