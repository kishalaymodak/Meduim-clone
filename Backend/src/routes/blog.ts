import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { blogInput, updateBlogInput } from "@kishalay/medum-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_src: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const header = (await c.req.header("authorization")) || "";
  if (!header) {
    c.status(403);
    return c.json({
      message: "unauthorized",
    });
  }
  try {
    const token = header.split(" ")[1];

    const response = await verify(token, c.env.JWT_src);

    if (!response) {
      c.status(403);
      return c.json({
        message: "unauthorized",
      });
    }

    c.set("userId", response.id);
    await next();
  } catch (e) {
    c.status(404);
    console.log(e);

    return c.json({
      message: "authentication failled",
    });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  try {
    const { success } = blogInput.safeParse(body);
    if (!success) {
      c.status(404);
      return c.json({
        message: "wrong input",
      });
    }
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    console.log(blog.id);
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    c.status(404);
    console.log(e);

    return c.json({
      message: "blog create faild",
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(404);
      return c.json({
        message: "wrong input",
      });
    }
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        authorId: body.response,
      },
    });

    return c.json({
      message: blog.id,
    });
  } catch (e) {
    c.status(404);
    console.log(e);

    return c.json({
      message: "blog update faild",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blogs,
    });
  } catch (e) {
    c.status(411);
    console.log(e);

    return c.json({
      message: "error while fetching the blog",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = await c.req.param("id");
  console.log(id);

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    console.log(e);

    return c.json({
      message: "error while fetching the blog post",
    });
  }
});
