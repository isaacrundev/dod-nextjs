import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const login = () => {
  return (
    <div className="container flex justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">LOGIN</TabsTrigger>
          <TabsTrigger value="signup">SIGN UP</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="signup">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default login;
