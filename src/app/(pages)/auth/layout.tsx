'use client'

import { Card, Col, Layout, Row } from 'antd'
import { PropsWithChildren } from 'react'
import ReactPlayer from 'react-player'

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<Layout className='flex justify-center items-center'>
			<Layout.Content
				className='h-dvh w-full flex justify-center items-center bg-[url(/auth/placeholder.png)] bg-cover'
			>
				<div className='backdrop-blur-[4px] absolute w-full h-full' />
				<Card
					className='max-w-[60%] w-full overflow-hidden shadow-[0px_40px_80px_0px_#00000080,0px_100px_100px_0px_#00000040]'
					style={{ background: 'rgba(20, 20, 20, 0.7)' }}
					styles={{ body: { padding: 0 } }}
				>
					<Row>
						<Col span={12}>
							<ReactPlayer
								src='/auth/card_video.mp4'
								playing
								style={{ position: 'absolute', objectFit: 'cover' }}
								width='100%'
								loop
								muted
								height='100%'
							/>
						</Col>
						<Col span={12} className='px-20 py-20'>
							{children}
						</Col>
					</Row>
				</Card>
			</Layout.Content>
		</Layout>
	)
}

export default AuthLayout