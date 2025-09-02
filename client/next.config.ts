import type { NextConfig } from 'next';
import dotenv from 'dotenv';
import { EnvironmentsConfig } from '@redis-queue-manager/shared';

dotenv.config({ path: [EnvironmentsConfig.client, EnvironmentsConfig.prisma] })

const nextConfig: NextConfig = {
	experimental: {
		authInterrupts: true
	},
};

export default nextConfig;
