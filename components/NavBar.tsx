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
import { Pixelify_Sans } from "next/font/google";

const pixelifySans = Pixelify_Sans({ subsets: ["latin"] });

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
      <div className="flex items-center justify-between px-5 py-4 shadow-sm md:px-20 md:py-0">
        <Link href="/" legacyBehavior passHref>
          <div className="flex items-center gap-3 hover:cursor-pointer">
            <Image
              priority
              src={dodLogo}
              alt="dod-logo"
              width={60}
              height={60}
            />
            <p className={`${pixelifySans.className} text-2xl`}>DietOrDie</p>
          </div>
        </Link>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex items-center h-20 gap-3">
            {session ? (
              <>
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/add-new" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Add New
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={
                      navigationMenuTriggerStyle() + " hover:cursor-pointer"
                    }
                    onClick={handleSignOut}
                  >
                    Logout
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/food-data" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Food Data
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/login-signup" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Login/Signup
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <FiMenu className="w-8 h-8" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                {/* <SheetTitle>Good day!</SheetTitle> */}
                <SheetDescription>{session?.user?.email}</SheetDescription>
              </SheetHeader>

              <NavigationMenu className="pt-10 mx-auto">
                <NavigationMenuList className="flex flex-col gap-5">
                  {session ? (
                    <>
                      <NavigationMenuItem>
                        <Link href="/dashboard" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetClose>Dashboard</SheetClose>
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link href="/add-new" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetClose>Add New</SheetClose>
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          className={
                            navigationMenuTriggerStyle() +
                            " hover:cursor-pointer"
                          }
                          onClick={handleSignOut}
                        >
                          <SheetClose>Logout</SheetClose>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </>
                  ) : (
                    <>
                      <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetClose>Home</SheetClose>
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link href="/food-data" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetClose>Food Search</SheetClose>
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link href="/login-signup" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetClose>Login/Signup</SheetClose>
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    </>
                  )}
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
