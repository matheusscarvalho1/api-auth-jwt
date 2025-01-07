import { PrismaClient } from "@prisma/client";

import { NextResponse } from 'next/server';

const prisma = new PrismaClient();



export async function postUnprotectedData(content: string){
    try {
        const data = await prisma.unprotectedData.create({
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

export async function getUnprotectedData() {
    try {
        const data = await prisma.unprotectedData.findMany();
        
        return data;
        
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Erro ao buscar usuários.", error: err },
            { status: 500 }
        );
    }
}

export async function getUnprotectedDataById(id: string) {
    try {
        const data = await prisma.unprotectedData.findUnique({
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

export async function updateUnprotectedData(id: string, content: string) {
    try {
        const data = await prisma.unprotectedData.update({
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

export async function deleteUnprotectedData(id: string) {
    try {
        const data = await prisma.unprotectedData.delete({
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