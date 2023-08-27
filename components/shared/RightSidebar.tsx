
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserCard from "../cards/UserCard"; // Import the UserCard component

// RightSideBar component definition
async function RightSideBar() {
  // Get the current user using Clerk's currentUser() function
  const user = await currentUser();
  if (!user) return null;

  // Fetch detailed information about the current user
  const userInfo = await fetchUser(user.id);

  // Redirect the user to the onboarding page if they haven't completed onboarding
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch suggested users for the current user
  const suggestedUsers = await fetchUsers({
    userId: user.id,
    pageSize: 4,
  });

  return (
    suggestedUsers.users.length > 0 && (
      <section className="custom-scrollbar rightsidebar">
        <div className="flex flex-1 flex-col justify-start items-center">
          <h3 className="text-heading4-medium text-light-1 mt-3">Suggested Users</h3>

          <div className="mt-7 bg-gray-700 rounded-full p-3">
            {/* Iterate through suggested users and render UserCard for each */}
            {suggestedUsers.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </div>
        </div>
      </section>           
    )
  );
}

export default RightSideBar;
