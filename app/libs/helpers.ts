export function generateUsername(firstName: string, lastName: string) {
  // Trim the first name and last name to 4 characters
  const trimmedFirstName = firstName.trim().toLowerCase().slice(0, 4);
  const trimmedLastName = lastName.trim().toLowerCase().slice(0, 4);

  // Generate a random number between 100 and 999
  const randomNumber = Math.floor(Math.random() * 900) + 100;

  // Concatenate the trimmed first name, last name, and random number
  const username = trimmedFirstName + trimmedLastName + randomNumber;

  return username;
}
