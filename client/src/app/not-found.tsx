import { Button, Result } from "antd";
import React from "react";
import { RoutesConfig } from "../config/routes.config";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link passHref href={RoutesConfig.DASHBOARD}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;
