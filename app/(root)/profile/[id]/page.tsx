import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Import components related to tabs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";

// Define the Page component and pass the "params" prop
async function Page({ params }: { params: { id: string } }) {
  // Get the currently authenticated user
  const user = await currentUser();

  // If there's no authenticated user, return null (nothing is displayed on the page)
  if (!user) return null;

  // Get detailed user information based on the provided user ID
  const userInfo = await fetchUser(params.id);

  // If the user has not completed onboarding, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Return Profile page
  return (
    <section className="mt-10 md:mt-3">
      {/* Render the ProfileHeader component with user information */}
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        {/* Use Tabs component for navigation */}
        <Tabs defaultValue="threads" className="w-full">
          {/* Render tab triggers */}
          <TabsList className="tab p-0">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                {/* Display tab icon */}
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={26}
                  height={26}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {/* Display thread count for the Threads tab */}
                {tab.label === "Threads" && (
                  <p className="rounded bg-gray-800 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Render tab content */}
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              {/* Render ThreadsTab component for tab content */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
