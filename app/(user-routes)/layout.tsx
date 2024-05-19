import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);
  !session?.user && redirect("/unauthenticated");

  return <div className="pt-8">{children}</div>;
}
