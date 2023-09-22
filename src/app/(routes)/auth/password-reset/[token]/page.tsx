"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function PasswordResetPage({ params }: any) {

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), "null"], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // You can add your logic here to send a request to your server to reset the password

      // Handle form submission here
      try {
        const data = await (
          await fetch("/api/password/reset", {
            body: JSON.stringify({...values, token:params.token}),
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
        ).json();
        console.log({ data });
        // alert(JSON.stringify(values))
        if (!data.msg) Swal.fire("Somethong went wrong try again");
        else Swal.fire(data.msg);
        router.push("/auth/login");
        return resetForm();
      } catch (error: any) {
        console.log({ msg: error.message });
        Swal.fire(error.message);
      }

      // After a successful reset, reset the form
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded-md py-2 px-3 text-gray-700"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full border rounded-md py-2 px-3 text-gray-700"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-product-blue text-white py-2 rounded-md hover:bg-black focus:outline-none"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetPage;
