import { AUTH_ERRORS } from './auth.errors';
import { REDIS_ERRORS } from './redis.errors';
import { USERS_ERRORS } from './user.error';

const ServerErrors = {
	...AUTH_ERRORS,
	...USERS_ERRORS,
	...REDIS_ERRORS
};

export default ServerErrors;
