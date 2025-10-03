import bcrypt from "bcrypt";

export const hashedPassword = async (password, saltRounds = 10) => {
  return await bcrypt.hash(password, saltRounds);
};
export const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
