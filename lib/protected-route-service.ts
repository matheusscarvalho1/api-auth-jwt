import { PrismaClient } from "@prisma/client";

import { NextResponse } from 'next/server';

const prisma = new PrismaClient();



export async function postProtectedData(content: string){
    try {
        const data = await prisma.protectedData.create({
            data: {
                data: content
            }
        });
        
        return data;
        
    } catch (err) {
        console.error(err);
        return NextResponse.json(
                { message: "Erro ao buscar usuários.", error: err },
                { status: 500 }
        );
    }
}

export async function getProtectedData() {
    try {
        const data = await prisma.protectedData.findMany();
        
        return data;
        
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Erro ao buscar usuários.", error: err },
            { status: 500 }
        );
    }
}

export async function getProtectedDataById(id: string) {
    try {
        const data = await prisma.protectedData.findUnique({
            where: {
                id: id
            }
        });

        return data;
} catch (err) {
    console.error(err);
    return NextResponse.json(
        { message: "Erro ao buscar usuários.", error: err },
        { status: 500 }
    );
}
}

export async function updateProtectedData(id: string, content: string) {
    try {
        const data = await prisma.protectedData.update({
            where: {
                id: id
            },
            data: {
                data: content
            }
        });
        
        return data;
        
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Erro ao buscar usuários.", error: err },
            { status: 500 }
        );
    }
}

export async function deleteProtectedData(id: string) {
    try {
        const data = await prisma.protectedData.delete({
            where: {
                id: id
            }
        });
        
        return data;
        
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Erro ao buscar usuários.", error: err },
            { status: 500 }
        );
    }
}