import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

// Define the Page component
async function Page() {
  // Get the current user
  const user = await currentUser();

  // Return null if no user is logged in
  if (!user) return null;

  // Fetch user information
  const userInfo = await fetchUser(user.id);

  // Redirect if the user is not onboarded
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch user activity using the getActivity function
  const activity = await getActivity(userInfo._id);

  // Return the Activity page
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              // Create a link to the thread using the thread's parentId
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  {/* Display the profile picture using Image component */}
                  <Image
                    src={activity.author.image}
                    alt="Profile picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  );
}

export default Page;
