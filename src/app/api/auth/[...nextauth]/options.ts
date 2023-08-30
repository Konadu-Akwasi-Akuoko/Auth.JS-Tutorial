// Import the type definition for NextAuthOptions, which is an interface that describes the shape of the options object for NextAuth
import type { NextAuthOptions } from "next-auth";
// Import the CredentialsProvider, which is a built-in provider that allows users to sign in with a username and password
import CredentialsProvider from "next-auth/providers/credentials";
// Import the GithubProvider, which is a built-in provider that allows users to sign in with their GitHub account
import GithubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
// Import the GoogleProvider, which is a built-in provider that allows users to sign in with their Google account
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";

// Export the options object, which contains the configuration settings for NextAuth, such as providers, callbacks, pages, etc.
export const options: NextAuthOptions = {
  // Specify the list of providers that are enabled for authentication
  providers: [
    // Create an instance of the GithubProvider with the client ID and secret obtained from GitHub
    GithubProvider({
      profile(profile: GithubProfile) {
        console.log(profile);
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Create an instance of the GoogleProvider with the client ID and secret obtained from Google
    GoogleProvider({
      profile(profile: GoogleProfile) {
        console.log(profile);
        return {
          ...profile,
          id: profile.aud,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // Create an instance of the CredentialsProvider with the name and credentials fields
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your cool username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your cool password",
        },
      },
      // Define an async authorize function that takes the credentials as a parameter and returns a user object or null
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = { id: "42", name: "Konadu", password: "nextauth" };

        // Check if the credentials match the user data and return the user object if they do, or null otherwise
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // This will redirect the user to a different page based on the action
    async redirect({ url, baseUrl }) {
      // If the action is signout, redirect to the home page
      if (url === "/api/auth/signout") {
        return "/";
      }
      // Otherwise, use the default behavior
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};
