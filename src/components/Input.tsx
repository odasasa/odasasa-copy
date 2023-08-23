import React from 'react';
import { Field, ErrorMessage } from 'formik';
import {twMerge} from 'tailwind-merge'
//import { string, object } from 'yup';

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  options?: string[]
  className?: string;
  placeholder?:string
  labeled?:boolean
}


const Input: React.FC<InputFieldProps> = ({ name, label,labeled=false, type = 'text', className = "", options = [] }) => {

  const classes = twMerge(` px-4 py-2 mt-1  border rounded
-lg  focus:ring focus:ring-indigo-300 focus:outline-none `, className)

  return (
    <div className="mb-1 flex flex-col px-3 md:px-8">
{labeled&&
      <label htmlFor={name} className="block text-md font-bold ">
        {label}
      </label>
}
      {type === "textarea" ?
        <Field
          as="textarea"
          rows={3}
          id={name} name={name}
          placeholder = {!labeled?label :""}
          className={classes} />

        :
        type === "select" ?
          <Field
            as="select"

            id={name} name={name}
            className={` w-full ${classes}`} >
              {
                !labeled ?<option value={""}>-- Select {label} ---</option> : ""
              }
            {
              options &&(!labeled? options.filter(op=>!labeled && op!==""): options).map(op => <option key={op} value={op}>{op}</option>)
            }
          </Field>
          :
          <Field
            type={type}
            id={name}
            name={name}
            className={classes}
            placeholder = {!labeled?label :""}
          />

      }

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

export default Input;

