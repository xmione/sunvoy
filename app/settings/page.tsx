'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import UserService from '../services/UserService';
import { User } from '../lib/definitions';

export default function SettingsPage() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User>();

    const loadUserData = useCallback(async () => {
        try {
            if (!session) return;
            const userService = new UserService(window.location.origin);
            const user = await userService.GetUserByEmail(session.user?.email ?? "");
            setUser(user);
        } catch (error) {
            console.error("Failed to load user:", error);
        }
    }, [session]);

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    if (status === "loading") return <p>Loading...</p>;

    if (status === "unauthenticated") {
        return (
            <div style={{
                textAlign: "center",
                marginTop: "50px",
                fontSize: "24px",
                color: "red",
                padding: "20px"
            }}>
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
        <div style={{
            backgroundColor: '#fff',
            padding: '32px',
            width: '90%', 
            maxWidth: '1000px', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #ccc',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            margin: 'auto',  
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <h1 style={{
                color: '#333',
                fontSize: '30px',
                fontWeight: 'bold',
                marginBottom: '20px',
                textAlign: 'center' 
            }}>User Information</h1>  

            {user ? (
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <label style={{ fontWeight: "bold" }}>User ID</label>
                    <input type="text" value={user.id} readOnly style={inputStyle} />

                    <label style={{ fontWeight: "bold" }}>First Name</label>
                    <input type="text" value={user.firstname} readOnly style={inputStyle} />

                    <label style={{ fontWeight: "bold" }}>Last Name</label>
                    <input type="text" value={user.lastname} readOnly style={inputStyle} />

                    <label style={{ fontWeight: "bold" }}>Email</label>
                    <input type="text" value={user.email} readOnly style={inputStyle} />
                </div>
            ) : (
                <p style={{ color: "#777", fontSize: "20px" }}>User data not found.</p>
            )}

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                <button 
                    onClick={() => window.location.href = "/list"} 
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded">
                    Back to List
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

const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#f5f5f5",
    fontSize: "16px",
    cursor: "not-allowed"
};