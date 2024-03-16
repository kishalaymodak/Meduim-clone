import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Bindings } from "hono/types";
import { decode, sign, verify } from "hono/jwt";
import { SignUpInput, signInInput, signUpInput } from "@kishalay/medum-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_src: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const { success } = signUpInput.safeParse(body);
    if (!success) {
      c.status(404);
      return c.json({
        message: "wrong input",
      });
    }
    const User = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign({ id: User.id, name: User.name }, c.env.JWT_src);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    c.status(403);
    console.log(e);

    return c.json({ error: "error while signup" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signInInput.safeParse(body);
  if (!success) {
    c.status(404);
    return c.json({
      message: "wrong input",
    });
  }
  const response = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
    select: {
      name: true,
      id: true,
    },
  });

  if (!response) {
    c.status(403);
    return c.json({
      message: "user does not exist",
    });
  }
  const token = await sign(
    { id: response.id, name: response.name },
    c.env.JWT_src
  );
  return c.json({
    jwt: token,
  });
});
