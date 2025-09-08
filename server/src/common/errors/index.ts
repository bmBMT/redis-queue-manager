import { AUTH_ERRORS } from './auth.errors';
import { USERS_ERRORS } from './user.error';

const ServerErrors = {
	...AUTH_ERRORS,
	...USERS_ERRORS
};

export default ServerErrors;
