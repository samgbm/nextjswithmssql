'use client';

export default function UserTable({ users, onEdit, onDelete, loading }) {
  if (loading) {
    return <p className="text-gray-600">Loading users...</p>;
  }
  
  if (users.length === 0) {
    return <p className="text-gray-600">No users found. Add one to get started!</p>;
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left border">ID</th>
            <th className="p-2 text-left border">Name</th>
            <th className="p-2 text-left border">Email</th>
            <th className="p-2 text-left border">Created At</th>
            <th className="p-2 text-center border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                {new Date(user.created_at).toLocaleString()}
              </td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => onEdit(user)}
                  className="mr-2 btn-warning btn-sm inline-block px-3 py-1 rounded text-white bg-yellow-500 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="btn-danger btn-sm inline-block px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}