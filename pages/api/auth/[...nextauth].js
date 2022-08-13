import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const client = await MongoClient.connect(
          `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vj15y.mongodb.net/meetups?retryWrites=true&w=majority`
        );
        const db = client.db();

        const usersCollection = db.collection("users");
        const result = await usersCollection.findOne({
          email: email,
          password: password,
        });

        if (!result) {
          throw new Error("invalid credentials!");
        }

        return {
          id: result._id.toString(),
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
      }

      return session;
    },
  },
});
