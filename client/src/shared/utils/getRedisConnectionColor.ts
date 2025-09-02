import { RedisStatus } from '@redis-queue-manager/shared';

const getRedisConnectionColor = (status: RedisStatus | null): string => {
  switch (status) {
    case "connect":
    case "ready":
      return "text-green-500";
    case "close":
    case "end":
      return "text-red-500";
    case "connecting":
    case "reconnecting":
      return "text-yellow-500";
    case "wait":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

export default getRedisConnectionColor;
