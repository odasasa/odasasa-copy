"use client"
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Typography } from '@/components';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

// Define the shape of the form values
interface ProfileFormValues {
    fullName: string;
    email: string;
    idNumber: string;
    password: string;
    confirmPassword: string;
    businessName: string;
    businessCode: string;
    phone: string;
}

// Define the shape of the Profile component props
interface ProfileProps {
    user: ProfileFormValues; // User data to display
    onUpdateUser: (values: ProfileFormValues) => void; // Callback to update user data
    className?: string;
}

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    idNumber: Yup.string().required('ID Number is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    businessName: Yup.string().required('Field is required'),
    businessCode: Yup.string().required('Field is required'),
    phone: Yup.string().required('Field is required'),
});

const Profile: React.FC<ProfileProps> = ({
    user,
    onUpdateUser,
    className = '',
}: ProfileProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={twMerge(`w-full max-w-[1000px] my-4 mx-3  md:mx-8 bg-slate-200 text-auth-gray border border-solid border-auth-border_color`, className)}>
            <div className='w-full p-[20px] h-[111] flex flex-col border-solid border-b border-auth-border_color'>
                <Typography variant={'h3'} className='text-xl font-normal'>User Profile</Typography>
                <Typography variant={'p'} className='text-base font-bold text-center'>View and update your information</Typography>
            </div>
            <Formik<ProfileFormValues>
                initialValues={user}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onUpdateUser(values);
                    toggleEdit();
                }}
                enableReinitialize={true}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form className='w-full flex flex-col justify-center items-center px-3 pt-3 border-solid border-b border-auth-border_color'>
                        <Input
                            name="fullName"
                            label="Full Name"
                            type="text"
                            className='mb-3 px-3 py-2 rounded-sm w-full outline outline-2 outline-auth-border_color'
                            readOnly={!isEditing}
                        />
                        {/* Add more Input components for other fields */}
                        {/* ... */}
                        <div className='px-3 w-full mb-3'>
                            {isEditing ? (
                                <Button className="bg-auth-blue hover:auth-hover_blue text-white w-full py-2" type='submit'>Save Changes</Button>
                            ) : (
                                <Button className="bg-auth-blue hover:auth-hover_blue text-white w-full py-2" onClick={toggleEdit}>Edit Profile</Button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
            <div className='w-full h-[45px] px-3 py-3 justify-center items-center border-solid border-t border-auth-border_color'>
                <Typography variant={'p'} className='px-3 text-center text-base font-normal'>
                    Already a member? <Link href="/auth/login" className={`text-auth-red hover:text-auth-gray`}>Login Here</Link>
                </Typography>
            </div>
        </div>
    );
};

export default Profile;
