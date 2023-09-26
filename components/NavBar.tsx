"use client";

import dodLogo from "@/public/img/icons/dod-logo.png";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    const res = await signOut({ redirect: false, callbackUrl: "/" });
    alert("You've logged out successfully!!");
    router.push(res.url);
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 py-4 shadow-sm md:py-6 md:px-20">
        <Link href="/" legacyBehavior passHref>
          <Image
            src={dodLogo}
            alt="dod-logo"
            width={60}
            height={60}
            className="hover:cursor-pointer"
          />
        </Link>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem className="space-x-3">
              {session ? (
                <>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/add-new" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Add New
                    </NavigationMenuLink>
                  </Link>
                  <NavigationMenuLink
                    className={
                      navigationMenuTriggerStyle() + " hover:cursor-pointer"
                    }
                    onClick={handleSignOut}
                  >
                    LOG OUT
                  </NavigationMenuLink>
                </>
              ) : (
                <>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/food-data" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Food Data
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/login-signup" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      LOGIN / SIGNUP
                    </NavigationMenuLink>
                  </Link>
                </>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <FiMenu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                {/* <SheetTitle>Good day!</SheetTitle> */}
                <SheetDescription>{session?.user?.email}</SheetDescription>
              </SheetHeader>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem className="flex flex-col">
                    {session ? (
                      <>
                        <Link href="/dashboard" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetClose>Dashboard</SheetClose>
                          </NavigationMenuLink>
                        </Link>
                        <Link href="/add-new" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetClose>Add New</SheetClose>
                          </NavigationMenuLink>
                        </Link>
                        <NavigationMenuLink
                          className={
                            navigationMenuTriggerStyle() +
                            " hover:cursor-pointer"
                          }
                          onClick={handleSignOut}
                        >
                          <SheetClose>Log out</SheetClose>
                        </NavigationMenuLink>
                      </>
                    ) : (
                      <>
                        <Link href="/" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetClose>Home</SheetClose>
                          </NavigationMenuLink>
                        </Link>
                        <Link href="/food-data" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetClose>Food Search</SheetClose>
                          </NavigationMenuLink>
                        </Link>
                        <Link href="/login-signup" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetClose>Login/Signup</SheetClose>
                          </NavigationMenuLink>
                        </Link>
                      </>
                    )}
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default NavBar;
