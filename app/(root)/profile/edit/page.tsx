import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

// Define the Page component
async function Page() {
  // Get the currently authenticated user
  const user = await currentUser();

  // If there's no authenticated user, return null (nothing is displayed on the page)
  if (!user) return null;

  // Fetch detailed user information based on the authenticated user's ID
  const userInfo = await fetchUser(user.id);

  // Create userData object to pass to the AccountProfile component
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  };

  // Return Edit Profile page
  return (
    <>
      {/* Display page title and description */}
      <h1 className="head-text">Edit profile</h1>
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>

      {/* Display AccountProfile component */}
      <section className="mt-12">
        <AccountProfile user={userData} btnTitle="Save" />
      </section>
    </>
  );
}

export default Page;
