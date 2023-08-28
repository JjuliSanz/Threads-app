import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Define the Home component
export default async function Home() {
  // Fetch posts
  const result = await fetchPosts(1, 30);

  // Get the currently authenticated user
  const user = await currentUser();
  if (!user) return null;

  // Fetch user information
  const userInfo = await fetchUser(user.id);

  // If the user has not completed onboarding, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <section className="mt-3 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                isComment={false}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
