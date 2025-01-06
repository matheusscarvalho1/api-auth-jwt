import { NextResponse } from "next/server";
import { z } from 'zod';

import { createUser } from "@/lib/usuario-service";

export async function POST(req: Request) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { name, email, password } = schema.parse(await req.json());
    
    const userResponse = await createUser(name, email, password);


    if (userResponse.status === 400) {
      return NextResponse.json({ message: userResponse.message }, { status: 400 });
    }

  
    return NextResponse.json({ message: 'Usuário cadastrado com sucesso', data: userResponse.user }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao criar usuário.", error: err },
      { status: 500 }
    );
  }
}
