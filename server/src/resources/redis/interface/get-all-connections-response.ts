import { RedisStatus } from '@redis-queue-manager/shared';

export interface IGetAllConnectionsResponse {
  id: string;
  name: string;
  displayName: string;
  isConnected: boolean;
  status: RedisStatus | null;
}
