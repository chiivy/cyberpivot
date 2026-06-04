import { Suspense } from "react";

import { AuthForm } from "@/components/auth/auth-form";
import { RouteLoading } from "@/components/shared/route-loading";

export default function LoginPage(): React.ReactElement {
  return (
    <Suspense fallback={<RouteLoading />}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
