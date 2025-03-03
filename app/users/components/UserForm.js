'use client';

import { useState, useEffect } from 'react';

export default function UserForm({ user, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({ name: '', email: '' });

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, email: user.email });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, user?.id);
        setFormData({ name: '', email: '' });
    };

    return (
        <div className="mb-8 p-4 border rounded bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
                {user ? 'Edit User' : 'Add New User'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        {user ? 'Update' : 'Add'} User
                    </button>

                    {user && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}