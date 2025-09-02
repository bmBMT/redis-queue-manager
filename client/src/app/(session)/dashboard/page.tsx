'use client'

import AddRedisConnectionModal from '~/src/components/AddRedisConnectionModal';
import { Flex, Typography } from "antd";

const DashboardPage = () => {
  return (
    <Flex vertical gap={32}>
      <Flex justify="space-between" align="center">
        <Flex vertical gap={8}>
          <Typography.Title level={2}>Redis Queue Overview</Typography.Title>
          <Typography.Text type="secondary">
            Monitor all Redis connections and queue statistics across your infrastructure
          </Typography.Text>
        </Flex>
        <AddRedisConnectionModal />
      </Flex>
    </Flex>
  );
};

export default DashboardPage;
