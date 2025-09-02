"use client";

import useThemeModeStore from "~/src/shared/store/themeMode.store";
import { Segmented } from "antd";
import { MoonOutlined, MoonFilled, SunOutlined, SunFilled } from "@ant-design/icons";

const ThemeModeSwitchet = () => {
  const { mode, setMode } = useThemeModeStore();

  return (
    <Segmented
      value={mode}
      onChange={setMode}
      options={[
        { value: "dark", icon: mode === "dark" ? <MoonFilled /> : <MoonOutlined /> },
        { value: "light", icon: mode === "light" ? <SunFilled /> : <SunOutlined /> },
      ]}
    />
  );
};

export default ThemeModeSwitchet;
