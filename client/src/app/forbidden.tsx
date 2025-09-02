"use client";

import { Button, Result } from "antd";
import React from "react";
import { RoutesConfig } from "../config/routes.config";
import Link from "next/link";

const ForbiddenPage = () => {
  const backRoute = document.referrer || RoutesConfig.DASHBOARD;

  return (
    <div className="flex justify-center items-center h-dvh">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link href={backRoute} passHref>
            <Button type="primary">Go back</Button>
          </Link>
        }
      />
    </div>
  );
};

export default ForbiddenPage;
