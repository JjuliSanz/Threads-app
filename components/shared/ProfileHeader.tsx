import Image from "next/image";
import Link from "next/link";

// Define Props interface
interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
}

// ProfileHeader component definition
const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start bg-gray-700 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Profile Image */}
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            {/* Name */}
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            {/* Username */}
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>

        {/* Edit */}
        {accountId === authUserId && type !== "Community" && (
          <Link href={"/profile/edit"}>
            <div className="flex cursor-pointer gap-3 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-500">
              <Image src="/assets/edit.svg" alt="edit" width={16} height={16} />
              <p className="text-light-2 max-sm:hidden">Edit</p>
            </div>
          </Link>
        )}
      </div>

      {/* Bio */}
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
