"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

// Define the properties that the Pagination component receives
interface Props {
  pageNumber: number; // The current page number
  isNext: boolean; // Whether there is a next page available
  path: string; // The base path for the pagination links
}

// Define the Pagination component
function Pagination({ pageNumber, isNext, path }: Props) {
  // Get the router instance from Next.js
  const router = useRouter();

  // Handle the navigation when the "Prev" or "Next" button is clicked
  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;

    // If "Prev" button is clicked, decrement the page number, but not less than 1
    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    }
    // If "Next" button is clicked, increment the page number
    else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    }

    // Navigate to the appropriate page based on the calculated nextPageNumber
    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };

  // If there's no next page and the current page is 1, do not render anything
  if (!isNext && pageNumber === 1) return null;

  // Render the pagination UI
  return (
    <div className="pagination">
      {/* "Prev" button */}
      <Button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1} // Disable if already on the first page
        className="!text-small-regular text-light-2"
      >
        Prev
      </Button>

      {/* Current page number */}
      <p className="text-small-semibold text-light-1">{pageNumber}</p>

      {/* "Next" button */}
      <Button
        onClick={() => handleNavigation("next")}
        disabled={!isNext} // Disable if there's no next page
        className="!text-small-regular text-light-2"
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
