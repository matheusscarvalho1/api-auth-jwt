import { NextResponse } from "next/server";


import { getUsers } from "@/lib/usuario-service";

export async function GET () {
  try {
    const user = await getUsers();
    return NextResponse.json({message: 'Dados recuperados com sucesso', data: user }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao buscar usuários.", error: err },
      { status: 500 }
    );
  }
}
