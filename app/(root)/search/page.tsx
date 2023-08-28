import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";

// Define the Page component
async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Get the currently authenticated user
  const user = await currentUser();

  // If there's no authenticated user, return null (nothing is displayed on the page)
  if (!user) return null;

  // Fetch detailed user information based on the authenticated user's ID
  const userInfo = await fetchUser(user.id);

  // If the user has not completed onboarding, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch a list of users for display
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  // Return Search page
  return (
    <section>
      {/* Display page title */}
      <h1 className="head-text mb-10">Search</h1>

      <Searchbar routeType="search" />

      {/* Display user search results */}
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>

      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page;
