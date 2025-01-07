import { NextResponse } from "next/server";
import { deleteUnprotectedData } from "@/lib/unprotected-route-service";

export async function DELETE(req: Request) {

  const urlParts = req.url.split('/');
  const id = urlParts.pop();

  if (!id || id === 'id') {
    return NextResponse.json(
      { message: "ID não fornecido na URL." },
      { status: 400 }
    );
  }

  try {
    const data = await deleteUnprotectedData(id);
    return NextResponse.json({ message: 'Usuário deletado com sucesso', data: data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao buscar usuários.", error: err },
      { status: 500 }
    );
  }
}
