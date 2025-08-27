import { RoutesConfig } from "@client/config/routes.config";
import { NextResponse } from "next/server";
import { auth } from "~/auth";
// export default createMiddleware(routing);

export default auth(req => {
  if (!req.auth && req.nextUrl.pathname !== RoutesConfig.AUTH)
    return NextResponse.redirect(new URL(RoutesConfig.AUTH, req.url));

  if (req.auth && req.nextUrl.pathname === RoutesConfig.AUTH)
    return NextResponse.redirect(new URL(RoutesConfig.DASHBOARD, req.url));

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
