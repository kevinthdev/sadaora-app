export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function getInitials(name: string): string {
  const names = name.trim().split(" ");
  const initials = names[0][0] + (names[1]?.[0] || "");
  return initials;
}
