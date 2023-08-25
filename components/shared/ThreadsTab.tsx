// Import necessary modules and components
import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard"; // Import the ThreadCard component
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

// Props interface to define the expected prop types
interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

// ThreadsTab component definition
async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: any;

  // Determine whether to fetch user posts or community posts based on accountType
  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  // Redirect to the homepage if fetching posts fails
  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {/* Iterate through fetched threads and render a ThreadCard for each */}
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            // Conditionally define the author object based on accountType
            accountType === "User"
              ? {
                  name: result.name,
                  image: result.image,
                  id: result.id,
                }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          isComment={false}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
