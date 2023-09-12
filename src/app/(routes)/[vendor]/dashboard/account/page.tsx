"use client"
import Profile from "@/components/templates/dashboard/account";
const dummyUser = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    idNumber: '123456789',
    password: 'password123',
    confirmPassword: 'password123',
    businessName: 'ABC Corporation',
    businessCode: 'ABC123',
    phone: '123-456-7890',
  };
  
export default function AccountPage(){

    return <Profile user={dummyUser} onUpdateUser={(updatedUser) => console.log(updatedUser)} />

    }