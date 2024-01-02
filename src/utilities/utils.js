// this function is used to add style class to an element dynamically
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const isValidFileType = (filename) => {
  const allowedExtensions = ["doc", "docx"];
  const fileExtension = filename.split(".").pop();
  return allowedExtensions.includes(fileExtension);
};

export const formatFileSize = (size) => {
  if (size < 1024) return `${size} bytes`;
  if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1048576).toFixed(1)} MB`;
};
