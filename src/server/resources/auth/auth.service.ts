import prisma from '@server/lib/prisma';
import { SignInDtoType } from './auth.dto';
import { TRPCError } from '@trpc/server';
import ServerErrors from '@server/common/errors';
import { encryptPassword } from '@server/utils/encrypt-password';

class AuthService {
	public async signUp(dto: SignInDtoType) {
		await this._validateEmail(dto.email);

    const hashedPassword = await encryptPassword(dto.password);

		const data = {
			email: dto.email,
			password: hashedPassword,
		}

		const user = await prisma.user.create({ data });

		return user;
	}

	private async _validateEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (user) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: ServerErrors.AUTH_LOGIN_OR_PASSWORD_INCORRECT,
			});
		}
	}
}

export default AuthService;