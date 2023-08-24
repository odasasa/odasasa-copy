"use client"
import React from 'react';
import { Formik, Form } from 'formik';

import {Button, Input} from "@/components"                      
const Login = ( {
    setOp
  }:any) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values:any) => {
    // Handle form submission here
    console.log(values);
  };                                                       
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="w-full max-w-[500px]
      mx-auto flex flex-col gap-3 bg-slate-300
      justify-center items-center
      px-0 py-4">
 <h3 className="text-blue-700 text-2xl font-bold">Login</h3>
        <Input name="username" label="Username" />
        <Input name="password" label="Password" type="password" />


        <Button className="bg-blue-600 text-white">Submit</Button>
        
        <p className="my-3">
        Don't have an account? Signup <i
        className="text-blue-400 underline"
        onClick={()=>setOp(false)}>Here</i>
        </p>
      </Form>
    </Formik>
  );
};

export default Login;