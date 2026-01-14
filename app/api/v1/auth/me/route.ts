import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';
import { createErrorResponse } from '@/lib/validation/schemas';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(req: NextRequest) {
  try {
    // Get token from cookie
    const token = req.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        createErrorResponse(
          'NO_TOKEN',
          'Authentication token not found'
        ),
        { status: 401 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (error) {
      return NextResponse.json(
        createErrorResponse(
          'INVALID_TOKEN',
          'Invalid or expired token'
        ),
        { status: 401 }
      );
    }

    // Get user from database
    const userResult = await pool.query(
      `SELECT user_id, email, username, first_name, last_name, avatar_url, 
              is_active, is_verified, last_login, created_at
       FROM users WHERE user_id = $1`,
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        createErrorResponse(
          'USER_NOT_FOUND',
          'User not found'
        ),
        { status: 404 }
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

    return NextResponse.json({
      success: true,
      user: {
        id: user.user_id,
        email: user.email,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        avatarUrl: user.avatar_url,
        isVerified: user.is_verified,
        lastLogin: user.last_login,
        createdAt: user.created_at,
      },
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      createErrorResponse(
        'GET_USER_FAILED',
        'Failed to get user information'
      ),
      { status: 500 }
    );
  }
}
