"use client";

import { Button, Flex, Typography } from "antd";
import { Lock } from "lucide-react";
import ThemeModeSwitchet from "../components/ThemeModeSwitchet";
import { signIn } from "next-auth/react";
import { RoutesConfig } from "../config/routes.config";
import useGradientButtonStyle from "../shared/styles/useGradientButtonStyle";

const AuthPage = () => {
  const { styles, cx } = useGradientButtonStyle();

  return (
    <div className="flex justify-center items-center h-dvh relative">
      <div className="absolute" style={{ top: 20, right: 20 }}>
        <ThemeModeSwitchet />
      </div>
      <Flex vertical gap={20} align="center">
        <Lock size={24} />
        <Flex vertical gap={5} align="center">
          <Typography.Title>Redis Queue Manager</Typography.Title>
          <Typography.Text>Sign in with your Keycloak credentials</Typography.Text>
        </Flex>
        <Button
          size="large"
          type="primary"
          className={cx(styles.linearGradientButton, 'w-full')}
          onClick={() => {
            signIn("keycloak", {
              redirect: true,
              redirectTo: RoutesConfig.DASHBOARD,
            });
          }}
        >
          Keycloak
        </Button>
      </Flex>
    </div>
  );
};

export default AuthPage;
