import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Define the Page component
const Page = async ({ params }: { params: { id: string } }) => {
  // Check if the thread ID is provided as a parameter
  if (!params.id) return null;

  // Get the currently authenticated user
  const user = await currentUser();
  if (!user) return null;

  // Fetch detailed user information based on the authenticated user's ID
  const userInfo = await fetchUser(user.id);

  // If the user has not completed onboarding, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch thread information based on the provided thread ID
  const thread = await fetchThreadById(params.id);

  // Return Thread page
  return (
    <section className="relative mt-10 md:mt-3">
      {/* Display the main thread */}
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          isComment={false}
        />
      </div>

      {/* Display the comment form */}
      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImage={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      {/* Display child threads (comments) */}
      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={childItem?.id || ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment={true}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
