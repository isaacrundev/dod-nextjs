import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const session = await auth();
  session?.user && redirect("/dashboard");

  return <>{children}</>;
}
