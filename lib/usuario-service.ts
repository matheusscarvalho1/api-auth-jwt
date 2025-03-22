import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserNotFoundError } from "@/src/app/utils/errors/user-not-found-error";

const prisma = new PrismaClient();

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  try {
    // Verifica se o usuário já existe
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return {
        status: 400,
        message: "Email já cadastrado.",
      };
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    // Cria o novo usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      status: 201,
      user: newUser,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "Erro ao criar usuário.",
      error: err,
    };
  }
}

export async function getUsers() {
  try {
    const data = await prisma.user.findMany();

    if (!data) {
      throw new UserNotFoundError();
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const data = await prisma.user.findUnique({
      where: { id },
    });

    if (!data) {
      throw new UserNotFoundError();
    }

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao buscar usuário.");
  }
}

export async function updateUser(
  id: string,
  name?: string,
  email?: string,
  password?: string
) {
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: password ? await hash(password, 10) : userExists.password,
      },
    });

    return updatedUser;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao atualizar usuário.", error: err },
      { status: 500 }
    );
  }
}

export async function deleteUser(id: string) {
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    const data = await prisma.user.delete({
      where: {
        id,
      },
    });

    return data;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Erro ao deletar usuário.", error: err },
      { status: 500 }
    );
  }
}
