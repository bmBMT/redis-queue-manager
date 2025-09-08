"use client"

import SideConnectionsMenu from "@//components/SideConnectionssMenu"
import ThemeModeSwitchet from "@//components/ThemeModeSwitchet"
import UserPopover from "@//components/UserPopover"
import { RoutesConfig } from "@//config/routes.config"
import { Flex, Layout, Splitter, theme, Typography } from "antd"
import { Activity } from "lucide-react"
import Link from "next/link"
import { PropsWithChildren, useEffect } from "react"
import SocketConnectionIndicator from "@//components/SocketConnectionIndicator"
import { useBoolean } from "usehooks-ts"
import { socket } from "@//config/socket.config"

const SessionLayoutView = ({ children }: PropsWithChildren) => {
  const { value: isConnected, setTrue: setIsConnected, setFalse: setIsDisconnected } = useBoolean()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  useEffect(() => {
    socket.connect()

    function onConnect() {
      setIsConnected()
    }

    function onDisconnect() {
      setIsDisconnected()
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout className="h-dvh">
      <Layout.Header style={{ background: colorBgContainer }} className="flex items-center justify-between">
        <SocketConnectionIndicator isConnected={isConnected} />
        <Link href={RoutesConfig.DASHBOARD}>
          <Flex gap={8}>
            <Activity className="text-blue-600" />
            <Typography.Title level={5}>Redis Queue Manager</Typography.Title>
          </Flex>
        </Link>
        <Flex gap={16} align="center">
          <ThemeModeSwitchet />
          <UserPopover />
        </Flex>
      </Layout.Header>
      <Layout>
        <Splitter>
          <Splitter.Panel defaultSize={252} min={252}>
            <Layout.Sider
              style={{ background: colorBgContainer }}
              className="h-full !min-w-[250px] !max-w-none !w-full"
            >
              <SideConnectionsMenu />
            </Layout.Sider>
          </Splitter.Panel>
          <Splitter.Panel min="70%">
            <Layout.Content className="p-8">{children}</Layout.Content>
          </Splitter.Panel>
        </Splitter>
      </Layout>
    </Layout>
  )
}

export default SessionLayoutView
