'use client';
import React, { useCallback, useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { User } from '../lib/definitions';

export default function ListPage() {
    const [users, setUsers] = useState<User[]>([]);

    const loadAllData = useCallback(async () => {
        try {
            const userService = new UserService(window.location.origin);
            const userList = await userService.GetAll();
            setUsers(userList); // Adjust if backend returns { users: [...] }
        } catch (error) {
            console.error("Failed to load users:", error);
        }
    }, []);

    useEffect(() => {
        loadAllData();
    }, [loadAllData]);

    return (
        <div
            style={{
                backgroundColor: '#fff',
                padding: '24px',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ color: '#333', fontSize: '44px', fontWeight: 'bold' }}>User List</div>
            <div
                style={{
                    marginTop: '16px',
                    overflowY: 'auto',
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    paddingRight: '8px'
                }}
            >
                {users.map(user => (
                    <div
                        key={user.id}
                        style={{
                            color: '#333',
                            fontSize: '24px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '12px',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            wordBreak: 'break-word'
                        }}
                    >
                        <p><strong>{user.firstname} {user.lastname}</strong></p>
                        <p>{user.email}</p>
                        <p>{user.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}