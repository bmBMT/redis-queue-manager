import { publicProcedure, router } from '../../trpc';
import { SignInDto } from './auth.dto';
import AuthService from './auth.service';

class AuthRouter {
	constructor(
		private readonly authService: AuthService
	) { }

	public readonly router = router({
		signUp: publicProcedure
			.input(SignInDto)
			.mutation(({ input }) => this.authService.signUp(input))
	})
}

export default AuthRouter;