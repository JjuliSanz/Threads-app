"use client";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";

// Bottombar component definition
function Bottombar() {
  // Get the current pathname using usePathname
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {/* Map through the sidebarLinks and generate link items */}
        {sidebarLinks.map((link) => {
          // Check if the link is active based on the pathname
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // Return the link component
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
