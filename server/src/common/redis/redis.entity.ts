import Redis from "ioredis"

class RedisEntity extends Redis {
	public async getQueueNames() {
		const queues: string[] = []
		let cursor = "0"

		do {
			const [nextCursor, keys] = await this.scan(cursor, "MATCH", "bull:*", "COUNT", 100)

			cursor = nextCursor
			queues.push(...keys.map((k) => k.split(":")[1]))
		} while (cursor !== "0")

		return [...new Set(queues)]
	}
}
export default RedisEntity;
