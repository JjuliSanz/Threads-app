"use client"
import Link from "next/link";
import Image from "next/image";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Topbar component definition
function Topbar() {
  const router = useRouter();
  return (
    <div className="topbar">
      {/* Logo */}
      <Link href="/" className="flex gap-4 md:hidden pl-3">
        <Image src="/assets/logo.svg" alt="logo" width={32} height={32} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      {/* Logout button */}
      <SignedIn>
        <SignOutButton signOutCallback={() => router.push("/sign-in")}>
          {/* Logout button content */}
          <div className="flex cursor-pointer gap-4 p-4">
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
  );
}

export default Topbar;
