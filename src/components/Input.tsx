"use client";
import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { twMerge } from "tailwind-merge";
import { FaEye, FaEyeSlash } from "react-icons/fa";
//import { string, object } from 'yup';

export interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  options?: string[];
  className?: string;
  placeholder?: string;
  labeled?: boolean;
  labelClasses?: string;
  readOnly?: boolean;
}

const Input: React.FC<InputFieldProps> = ({
  name,
  label,
  labeled = false,
  type = "text",
  className = "",
  options = [],
  labelClasses,
  ...others
}) => {
  const [showPwd, setShowPwd] = useState(false)
  const classes = twMerge(
    ` px-3 py-2 mt-1  border rounded-lg  focus:ring focus:ring-indigo-300 focus:outline-none `,
    className
  );

  return (
    <div className="mb-1 flex flex-col px-3  w-full relative">
      {labeled && !["checkbox"].includes(type) && (
        <label
          htmlFor={name}
          className={twMerge("block text-md font-bold ", labelClasses)}
        >
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <Field
          as="textarea"
          rows={3}
          id={name}
          name={name}
          placeholder={!labeled ? label : ""}
          className={classes}
          {...others}
        />
      ) : type === "select" ? (
        <Field
          {...others}
          as="select"
          id={name}
          name={name}
          className={` w-full ${classes}`}
        >
          {!labeled ? <option value={""}>-- Select {label} ---</option> : ""}
          {options &&
            (!labeled
              ? options.filter((op) => !labeled && op !== "")
              : options
            ).map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
        </Field>
      ) : type === "password" ? (
        <>
        <Field
          {...others}
          id={name}
          type={showPwd?'text' : type}
          name={name}
          className={` w-full ${classes}`}
        />
        <span className="h-full absolute  right-4 flex justify-center items-center" onClick={()=>setShowPwd(!showPwd)}>
         { !showPwd? <FaEye className="my-auto" />:<FaEyeSlash className="my-auto" />}
        </span>
        </>
          
      ) : type === "checkbox" ? (
        <label
          htmlFor={name}
          className={twMerge("text-md font-bold ", labelClasses)}
        >
          <Field
            type={type}
            id={name}
            name={name}
            className={"mr-3"}
            placeholder={!labeled ? label : ""}
            {...others}
          />
          {label}
        </label>
      ) : (
        <Field
          type={type}
          id={name}
          name={name}
          className={classes}
          placeholder={!labeled ? label : ""}
          {...others}
        />
      )}

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default Input;
