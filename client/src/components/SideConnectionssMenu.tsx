"use client"

import { trpc } from "@//config/trpc/trpc"
import { Menu } from "antd"
import { MenuProps } from "antd/lib"
import { ChartBarStacked, Database, Dot } from "lucide-react"
import Link from "next/link"
import { RoutesConfig } from "@//config/routes.config"
import { usePathname } from "next/navigation"
import getRedisConnectionColor from "@//shared/utils/getRedisConnectionColor"
import { useEffect } from "react"
import { RedisChangeStateType, SocketEventsEnum } from "@redis-queue-manager/shared"
import { socket } from "@/config/socket.config"

type MenuItem = Required<MenuProps>["items"][number]

const SideConnectionsMenu = () => {
  const { data: connections } = trpc.redis.getAllConnections.useQuery()
  const pathname = usePathname()
  const { redis } = trpc.useUtils()

  useEffect(() => {
    const updateRedisConnectionState = (data: RedisChangeStateType) => {
      redis.getAllConnections.setQueriesData(undefined, {}, (state) =>
        state?.map((item) =>
          item.id === data.id ? { ...item, isConnected: data.isConnected, status: data.status } : item
        )
      )
    }

    socket.on(SocketEventsEnum.REDIS_CHANGE_STATE, updateRedisConnectionState)

    return () => {
      socket.off(SocketEventsEnum.REDIS_CHANGE_STATE, updateRedisConnectionState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const items: MenuItem[] = [
    {
      key: RoutesConfig.DASHBOARD,
      label: <Link href={RoutesConfig.DASHBOARD}>Overview</Link>,
      icon: <ChartBarStacked size={18} />,
    },
    {
      key: "connections",
      label: "Connections",
      type: "group",
      children: connections?.map((connection) => ({
        key: RoutesConfig.CONNECTION.REDIS(connection.name),
        label: (
          <Link
            className="inline-flex justify-between items-center w-(--side-menu-item-width)"
            href={RoutesConfig.CONNECTION.REDIS(connection.name)}
          >
            <span>{connection.displayName}</span>
            <Dot size={40} className={getRedisConnectionColor(connection.status)} />
          </Link>
        ),
        icon: <Database size={18} />,
        disabled: !connection.isConnected,
      })),
    },
  ]

  return (
    <Menu
      selectedKeys={[pathname]}
      mode="vertical"
      className="w-full"
      items={items}
      style={{ borderInlineEnd: "none" }}
    />
  )
}

export default SideConnectionsMenu
