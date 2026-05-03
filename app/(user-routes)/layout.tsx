import { auth } from "@/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const session = await auth();
  !session?.user && redirect("/unauthenticated");

  return <div className="pt-8">{children}</div>;
}
