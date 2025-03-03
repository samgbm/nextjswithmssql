import { executeQuery, initializeDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

// Flag to track database initialization
let dbInitialized = false;

// GET handler for fetching all users
export async function GET() {
    try {
        // Initialize database if not already done
        if (!dbInitialized) {
            await initializeDatabase();
            // dbInitialized = true;
        }

        const users = await executeQuery('SELECT * FROM users ORDER BY id DESC');
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// POST handler for creating a new user
export async function POST(request) {
    try {
        // Initialize database if not already done
        if (!dbInitialized) {
            await initializeDatabase();
            // dbInitialized = true;
        }

        // Parse JSON body
        const body = await request.json();
        const { name, email } = body;
        console.log(name,email);

        // Validate input
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        // Insert user safely with parameterized query
        await executeQuery(
            `INSERT INTO users (name, email) VALUES (@param0, @param1)`,
            [
                { value: name },
                { value: email }
            ]
        );

        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}