import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Asynchronous function representing the Onboarding page
async function Page() {
  // Get the currently authenticated user
  const user = await currentUser();

  // If there's no authenticated user, return null (nothing is displayed on the page)
  if (!user) return null;

  // Get detailed user information from the database
  const userInfo = await fetchUser(user.id);

  // If the user has already completed the onboarding process, redirect to the main page
  if (userInfo?.onboarded) redirect("/");

  // Create an object with user data to pass to the AccountProfile component
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  };

  // Render the Onboarding page
  return (
    <main className="mx-auto max-w-3xl flex flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        {/* Pass user data to the AccountProfile component */}
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
