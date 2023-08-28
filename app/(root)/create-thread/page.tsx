import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  // Get the currently authenticated user
  const user = await currentUser();

  // If there's no authenticated user, return null (nothing is displayed on the page)
  if (!user) return null;

  // Get detailed user information from the database
  const userInfo = await fetchUser(user.id);

  // If the user has not completed the onboarding process, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Return Create-thread page
  return (
    <>
      <section className="mt-10 md:mt-3">
        <h1 className="head-text">Create Thread</h1>

        {/* Render the PostThread component and pass the user's ID */}
        <PostThread userId={userInfo._id} />
      </section>
    </>
  );
}

export default Page;
