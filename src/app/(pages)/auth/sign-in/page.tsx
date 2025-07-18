'use client';

import useForm from '@client/shared/hooks/useForm';
import { Button, Divider, Form, Input, Space, Typography } from 'antd';
import { SignInDto } from '@server/resources/auth/auth.dto';
import Link from 'next/link';
import Image from 'next/image';
import { Github } from 'lucide-react';
import OAuthButton from '@client/components/OAuthButton';

const SignInPage = () => {
	const { formField, inputField } = useForm({
		schema: SignInDto,
		onSubmit: (data, error) => {
			console.log(data, error);

		}
	});

	return (
		<Form
			initialValues={{ remember: true }}
			autoComplete="off"
			{...formField}
		>
			<Space direction='vertical'>
				<Typography.Title>Sign up</Typography.Title>
				<Typography.Text>Sign up now and gain access to exclusive content!</Typography.Text>
				<Space.Compact block direction='vertical'>
					<Typography.Title level={5}>Email address</Typography.Title>
					<Form.Item {...inputField} name='email'>
						<Input placeholder='name@email.com' />
					</Form.Item>
				</Space.Compact>
				<Space.Compact block direction='vertical'>
					<Typography.Title level={5}>Password</Typography.Title>
					<Form.Item {...inputField} name='password'>
						<Input.Password placeholder='******' />
					</Form.Item>
				</Space.Compact>
				<Typography.Text>
					Forgot password? <Link href='/'>Reset password</Link>
				</Typography.Text>
				<Button type="primary" htmlType="submit" className='w-full mb-3'>
					Sign up
				</Button>
				<Typography.Text>
					By clicking on Sign up, you agree to our Terms of service and Privacy policy.
				</Typography.Text>
				<Divider className='my-5'>or</Divider>
				<Space direction='vertical' size='middle' className='w-full'>
					<OAuthButton icon={<Image src='/icons/google.svg' alt='oauth-google' width={30} height={30} />}>
						Sign with Google
					</OAuthButton>
					<OAuthButton icon={<Github size={30} color='black' />}>
						Sign with Github
					</OAuthButton>
				</Space>
			</Space>
		</Form>
	)
}

export default SignInPage