import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const setCorsHeaders = (req: NextRequest, res: NextResponse) => {
  const origin = req.headers.get('Origin');
  const allowedOrigins = [
    '*',
    'http://localhost:3000'
  ];

  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
  } else {
    res.headers.set('Access-Control-Allow-Origin', '*');
  }

  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.headers.set('Access-Control-Allow-Credentials', 'true');
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res;
  }

  const authRequiredPaths = [
    '/api/v1/usuario',
  ];

  const requiresAuth = authRequiredPaths.some(path => req.nextUrl.pathname.startsWith(path));


  if (requiresAuth) {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Token não fornecido' }, { status: 401 });
    }

    try {
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY as string));
        return NextResponse.next();
      } catch (error) {
        console.error('Erro na verificação do token:', error);
        if (error instanceof Error) {
          console.error('Erro detalhado:', error.message);
        }
        return NextResponse.json({ message: 'Token inválido ou expirado' }, { status: 401 });
      }
  }

  return res;
}

export const config = {
  matcher: ['/api/v1/:path*'],
};
