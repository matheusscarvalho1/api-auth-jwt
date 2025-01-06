import { NextResponse } from "next/server";
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { authenticateUser } from "@/lib/auth-service";
import { InvalidCredentialsError } from "@/src/app/utils/errors/invalid-credentials-error";

type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function POST(req: Request) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { email, password } = schema.parse(await req.json());


    const authenticateService = await authenticateUser(email, password);


    if (!authenticateService || !('id' in authenticateService)) {
      throw new InvalidCredentialsError();
    }

    const { id, email: userEmail } = authenticateService as AuthenticatedUser;


    const accessToken = jwt.sign(
      { userId: id, email: userEmail },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );
    
    const refreshToken = jwt.sign(
      { userId: id, email: userEmail },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      { message: "Login bem-sucedido!", accessToken, refreshToken },
      { status: 200 }
    );

  } catch (err: unknown) {
    console.error(err);

    if (err instanceof InvalidCredentialsError) {
      return NextResponse.json(
        { message: "Credenciais inválidas. Verifique seu e-mail e senha." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Erro ao autenticar usuário." },
      { status: 500 }
    );
  }
}
