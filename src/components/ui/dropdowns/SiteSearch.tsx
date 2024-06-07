import clsx from "clsx";
import { useEffect, useState } from "react";

const SiteSearch = () => {
  const [isInputHasValue, setIsInputHasValue] = useState(false);
  const [isThereResults, setIsThereResults] = useState(false);
  // find value of this class pagefind-ui__search-input
  //  in pagefind-ui__results has children when search change

  useEffect(() => {
    const searchInput = document.querySelector(".pagefind-ui__search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e: any) => {
        setIsInputHasValue(e.target.value.length > 0);
      });
    }
  }, []);

  return (
    <div
      id="search-no-results"
      className={clsx(
        "flex flex-col items-center justify-center gap-8 px-3 pb-4",
        isInputHasValue ? "hidden" : "flex",
      )}
    >
      <p className="text-center text-sm text-gray-500">
        {isInputHasValue ? "No results found" : "Start typing to search"}
      </p>
      <img src="/images/empty3.svg" alt="Arbitrum Logo" className="w-1/2" />
    </div>
  );
};

export default SiteSearch;
