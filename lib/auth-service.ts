import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";

import { NextResponse } from 'next/server';


const prisma = new PrismaClient();

export async function authenticateUser(email: string, password: string) {

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Usuário não encontrado.');
  }

 
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
        { message: "Senha incorreta" },
        { status: 401 }
      );
  }

  
  return user;
}
