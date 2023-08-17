import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);
  session?.user && redirect("/dashboard");

  return <>{children}</>;
}
