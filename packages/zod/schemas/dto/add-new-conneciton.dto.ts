import { Errors } from '@redis-queue-manager/shared';
import { z } from "zod";

export const RedisAddConnectionDto = z.object({
  name: z.string().min(1, Errors.OTHER_FIELD_SHOULD_NOT_BE_EMPTY),
  host: z.string().min(1, Errors.OTHER_FIELD_SHOULD_NOT_BE_EMPTY),
  password: z.string().optional(),
  db: z
    .number({ required_error: Errors.OTHER_FIELD_SHOULD_NOT_BE_EMPTY })
    .min(1, Errors.OTHER_FIELD_SHOULD_NOT_BE_EMPTY)
    .max(16, Errors.FIELD_MAX_LENGTH(16)),
  port: z
    .number({ required_error: Errors.OTHER_FIELD_SHOULD_NOT_BE_EMPTY })
    .min(1, Errors.OTHER_FIELD_SHOULD_NOT_BE_EMPTY),
});

export type RedisAddConnectionDtoType = z.infer<typeof RedisAddConnectionDto>;
