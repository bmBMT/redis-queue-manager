import { trpc } from "@client/api/trpc/client/trpc";

const SideProjectsMenu = () => {
  trpc.redis.test.useQuery();

  return <div>SideProjectsMenu</div>;
};

export default SideProjectsMenu;
