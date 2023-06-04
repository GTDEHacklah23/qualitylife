import pbkdf2 from "pbkdf2";

export function hashPassword(password: string, salt: string) {
  return pbkdf2
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
}
