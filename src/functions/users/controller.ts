import { APIGatewayProxyHandler } from "aws-lambda";
import { db } from "../../config/database";
import { z } from "zod";
import { Users } from "../../schema/users";

export const createUser: APIGatewayProxyHandler = async (event) => {
  try {
    const data = z
      .object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
      .parse(JSON.parse(event.body || "{}"));

    const newUser = await db.insert(Users).values({
      email: data.email,
      username: data.username,
      password: data.password,
    });
    console.log("🚀 ~ file: controller.ts:21 ~ newUser ~ newUser:", newUser);

    return {
      statusCode: 201,
      body: JSON.stringify({
        userCreated: true,
        newUser,
      }),
    };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          userCreated: false,
          error: e.errors
        }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        userCreated: false,
        error: "Something went wrong",
      }),
    };
  }
};

export const getUsers: APIGatewayProxyHandler = async () => {
  const data = await db
    .select({
      name: Users.username,
    })
    .from(Users);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
