import { OTHER_ERRORS } from "./other-errors";
import { REDIS_ERRORS } from './redis.errors';

export const Errors = {
  ...OTHER_ERRORS,
  ...REDIS_ERRORS,
};