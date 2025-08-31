import { createSSRHelper } from "@server/index";
import Hydrate from "@client/api/trpc/client/hydrate-client";

interface IConnectionPage {
  params: Promise<{ connectionName: string }>;
}

const ConnectionPage = async ({ params }: IConnectionPage) => {
  const { connectionName } = await params;
  const helpers = createSSRHelper();

  await helpers.redis.getConnectionByName.prefetch({ name: connectionName });

	if (helpers.queryClient.getQueryData([]))

  return <Hydrate state={helpers.dehydrate()}>ConnectionPage</Hydrate>;
};

export default ConnectionPage;
