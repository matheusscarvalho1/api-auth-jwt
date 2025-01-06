import { NextResponse } from "next/server";
import { getUserById } from "@/lib/usuario-service";

export async function GET(req: Request) {

  const urlParts = req.url.split('/');
  const id = urlParts.pop();

  if (!id || id === 'id') {
    return NextResponse.json(
      { message: "ID não fornecido na URL." },
      { status: 400 }
    );
  }

  try {
    const user = await getUserById(id);
    
    return NextResponse.json({ message: 'Dados recuperados com sucesso', data: user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao buscar usuários.", error: err },
      { status: 500 }
    );
  }
}
