"use client";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Popover, Typography } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const UserPopover = () => {
	const session = useSession();
	const [open, setOpen] = useState(false);

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
	};

	return (
		<Popover
			trigger="click"
			open={open}
			onOpenChange={handleOpenChange}
			content={
				<Button type="text" onClick={() => signOut()}>
					Выйти
				</Button>
			}
		>
			<Flex gap={8} align="center" className="cursor-pointer">
				<Typography.Text>{session.data?.user?.name}</Typography.Text>
				<Avatar shape="square" size="default" icon={<UserOutlined />} src={session.data?.user?.image} />
			</Flex>
		</Popover>
	);
};

export default UserPopover;
