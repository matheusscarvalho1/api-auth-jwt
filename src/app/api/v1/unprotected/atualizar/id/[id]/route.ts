import { NextResponse } from "next/server";
import { z } from 'zod';

import { updateUnprotectedData } from "@/lib/unprotected-route-service";

export async function PUT(req: Request) {
  const schema = z.object({
    data: z.string()
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
    const { data } = schema.parse(await req.json());
    
    const userResponse = await updateUnprotectedData(id, data);

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso', data: userResponse }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao criar usuário.", error: err },
      { status: 500 }
    );
  }
}
