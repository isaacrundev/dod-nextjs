"use client";

import dodLogo from "@/public/img/icons/dod-logo.png";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import { Pixelify_Sans } from "next/font/google";
import { useToast } from "@/hooks/use-toast";

const pixelifySans = Pixelify_Sans({ subsets: ["latin"] });

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const res = await signOut({ redirect: false, callbackUrl: "/" });
    toast({ description: "You've logged out successfully!!" });
    router.push(res.url);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between px-5 py-4 shadow-sm md:px-20 md:py-0">
      <Link href="/" className="flex items-center gap-3 hover:cursor-pointer">
        <Image priority src={dodLogo} alt="dod-logo" width={60} height={60} />
        <p className={`${pixelifySans.className} text-2xl`}>DietOrDie</p>
      </Link>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className="flex h-20 items-center gap-3">
          {session ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/dashboard">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/add-new">Add New</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button
                  type="button"
                  className={navigationMenuTriggerStyle() + " hover:cursor-pointer"}
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/food-data">Food Data</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/login-signup">Login/Signup</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button type="button" aria-label="Open navigation menu">
              <FiMenu className="h-8 w-8" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>{session?.user?.email}</SheetDescription>
            </SheetHeader>

            <NavigationMenu className="mx-auto pt-10">
              <NavigationMenuList className="flex flex-col gap-5">
                {session ? (
                  <>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/dashboard">
                          <SheetClose>Dashboard</SheetClose>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/add-new">
                          <SheetClose>Add New</SheetClose>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <button
                        type="button"
                        className={navigationMenuTriggerStyle() + " hover:cursor-pointer"}
                        onClick={handleSignOut}
                      >
                        <SheetClose>Logout</SheetClose>
                      </button>
                    </NavigationMenuItem>
                  </>
                ) : (
                  <>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">
                          <SheetClose>Home</SheetClose>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/food-data">
                          <SheetClose>Food Search</SheetClose>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/login-signup">
                          <SheetClose>Login/Signup</SheetClose>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavBar;
