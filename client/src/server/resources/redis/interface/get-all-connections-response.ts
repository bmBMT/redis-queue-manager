import { RedisStatus } from "@common/interface/redis-status.type";

export interface IGetAllConnectionsResponse {
  id: string;
  name: string;
  displayName: string;
  registered: boolean;
  status: RedisStatus | null;
}
