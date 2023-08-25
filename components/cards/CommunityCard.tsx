import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

// Define the properties for the CommunityCard component
interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

// CommunityCard component definition
function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className="community-card">
      <div className="flex flex-wrap items-center gap-3">
        {/* Link to the community's page */}
        <Link href={`/communities/${id}`} className="relative h-12 w-12">
          {/* Display the community logo */}
          <Image
            src={imgUrl}
            alt="community_logo"
            fill
            className="rounded-full object-cover"
          />
        </Link>

        <div>
          {/* Link to the community's page */}
          <Link href={`/communities/${id}`}>
            {/* Display the community name */}
            <h4 className="text-base-semibold text-light-1">{name}</h4>
          </Link>
          {/* Display the community username */}
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      {/* Display the community's bio */}
      <p className="mt-4 text-subtle-medium text-gray-1">{bio}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        {/* Link to the community's page */}
        <Link href={`/communities/${id}`}>
          {/* Display a button */}
          <Button size="sm" className="community-card_btn">
            Viex
          </Button>
        </Link>

        {members.length > 0 && (
          <div className="flex items-center">
            {/* Display member avatars */}
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && "-ml-2"
                } rounded-full object-cover`}
              />
            ))}
            {/* Display number of members if greater than 3 */}
            {members.length > 3 && (
              <p className="ml-1 text-subtle-medium text-gray-1">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
