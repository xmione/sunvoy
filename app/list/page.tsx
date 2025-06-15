'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import UserService from '../services/UserService';
import { User } from '../lib/definitions';

export default function ListPage() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState<User[]>([]);

    const loadAllData = useCallback(async () => {
        try {
            if (!session) return; 
            const userService = new UserService(window.location.origin);
            const userList = await userService.GetAll();
            setUsers(userList); 
        } catch (error) {
            console.error("Failed to load users:", error);
        }
    }, [session]);

    useEffect(() => {
        loadAllData();
    }, [loadAllData]);

    if (status === "loading") return <p>Loading...</p>;

    if (status === "unauthenticated") {
        return (
            <div style={{ textAlign: "center", marginTop: "50px", fontSize: "24px", color: "red" }}>
                <p><strong>Unauthorized</strong></p>
                
                <button 
                    onClick={() => window.location.href = "/"} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundColor: '#fff',
                padding: '24px',
                height: '100vh',
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                justifySelf: 'center'
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
                        <p>ID:{user.id}</p>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-start' }}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Settings
                </button>
                <button 
                    onClick={() => signOut()} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Sign Out
                </button>
            </div>
        </div>
    );
}