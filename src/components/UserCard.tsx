// Import the Image component from next/image, which is a built-in component
// that optimizes image loading and rendering in Next.js applications
import Image from "next/image";

// Define a type alias for User, which is a union type that can be either an
// object with optional properties (name, email, image) or undefined
type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

// Define a type alias for Props, which is an object type that has two
// properties: user and pagetype
type Props = {
  user: User;
  pagetype: string;
};

// Define the default export function for this component, which takes
// the props as a parameter and returns a JSX element
export default function Card({ user, pagetype }: Props) {
  //console.log(user)

  // Define a constant called greeting, which is a JSX element that displays
  // a greeting message with the user's name if it exists, or null otherwise
  const greeting = user?.name ? (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello {user?.name}!
    </div>
  ) : null;

  // const emailDisplay = user?.email ? (
  //     <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
  //         {user?.email}
  //     </div>
  // ) : null

  const userImage = user?.image ? (
    <Image
      className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
      src={user?.image}
      width={200}
      height={200}
      alt={user?.name ?? "Profile Pic"}
      priority={true}
    />
  ) : null;

  return (
    <section className="flex flex-col gap-4">
      {/* Render the greeting element, which may be null if there is no user name */}
      {greeting}
      {/* Render the emailDisplay element, which may be null if there is no user email */}
      {/* {emailDisplay} */}
      {/* Render the userImage element, which may be null if there is no user image
       */}
      {userImage}
      <p className="text-2xl text-center">{pagetype} Page!</p>
    </section>
  );
}
