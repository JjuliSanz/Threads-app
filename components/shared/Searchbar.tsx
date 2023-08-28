"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

// Define the properties that the Searchbar component receives
interface Props {
  routeType: string; // The type of route (e.g., "/search" or "/users")
}

// Define the Searchbar component
function Searchbar({ routeType }: Props) {
  // Get the router instance from Next.js
  const router = useRouter();

  // State to track the search input value
  const [search, setSearch] = useState("");

  // Perform a query after 0.3 seconds of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // If there's a search input value, navigate to the appropriate route with the search query
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        // If there's no search input value, navigate to the base route
        router.push(`/${routeType}`);
      }
    }, 300);

    // Clean up the timeout when the search input or routeType changes
    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  // Render the search input UI
  return (
    <div className="searchbar">
      {/* Search icon */}
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />

      {/* Search input */}
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType !== "/search" ? "Search communities" : "Search users"
        }`}
        className="no-focus searchbar_input"
      />
    </div>
  );
}

export default Searchbar;
