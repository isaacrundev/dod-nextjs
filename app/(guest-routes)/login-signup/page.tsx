"use client";

import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginSignupPage = () => {
  return (
    <div className="container flex justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="login">LOGIN</TabsTrigger>
            <TabsTrigger value="signup">SIGN UP</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginSignupPage;
