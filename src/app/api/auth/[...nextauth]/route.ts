import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { dbCon } from "@/libs/mongoose/dbCon";
import { UserModel } from "@/libs/mongoose/models";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {

  pages:{
    signIn:"/login"
  },
  
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "input",
          placeholder: "email",
        },
        password: {
          label: "password",
          type: "input",
          placeholder: "password",
        },
      },
      async authorize(credentials: any) {
        await dbCon();
        const user = await UserModel.findOne({
          email: credentials?.email,
        });
        if (
          user &&
          credentials?.password &&
          credentials?.password === user.password
          // (await compare(credentials.password, user.password as string))

          // bcrypt.compareSync(credentials.password, user.password as string)
        ) {
          return {
            id: user._id,
            ...credentials,
            // firstName: user.firstName,
            // lastName: user.lastName,
            password: undefined,
          };
        }
        // eslint-disable-next-line unicorn/no-null
        return null;
      },
    }),
  ],
};
