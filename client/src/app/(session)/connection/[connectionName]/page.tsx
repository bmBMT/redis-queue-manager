import Hydrate from "~/src/config/trpc/hydrate-client";
import { createSSRHelper } from '~/src/shared/utils/createSSRHelper';

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
