import { Suspense } from "react";

import { AuthForm } from "@/components/auth/auth-form";
import { RouteLoading } from "@/components/shared/route-loading";

export default function SignupPage(): React.ReactElement {
  return (
    <Suspense fallback={<RouteLoading />}>
      <AuthForm mode="signup" />
    </Suspense>
  );
}
