import mongoose from "mongoose";
import { pwdHasher } from "@/libs/bcrypt/passord";
import { UserModel } from "@/libs/mongoose/models";
import { createRecord, getRecords } from "@/libs/mongoose/mongoseCrud";

import { NextResponse } from "next/server";
import { dbCon } from "@/libs/mongoose/dbCon";
const table = "users";
const headers: any = {
  "Content-Type": "application/json",
};
export async function GET(request: Request) {
  try {
    const data = await getRecords(table);
    // console.log({ data })

    return new Response(JSON.stringify(data || []), {
      status: 200,
      statusText: "OK",
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }
}

export async function POST(request: Request) {
  try {
    let obody = await request.json(),
      { confirmPassword, ...body } = obody;
    if (body["vendor"].includes("odasa")) {
      body["role"] = "admin";
    } else if (body["vendor"].includes("mds")) {
      body["role"] = "su";
    } else {
      body["role"] = "vendor";
    }
    body["status"] = false;
    const hashedPassword = pwdHasher(body["password"]);
    body["password"] = hashedPassword;

    // const result = await createRecord(table, body);
    await dbCon()
    const newUser = new UserModel(body);
    let saved = newUser
      .save()
      .then(() => {
        // User saved successfully
        console.log("User saved successfully.");
      })
      .catch((error:any) => {
        if (error.code === 11000 && error.keyValue) {
          // Duplicate key error
          if (error.keyValue.email) {
            throw new Error("Email is already in use.");
          }
          if (error.keyValue.idNumber) {
            throw new Error("ID Number is already in use.");
          }
          if (error.keyValue.vendor) {
            throw new Error("Vendor Code is already in use.");
          }
          if (error.keyValue.phone) {
            throw new Error("Phone is already in use.");
          }
        } else {
          // Handle other errors
          throw error; // Throw the original error for other types of errors
        }
      });

    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    console.log({ error: error.message });
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers }
    );
  }
}
