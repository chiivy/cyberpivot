const USERNAME_PATTERN = /^[a-z0-9]([a-z0-9-]{0,28}[a-z0-9])?$/;
const RANDOM_USERNAME_PATTERN = /^[a-z0-9]{10}$/;
const RANDOM_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomCabinetUsername(): string {
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);

  return Array.from(bytes, (byte) => RANDOM_ALPHABET[byte % RANDOM_ALPHABET.length]).join(
    "",
  );
}

export function isRandomCabinetUsername(username: string): boolean {
  return RANDOM_USERNAME_PATTERN.test(username);
}

export function isValidCabinetUsername(username: string): boolean {
  return USERNAME_PATTERN.test(username);
}

export function normalizeCabinetUsernameParam(username: string): string {
  return username.trim().toLowerCase();
}
