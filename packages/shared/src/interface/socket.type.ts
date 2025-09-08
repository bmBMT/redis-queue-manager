import { RedisStatus } from "./redis-status.type"

export type RedisChangeStateType = {
  name: string
  isConnected: boolean
  status: RedisStatus
}

export enum SocketEventsEnum {
  REDIS_CHANGE_STATE = "redis-change-state",
}

export type IOEvents = {
  [SocketEventsEnum.REDIS_CHANGE_STATE]: (state: RedisChangeStateType) => void
}
