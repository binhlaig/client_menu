import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "./models/user";
import bcrypt from "bcryptjs";
import { connectToDB } from "./mongoDB";

export const authOptions: NextAuthOptions = ({

    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await connectToDB();
                const user = await User.findOne({ username: credentials?.username });
                const isPasswordCorrect = await bcrypt.compare(
                    credentials?.password || "",
                    user?.password || ""
                );
                if (user && isPasswordCorrect) {
                    return {
                        id: user?._id,
                        username: user?.username,
                        image: user?.image
                      }
                }
                if (!user || !isPasswordCorrect) {
                    throw new Error("Invalid credentials");
                }
                return user;

            },

        }),
    ],
    pages: {
        signIn: "/sign_in",
        signOut: "/logout",
        error: "/error",
        verifyRequest: "/verify-request",
        newUser: "/sogn_up",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (trigger === "update" && session?.username) {
                token.username = session.username;
            }
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    username: u.username,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    _id: token.id,
                    username: token.username,
                }
            }
        },
    }

})