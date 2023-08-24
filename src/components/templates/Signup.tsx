"use client"
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Button, Input} from "@/components"   

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required')
});

const Signup = (
  {
    setOp
  }:any
  ) => {
  const initialValues = {
    name:"",
    username: '',
    password: '',
  };

  const handleSubmit = (values:any) => {
    // Handle form submission here
    console.log(values);
  };                                                       
  return (
    <Formik initialValues={initialValues} 
    validationSchema={validationSchema}
    onSubmit={handleSubmit}>
      <Form className="w-full max-w-[500px]
      mx-auto flex flex-col gap-3 bg-slate-300
      justify-center items-center
      px-0 py-4 ">
      <h3 className="text-blue-700 text-2xl font-bold">Sign Up</h3>
      
        <Input name="name" label="Full name" />
        <Input name="username" label="Username" />
        <Input name="password" label="Password" type="password" />
        
        {/* <Input name="password2" label="Confirm Password" type="password" /> */}


        <Button className="bg-blue-600 text-white">Submit</Button>
        
         
        <p className="my-3">
        Have an account? Go  to <i
        className="text-blue-400 underline"
        
        onClick={()=>setOp(true)}>Login</i>
        </p>
      </Form>
    </Formik>
  );
};

export default Signup;