import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage = () => {
  return (
    <div className="container flex justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">LOGIN</TabsTrigger>
          <TabsTrigger value="signup">SIGN UP</TabsTrigger>
        </TabsList>
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

export default LoginPage;
