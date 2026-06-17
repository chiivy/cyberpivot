import { redirect } from "next/navigation";

export default function RolesIndexRedirect(): never {
  redirect("/paths");
}
