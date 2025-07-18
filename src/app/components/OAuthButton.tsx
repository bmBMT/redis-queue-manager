import { Button } from 'antd'
import React, { PropsWithChildren } from 'react'

interface IOAuthButton extends PropsWithChildren {
	icon: React.ReactNode
}

const OAuthButton = ({ icon, children }: IOAuthButton) => {
	return (
		<div className='relative hover:[& *:nth-child(1)]:opacity-0'>
			{/* <div className="bg absolute inset-0 bg-gradient-to-br from-indigo-200 to-indigo-500 rounded-lg transition duration-500" /> */}
			{/* <div className="absolute rounded-lg bg-gradient-to-br from-green-200 to-green-500" /> */}
			<Button
				className='w-full h-[45px] rounded-[10px] bg-transparent text-black bg-linear-to-br from-[#E0EFF6] to-[#EBFCF8] border-none'
				icon={icon}
			>
				{children}
			</Button>
		</div>
	)
}

export default OAuthButton