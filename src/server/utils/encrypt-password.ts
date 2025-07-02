import * as bcrypt from 'bcryptjs';

export const saltRounds = process.env.SALT_ROUNDS
  ? parseInt(process.env.SALT_ROUNDS, 10)
  : 10;

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};
