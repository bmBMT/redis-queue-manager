"use client";

import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, Layout } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { PropsWithChildren } from "react";
import theme from "@client/config/antd.config";
import useThemeModeStore from "@client/shared/store/themeMode.store";
import { theme as antdTheme } from "antd";
import Errors from "@common/errors";

const AntdProvider = ({ children }: PropsWithChildren) => {
  const { mode } = useThemeModeStore();

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          ...theme,
          algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }}
        form={{ validateMessages: { required: Errors.OTHER_FIELD_SHOULD_NOT_BE_EMPTY } }}
      >
        <Layout>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default AntdProvider;
