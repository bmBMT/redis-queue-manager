import { z } from "zod";
import { RedisAddConnectionDto } from "./add-new-conneciton.dto";

export const RedisTestConnectionDto = RedisAddConnectionDto.omit({ name: true, db: true });

export type RedisTestConnectionDtoType = z.infer<typeof RedisTestConnectionDto>;
