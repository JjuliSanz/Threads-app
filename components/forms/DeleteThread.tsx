"use client";
import { deleteThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

// Define the props for the DeleteThread component
interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

// DeleteThread component definition
function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  // Next.js router and pathname
  const router = useRouter();
  const pathname = usePathname();

  // Check if the current user is the author and not on the homepage
  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    // Display the delete icon as an Image component
    <Image
      src={"/assets/delete.svg"}
      alt="delete thread"
      width={20}
      height={20}
      className="cursor-pointer object-contain"
      onClick={async () => {
        // Call the deleteThread function and handle the response
        await deleteThread(JSON.parse(threadId), pathname);
        if (!parentId || !isComment) {
          // If not a comment or has no parent, redirect to the homepage
          router.push("/");
        }
      }}
    />
  );
}

export default DeleteThread;
