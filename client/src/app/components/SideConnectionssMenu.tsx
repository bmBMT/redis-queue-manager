'use client'

import { trpc } from "@client/api/trpc/client/trpc";
import { Menu } from "antd";
import { MenuProps } from "antd/lib";
import { ChartBarStacked, Database, Dot } from "lucide-react";
import Link from "next/link";
import { RoutesConfig } from "@client/config/routes.config";
import { usePathname } from "next/navigation";
import getRedisConnectionColor from "@client/shared/utils/getRedisConnectionColor";

type MenuItem = Required<MenuProps>["items"][number];

const SideConnectionsMenu = () => {
  const { data: connections } = trpc.redis.getAllConnections.useQuery();
  const pathname = usePathname();

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
      children: connections?.map(connection => ({
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
        disabled: !connection.registered,
      })),
    },
  ];

  return (
    <Menu
      selectedKeys={[pathname]}
      mode="vertical"
      className="w-full"
      items={items}
      style={{ borderInlineEnd: "none" }}
    />
  );
};

export default SideConnectionsMenu;
