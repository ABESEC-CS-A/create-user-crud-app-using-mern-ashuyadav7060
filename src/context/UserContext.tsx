import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User, UserFormData, UserRole } from '../types/user';

interface UserContextType {
  users: User[];
  addUser: (user: UserFormData) => void;
  updateUser: (id: string, user: UserFormData) => void;
  deleteUser: (id: string) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Sample initial data
const initialUsers: User[] = [
  { id: '1', email: 'ashu@example.com', name: 'Ashu yadav', role: 'admin' },
  { id: '2', email: 'vivek@example.com', name: 'Vivek Bansal', role: 'manager' },
  { id: '3', email: 'rohit@example.com', name: 'Rohit giri', role: 'student' },
  { id: '4', email: 'lakshya@example.com', name: 'Lakshya Bhatia', role: 'teacher' },
  { id: '5', email: 'vishwas@example.com', name: 'Vishwas Tayal', role: 'student' },
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);

  const addUser = (userData: UserFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: uuidv4(),
        ...userData,
      };
      
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setIsLoading(false);
    }, 500);
  };

  const updateUser = (id: string, userData: UserFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...userData } : user
        )
      );
      setIsLoading(false);
    }, 500);
  };

  const deleteUser = (id: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setIsLoading(false);
    }, 500);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};