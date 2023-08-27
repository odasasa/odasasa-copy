"use client"
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Button,  Input, Typography } from "@/components"
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { InputFieldProps } from '../Input';


const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().required('Field is required'),
  businessName: Yup.string().required('Field is required'),
  businessCode: Yup.string().required('Field is required'),
  phone: Yup.string().required('Field is required'),

});

interface SignupProps {
  setOp?: (flag: Boolean) => void
  className?: string
}

const Signup = ({
  setOp,
  className = ""
}: SignupProps) => {
  const initialValues = {
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    phone: '',
    businessName: '',
    businessCode: '',

  };

  const handleSubmit = async (values: any) => {
    // Handle form submission here
    try {
      const data = await (await fetch("/api/user", { body: JSON.stringify(values), method: "POST", headers: { "Content-Type": "application/json" } })).json()
      console.log({ values, data });
    } catch (error: any) {

      console.log({ msg: error.message });
    }

  };
  const signupFields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text"
    },
    ,
    {
      name: "phone",
      label: "Phone Number",
      type: "tel"
    },
    {
      name: "email",
      label: "Email Address",
      type: "email"
    }, {
      name: "businesName",
      label: "Business Name",
      type: "text"
    }, {
      label: "Business Code",
      name: "businessCode",
      type: "text"
    }, {
      name: "password",
      label: "Password",
      type: "password"
    }, {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password"
    }
  ] as InputFieldProps[]

  const inputCommonClasses = 'mb-3 px-3 py-2 rounded-sm w-full outline outline-2 outline-auth-border_color'
  return (

    <Formik initialValues={initialValues}
      validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className={twMerge(`w-full max-w-[500px]
      mx-auto flex flex-col  bg-slate-200
      justify-center items-center
     text-auth-gray border border-solid border-2 border-auth-border_color`, className)}>
        <div className='w-full p-[20px] h-[111] flex flex-col border-b border-solid border-2 border-auth-border_color'>
          <Typography variant={'h3'} className=' text-xl text-auth-gray font-normal '>Registrations Form</Typography>
          <Typography variant={'p'} className=' text-base text-auth-gray font-normal'>Please enter your user information</Typography>
          <hr />
        </div>
        <div className='w-full  flex flex-col justify-center items-center px-3 pt-3'>
          {
            signupFields.map((field, indx) => <Input key={indx} name={field.name} label={field.label} type={field.type} className={inputCommonClasses} />)
          }

          <div className='px-3 w-full mb-3'>
            <Button className="bg-auth-blue hover:auth-hover_blue text-white w-full  py-2" type='submit' >Register My Account</Button>

          </div>

          <Input name="remember_me" label='By creating an account, you agree the terms and conditions' type="checkbox" className='my-2 px-3' labelClasses='text-[15px] text-auth-gray font-normal py-3' />
          
          <div className='px-3 w-full mb-3'>
            <Button className="bg-auth-facebook_blue hover:auth-hover_blue text-white w-full  py-2" type='submit' >Facebook</Button>

          </div>

         <div className='px-3 w-full mb-3'>
            <Button className="bg-auth-twitter_blue hover:auth-hover_blue text-white w-full  py-2" type='submit' >Twitter</Button>

          </div>

        </div>

        <div className='w-full h-[45px] px-3 py-3 justify-center items-center border border-solid border-2 border-auth-border_color'>
          <Typography variant={'p'} className='px-3 text-center text-base text-auth-gray font-normal'>Already a member? <Link href="/auth/login">Login Here</Link></Typography>
        </div>

      </Form>
    </Formik>
  );
};

export default Signup;