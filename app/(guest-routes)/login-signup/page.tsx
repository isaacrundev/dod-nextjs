"use client";

import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginSignupPage = () => {
  return (
    <div className="flex justify-center min-h-screen px-4 py-16 bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <Tabs defaultValue="login">
          <div className="space-y-4">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="login">LOGIN</TabsTrigger>
                <TabsTrigger value="signup">SIGN UP</TabsTrigger>
              </TabsList>
            </div>
            <div className="p-8 bg-white rounded-lg shadow dark:bg-gray-900">
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginSignupPage;
