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
            setUsers(userList);
        } catch (error) {
            console.error("Failed to load users:", error);
        }
    }, []);

    useEffect(() => {
        loadAllData();
    }, [loadAllData])

    console.log("users: ", users);
    return (
        <div>
            <h1>User List</h1>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.id}</p>
                    <p>{user.firstname}</p>
                    <p>{user.lastname}</p>
                    <p>{user.email}</p>
                    <p>{user.password}</p>
                </div>
            ))}
        </div>
    );
}