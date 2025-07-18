import { EMAIL_RULE, PASSWORD_RULE } from '@common/constants/zod-rules';
import { z } from 'zod';

export const SignInDto = z.object({
  email: EMAIL_RULE,
  password: PASSWORD_RULE,
});

export type SignInDtoType = z.infer<typeof SignInDto>;
