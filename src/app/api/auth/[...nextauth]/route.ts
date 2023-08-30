// Import the NextAuth library, which is a framework for authentication in Next.js applications
import NextAuth from "next-auth";

// Import the options object, which contains the configuration settings for NextAuth, such as providers, callbacks, pages, etc.
import { options } from "./options";

// Create a handler function that takes the request and response objects as parameters and passes them to NextAuth
const handler = NextAuth(options);

// Export the handler function as both GET and POST methods, which are the HTTP methods used by NextAuth to handle authentication requests
export { handler as GET, handler as POST };
