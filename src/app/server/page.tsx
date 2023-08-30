// Import the UserCard component from "@/components/UserCard", which is a custom component that displays the user information
import UserCard from "@/components/UserCard";

// Import the options object from "../api/auth/[...nextauth]/options", which contains the configuration settings for NextAuth, such as providers, callbacks, pages, etc.
import { options } from "../api/auth/[...nextauth]/options";

// Import the getServerSession function from next-auth/next, which allows you to get the session data on the server-side
import { getServerSession } from "next-auth/next";

// Import the redirect function from next/navigation, which allows you to redirect the user to another page
import { redirect } from "next/navigation";

// Define the default export function for this page, which is an async function that takes no parameters and returns a JSX element or a promise
export default async function ServerPage() {
  // Call the getServerSession function with the options object as a parameter and await its result, which is a session object or null
  const session = await getServerSession(options);

  // Check if there is no session, which means that the user is not authenticated
  if (!session) {
    // Call the redirect function with a URL that points to the sign in page with a callback URL to this page
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  return (
    <section className="flex flex-col gap-6">
      {/* Render the UserCard component with two props: user and pagetype.
      The user prop is set to session?.user, which is the user object from the
      session data, or undefined if there is no session.
      The pagetype prop is set to "Server", which is a string that indicates 
      what type of page this is */}
      <UserCard user={session?.user} pagetype={"Server"} />
    </section>
  );
}
