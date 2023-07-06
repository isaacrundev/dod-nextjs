import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface ReqBody {
  email: string;
  password: string;
}

const POST = async (res: Request) => {
  const body: ReqBody = await res.json();
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });
  const { password, ...result } = user;

  return new Response(JSON.stringify(result));
};

export default POST;
