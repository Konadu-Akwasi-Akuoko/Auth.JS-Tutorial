// Use the client directive, which tells Next.js to only run this component on the client-side, not on the server-side
"use client";

// Remember you must use an AuthProvider for
// client components to useSession

// Import the useSession hook from next-auth/react, which allows you to access the session data in a client component
import { useSession } from "next-auth/react";

// Import the redirect function from next/navigation, which allows you to redirect the user to another page
import { redirect } from "next/navigation";

// Import the UserCard component from "@/components/UserCard", which is a custom component that displays the user information
import UserCard from "@/components/UserCard";

// Define the default export function for this page, which takes no parameters and returns a JSX element
export default function ClientPage() {
  // Call the useSession hook with an options object, which contains two
  // properties: required and onUnauthenticated
  // The required property is set to true, which means that this page
  // requires a valid session to be accessed
  // The onUnauthenticated property is a function that is called when the
  // user is not authenticated, which redirects them to the sign in page
  // with a callback URL
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  return (
    <section className="flex flex-col gap-6">
      {/* Render the UserCard component with two props: user and pagetype. The
      user prop is set to session?.user, which is the user object from the
      session data, or undefined if there is no session. The pagetype prop is
      set to "Client", which is a string that indicates what type of page this
      is */}
      <UserCard user={session?.user} pagetype={"Client"} />
    </section>
  );
}
