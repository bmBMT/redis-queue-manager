'use client';

import { ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs';
import { PropsWithChildren } from 'react';
import theme from '@client/config/antd';
import '@ant-design/v5-patch-for-react-19';

const AntdProvider = ({ children }: PropsWithChildren) => {
	return (
		<StyleProvider layer hashPriority="high">
			<ConfigProvider theme={theme}>
				{children}
			</ConfigProvider>
		</StyleProvider>
	)
}

export default AntdProvider