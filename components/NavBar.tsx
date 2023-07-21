"use client";

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
import { useState } from "react";

const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    const res = await signOut({ redirect: false, callbackUrl: "/" });
    alert("You've logged out successfully!!");
    router.push(res.url);
  };
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="space-x-3">
            {/* {session?.user ? ( */}
            {isLogin ? (
              <>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
                <Link href="/add-new" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Add New
                  </NavigationMenuLink>
                </Link>
                {/* <Link href="/logout" legacyBehavior passHref> */}
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() + " hover:cursor-pointer"
                  }
                  onClick={handleSignOut}
                >
                  LOG OUT
                </NavigationMenuLink>
                {/* </Link> */}
              </>
            ) : (
              <>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
                <Link href="/food-data" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Food Data Preview
                  </NavigationMenuLink>
                </Link>
                <Link href="/login-signup" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    LOGIN / SIGNUP
                  </NavigationMenuLink>
                </Link>
              </>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default NavBar;

{
  /* <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>; */
}
