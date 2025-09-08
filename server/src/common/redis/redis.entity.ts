import Redis from "ioredis"
import arrayConverter from "../../utils/arrayConverter"

class RedisEntity extends Redis {
  public get queueNames() {
    return this.getFolderNames("bull")
  }

  public get cacheNames() {
    return this.getFolderNames("cache")
  }

  private async getFolderNames(...names: string[]) {
    const list = []
    let cursor = "0"

    do {
      const [nextCursor, keys] = await this.scan(cursor, "MATCH", `${names.join(":")}:*`, "COUNT", 20000)

      cursor = nextCursor
      list.push(keys)
    } while (cursor !== "0")

    const queues: string[] = arrayConverter(list.flat(), (k) => k.split(":")[1])

    return [...new Set(queues)]
  }
}
export default RedisEntity
