"use client";

import SideProjectsMenu from "@client/components/sider-projects/SideProjectsMenu";
import ThemeModeSwitchet from "@client/components/ThemeModeSwitchet";
import UserPopover from "@client/components/UserPopover";
import { RoutesConfig } from "@client/config/routes.config";
import { Flex, Layout, Splitter, theme, Typography } from "antd";
import { Activity } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

const SessionLayout = ({ children }: PropsWithChildren) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Layout.Header style={{ background: colorBgContainer }} className="flex items-center justify-between">
        <Link href={RoutesConfig.DASHBOARD}>
          <Flex gap={8}>
            <Activity className="text-blue-600" />
            <Typography.Title level={5}>Redis Queue Manager</Typography.Title>
          </Flex>
        </Link>
        <Flex gap={16} align='center'>
          <ThemeModeSwitchet />
          <UserPopover />
        </Flex>
      </Layout.Header>
      <Layout className="h-dvh">
        <Splitter>
          <Splitter.Panel defaultSize={252} min={252}>
            <Layout.Sider style={{ background: colorBgContainer }} className="h-dvh !min-w-[250px] !max-w-none !w-full">
              <SideProjectsMenu />
            </Layout.Sider>
          </Splitter.Panel>
          <Splitter.Panel>
            <Layout.Content>{children}</Layout.Content>
          </Splitter.Panel>
        </Splitter>
      </Layout>
    </Layout>
  );
};

export default SessionLayout;
