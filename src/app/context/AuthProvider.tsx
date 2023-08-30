// Use the client directive, which tells Next.js to only run this component on the client-side, not on the server-side
"use client";

// Import the SessionProvider component from next-auth/react, which is a built-in component that provides the session data to the useSession hook using React context
import { SessionProvider } from "next-auth/react";

// Define the default export function for this component, which takes the children as a parameter and returns a JSX element
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Return a SessionProvider component with no props
  // Render the children inside the SessionProvider component, which are the components that need access to the session data
  return <SessionProvider>{children}</SessionProvider>;
}
