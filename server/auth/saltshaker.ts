import { getRandomValues } from "crypto";

/**
 * Generates a cryptographically secure random string
 * @returns a random string
 */
export function saltshaker() {
  //create a buffer of 32 bytes
  const buffer = Buffer.alloc(32);

  //fill the buffer with random bytes
  getRandomValues(buffer);

  //convert the buffer to a hex string
  return buffer.toString("hex");
}
