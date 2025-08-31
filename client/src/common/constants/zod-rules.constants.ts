import { z } from 'zod';
import { PASSWORD_REGEX, SHORT_LENGTH } from './default.constants';
import Errors from '../errors';

export const EMAIL_RULE = z.string().email({ message: Errors.MUST_BE_EMAIL });
export const PASSWORD_RULE = z
	.string()
	.min(1, Errors.OTHER_FIELD_SHOULD_NOT_BE_EMPTY)
	.max(SHORT_LENGTH, Errors.FIELD_MAX_LENGTH(SHORT_LENGTH))
	.regex(PASSWORD_REGEX, Errors.AUTH_PASSWORD_MUST_MATCH);