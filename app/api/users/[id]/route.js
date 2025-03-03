import { executeQuery, initializeDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET handler for fetching a specific user
export async function GET(request, { params }) {
    try {
        const { id } = await params;

        // Validate ID
        if (!id || isNaN(parseInt(id))) {
            return NextResponse.json(
                { error: 'Invalid user ID' },
                { status: 400 }
            );
        }

        // Fetch user with parameterized query
        const users = await executeQuery(
            `SELECT * FROM users WHERE id = @param0`,
            [{ value: parseInt(id) }]
        );

        if (users.length === 0) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(users[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

// PUT handler for updating a user
export async function PUT(request, { params }) {
    try {
        const { id } = await params;

        // Validate ID
        if (!id || isNaN(parseInt(id))) {
            return NextResponse.json(
                { error: 'Invalid user ID' },
                { status: 400 }
            );
        }

        // Parse JSON body
        const body = await request.json();
        const { name, email } = body;

        // Validate input
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        // Update user with parameterized query
        const result = await executeQuery(
            `UPDATE users SET name = @param0, email = @param1 WHERE id = @param2`,
            [
                { value: name },
                { value: email },
                { value: parseInt(id) }
            ]
        );

        return NextResponse.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

// DELETE handler for removing a user
export async function DELETE(request, { params }) {
    try {

        initializeDatabase();
        
        const { id } = await params;

        // Validate ID
        if (!id || isNaN(parseInt(id))) {
            return NextResponse.json(
                { error: 'Invalid user ID' },
                { status: 400 }
            );
        }

        // Delete user with parameterized query
        await executeQuery(
            `DELETE FROM users WHERE id = @param0`,
            [{ value: parseInt(id) }]
        );

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}