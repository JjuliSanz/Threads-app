"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

// LeftSideBar component definition
function LeftSideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6 justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 box-border">
          <Image src="/assets/logo.svg" alt="logo" width={32} height={32} className="rounded-lg"/>
          <p className="text-heading3-bold text-light-1 max-xs:hidden ">
            Threads
          </p>
        </Link>

        {/* Links */}
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-gray-800"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-md:hidden">{link.label}</p>
            </Link>
          );
        })}

        {/* Logout button */}
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="leftsidebar_link">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-md:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSideBar;
