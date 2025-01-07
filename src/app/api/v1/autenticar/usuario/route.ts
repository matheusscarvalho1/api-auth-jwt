import { NextResponse } from "next/server";
import { z } from 'zod';
import { SignJWT } from 'jose';
import { authenticateUser } from "@/lib/auth-service";
import { InvalidCredentialsError } from "@/src/app/utils/errors/invalid-credentials-error";

type JWTPayload = Record<string, unknown>;

async function generateJWT(payload: JWTPayload, expiresIn: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'secret');

  
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .sign(secret); 
}

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

    const { id, email: userEmail } = authenticateService;

    const accessToken = await generateJWT(
      { userId: id, email: userEmail },
      '1h'
    );
    
    const refreshToken = await generateJWT(
      { userId: id, email: userEmail },
      '7d'
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
