import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import pool from '@/lib/db';
import { createErrorResponse } from '@/lib/validation/schemas';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username too long'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse(
          'VALIDATION_ERROR',
          'Invalid registration data',
          validation.error.errors
        ),
        { status: 400 }
      );
    }

    const { email, username, password, firstName, lastName } = validation.data;

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT user_id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        createErrorResponse(
          'USER_EXISTS',
          'User with this email or username already exists'
        ),
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (email, username, password_hash, first_name, last_name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING user_id, email, username, first_name, last_name, created_at`,
      [email, username, passwordHash, firstName || null, lastName || null]
    );

    const user = result.rows[0];

    return NextResponse.json({
      success: true,
      user: {
        id: user.user_id,
        email: user.email,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        createdAt: user.created_at,
      },
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      createErrorResponse(
        'REGISTRATION_FAILED',
        'Failed to register user'
      ),
      { status: 500 }
    );
  }
}
