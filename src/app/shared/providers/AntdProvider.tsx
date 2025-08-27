"use client";

import { ConfigProvider, Layout } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { PropsWithChildren } from "react";
import theme from "@client/config/antd";
import "@ant-design/v5-patch-for-react-19";
import useThemeModeStore from "@client/shared/store/themeMode.store";
import { theme as antdTheme } from "antd";

const AntdProvider = ({ children }: PropsWithChildren) => {
  const { mode } = useThemeModeStore();

  return (
    <StyleProvider layer hashPriority="high">
      <ConfigProvider
        theme={{
          ...theme,
          algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }}
      >
        <Layout>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default AntdProvider;
