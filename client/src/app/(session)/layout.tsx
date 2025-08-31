import Hydrate from '@client/api/trpc/client/hydrate-client';
import SessionLayoutView from "@client/view/layouts/session-layout.view";
import { createSSRHelper } from "@server/index";
import { PropsWithChildren } from "react";

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
