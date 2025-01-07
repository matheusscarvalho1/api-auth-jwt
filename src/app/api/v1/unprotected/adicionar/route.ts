import { NextResponse } from "next/server";
import { z } from 'zod';

import { postUnprotectedData } from "@/lib/unprotected-route-service";

export async function POST(req: Request) {
  const schema = z.object({
    data: z.string()
  });

  try {
    const { data } = schema.parse(await req.json());
    
    const userResponse = await postUnprotectedData(data);

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso', data: userResponse }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao criar usuário.", error: err },
      { status: 500 }
    );
  }
}
