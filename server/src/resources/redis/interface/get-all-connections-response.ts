import { RedisStatus } from '@redis-queue-manager/shared';

export interface IGetAllConnectionsResponse {
  name: string;
  displayName: string;
  isConnected: boolean;
  status: RedisStatus | null;
}
