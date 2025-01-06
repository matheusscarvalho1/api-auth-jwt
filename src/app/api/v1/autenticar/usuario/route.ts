import { NextResponse } from "next/server";
import { z } from 'zod';

import { authenticateUser } from "@/lib/auth-service";

export async function POST(req: Request) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { email, password } = schema.parse(await req.json());
    
    const { accessToken, refreshToken } =  await authenticateUser(email, password);


    return NextResponse.json(
        { message: "Login bem-sucedido!", accessToken, refreshToken },
        { status: 200 }
      );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao autenticar usuário.", error: err },
      { status: 500 }
    );
  }
}
