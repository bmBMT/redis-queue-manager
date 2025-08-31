export const RoutesConfig = {
	AUTH: '/',
	DASHBOARD: '/dashboard',
	CONNECTION: {
		REDIS: (name: string) => `/connection/${name}`,
		QUEUE: (connectionName: string, queueName: string) => `/connection/${connectionName}/queue/${queueName}`,
	}
}