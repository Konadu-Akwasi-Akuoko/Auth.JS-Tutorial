// Import the UserCard component from "@/components/UserCard", which is a custom component that displays the user information
import UserCard from "@/components/UserCard";

// Import the options object from "./api/auth/[...nextauth]/options", which contains the configuration settings for NextAuth, such as providers, callbacks, pages, etc.
import { options } from "./api/auth/[...nextauth]/options";

// Import the getServerSession function from next-auth/next, which allows you to get the session data on the server-side
import { getServerSession } from "next-auth/next";

// Define the default export function for this page, which is an async function that takes no parameters and returns a JSX element or a promise
export default async function Home() {
  // Call the getServerSession function with the options object as a parameter and await its result, which is a session object or null
  const session = await getServerSession(options);

  return (
    <>
      {/* // Use a ternary operator to conditionally render different elements based on whether there is a session or not
      // If there is a session, render the UserCard component with two props: user and pagetype
      // The user prop is set to session?.user, which is the user object from the session data, or undefined if there is no session
      // The pagetype prop is set to "Home", which is a string that indicates what type of page this is */}
      {session ? (
        <UserCard user={session?.user} pagetype={"Home"} />
      ) : (
        // If there is no session, render an h1 element with a class of text-5xl, which sets the font size to 5xl
        // The h1 element contains a text that says "You Shall Not Pass!", which is a reference to a famous quote from The Lord of the Rings movie
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      )}
    </>
  );
}
