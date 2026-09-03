export const formatShortName = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length < 2) return parts[0] ?? "";

  const [first, ...rest] = parts;
  const surnameInitial = rest[rest.length - 1].charAt(0);

  return `${first} ${surnameInitial}.`;
};
