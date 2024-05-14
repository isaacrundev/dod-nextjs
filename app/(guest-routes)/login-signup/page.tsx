"use client";

import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginSignupPage = () => {
  return (
    // <div className="container flex justify-center pt-10">
    //   <Tabs defaultValue="login" className="w-[400px]">
    //     <div className="flex justify-center">
    //       <TabsList>
    //         <TabsTrigger value="login">LOGIN</TabsTrigger>
    //         <TabsTrigger value="signup">SIGN UP</TabsTrigger>
    //       </TabsList>
    //     </div>
    //     <TabsContent value="login">
    //       <LoginForm />
    //     </TabsContent>
    //     <TabsContent value="signup">
    //       <SignupForm />
    //     </TabsContent>
    //   </Tabs>
    // </div>
    <div className="flex min-h-screen justify-center bg-gray-100 px-4 py-16 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <Tabs defaultValue="login">
          <div className="space-y-4">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="login">LOGIN</TabsTrigger>
                <TabsTrigger value="signup">SIGN UP</TabsTrigger>
              </TabsList>
            </div>
            <div className="rounded-lg bg-white p-8 shadow dark:bg-gray-900">
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
