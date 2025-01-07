import { NextResponse } from "next/server";
import { getProtectedData } from "@/lib/protected-route-service";

export async function GET () {
  try {
    const user = await getProtectedData();

    if (!Array.isArray(user) || user.length === 0) {
      return NextResponse.json({ message: 'Nenhum dado encontrado.' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Dados recuperados com sucesso', data: user }, { status: 200 });

  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    return NextResponse.json(
      { message: "Erro ao buscar usuários.", error: err instanceof Error ? err.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
