import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import pool from '@/lib/db';
import { createErrorResponse } from '@/lib/validation/schemas';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse(
          'VALIDATION_ERROR',
          'Invalid login data',
          validation.error.errors
        ),
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Find user
    const userResult = await pool.query(
      `SELECT user_id, email, username, password_hash, first_name, last_name, is_active, is_verified
       FROM users WHERE email = $1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        createErrorResponse(
          'INVALID_CREDENTIALS',
          'Invalid email or password'
        ),
        { status: 401 }
      );
    }

    const user = userResult.rows[0];

    if (!user.is_active) {
      return NextResponse.json(
        createErrorResponse(
          'ACCOUNT_DISABLED',
          'Account is disabled'
        ),
        { status: 403 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        createErrorResponse(
          'INVALID_CREDENTIALS',
          'Invalid email or password'
        ),
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Update last login
    await pool.query(
      'UPDATE users SET last_login = NOW() WHERE user_id = $1',
      [user.user_id]
    );

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.user_id,
        email: user.email,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        isVerified: user.is_verified,
      },
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      createErrorResponse(
        'LOGIN_FAILED',
        'Failed to authenticate user'
      ),
      { status: 500 }
    );
  }
}
