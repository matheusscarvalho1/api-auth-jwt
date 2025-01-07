import { NextResponse } from "next/server";
import { z } from 'zod';

import { updateUser } from "@/lib/usuario-service";

export async function PUT(req: Request) {
    const schema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
      });

  const urlParts = req.url.split('/');
  const id = urlParts.pop();

  if (!id || id === 'id') {
    return NextResponse.json(
      { message: "ID não fornecido na URL." },
      { status: 400 }
    );
  }

  try {
    const { name, email, password } = schema.parse(await req.json());
    
    const userResponse = await updateUser(id, name, email, password);

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso', data: userResponse }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao criar usuário.", error: err },
      { status: 500 }
    );
  }
}
