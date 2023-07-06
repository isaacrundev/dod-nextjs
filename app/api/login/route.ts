import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface ReqBody {
  email: string;
  password: string;
}

const POST = async (req: Request) => {
  const body: ReqBody = await req.json();

  const user = await prisma.user.findFirst({
    where: { email: body.email },
  });
  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPassword } = user;
    return new Response(JSON.stringify(userWithoutPassword));
  } else {
    return new Response(JSON.stringify(null));
  }
};
export default POST;
