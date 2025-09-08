import Hydrate from '@//config/trpc/hydrate-client';
import SessionLayoutView from "@//view/layouts/session-layout.view";
import { PropsWithChildren } from "react";
import { createSSRHelper } from '@//shared/utils/createSSRHelper';

const SessionLayout = async ({ children }: PropsWithChildren) => {
  const helpers = createSSRHelper();

  await helpers.redis.getAllConnections.prefetch();

  return (
    <Hydrate state={helpers.dehydrate()}>
      <SessionLayoutView>{children}</SessionLayoutView>
    </Hydrate>
  );
};

export default SessionLayout;
