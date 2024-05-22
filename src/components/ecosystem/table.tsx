import type { CollectionEntry } from "astro:content";
import classNames from "classnames";
import { set } from "date-fns";
import { ArrowRight, SearchIcon } from "lucide-react";
import React from "react";
import Highlighter from "react-highlight-words";
const Table = ({ data }: { data: CollectionEntry<"Grant_Hub">[] }) => {
  console.log(data);
  const [search, setSearch] = React.useState("");
  const [currentPageSize, setCurrentPageSize] = React.useState(100);
  const [filteredData, setFilteredData] = React.useState(data);

  return (
    <>
      <div className="flex w-[35rem] max-w-full items-center justify-between rounded-full border border-zinc-200 px-5 py-2 md:py-2.5 ">
        <div className="flex flex-1 items-center">
          <SearchIcon
            className="size-4 stroke-[1.3] text-zinc-500  md:size-5"
            aria-label="Search blog posts "
          />
          {/* <p className=" ml-2 text-xs font-light text-zinc-300 md:text-sm lg:text-base">
            Search for projects or keywords
          </p> */}
          <input
            type="text"
            placeholder="Search for projects or keywords"
            className="ml-2 w-full flex-1 text-xs font-light  focus:outline-none md:text-sm lg:text-base"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setFilteredData(
                data.filter(({ data }) =>
                  data.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              );
              setCurrentPageSize(100);
            }}
          />
        </div>

        <kbd className="pointer-events-none hidden h-5  select-none items-center gap-1 rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100 md:inline-flex md:text-sm">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="whitespace-nowrap border-b text-lg font-medium text-zinc-500">
              <th className="left-0 min-w-[20rem] bg-white px-2 py-5 text-left font-medium md:sticky">
                Name
              </th>
              <th className="px-2 py-5 text-left font-medium">Description</th>
              <th className="px-2 py-5 text-left font-medium">Category</th>
              <th className="px-2 py-5 text-left font-medium">Date</th>
              <th className="px-2 py-5 text-left font-medium">Funding Ask</th>
              <th className="px-2 py-5 text-left font-medium">Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length === 0 && (
              <tr className="border-b text-base font-medium text-zinc-900">
                <td className="left-0 min-w-[20rem] bg-white  px-2 py-3 md:sticky">
                  No projects found
                </td>
                <td className="  min-w-[20rem] px-2 py-3 font-os  font-light text-gray-500">
                  N/A
                </td>
                <td className="min-w-[15rem] whitespace-nowrap px-2 py-3 font-os capitalize">
                  N/A
                </td>
                <td className="min-w-[10rem] whitespace-nowrap px-2 py-3 font-os">
                  N/A
                </td>
                <td className="min-w-[10rem] whitespace-nowrap px-2 py-3 font-os">
                  N/A
                </td>
                <td className="px-2 py-3 font-os">N/A</td>
              </tr>
            )}

            {data &&
              filteredData?.length > 0 &&
              filteredData?.map(({ data, slug: curSlug }, i) => (
                <tr
                  key={i}
                  className={classNames(
                    "border-b  text-base font-medium text-zinc-900",
                  )}
                >
                  <td className="left-0 min-w-[20rem] bg-white  px-2 py-3 md:sticky">
                    <Highlighter
                      highlightClassName="bg-primary text-white"
                      searchWords={[search]}
                      autoEscape={true}
                      textToHighlight={data?.title}
                    />
                  </td>

                  <td className="  min-w-[20rem] px-2 py-3 font-os  font-light text-gray-500">
                    {data?.description && data?.description?.length > 100
                      ? data?.description?.slice(0, 100) + "..."
                      : data?.description}
                  </td>
                  <td className="min-w-[15rem] whitespace-nowrap px-2 py-3 font-os capitalize">
                    {curSlug.split("/")[0] ?? "N/A"}
                  </td>
                  <td className="min-w-[10rem] whitespace-nowrap px-2 py-3 font-os">
                    {data?.date
                      ? new Date(data?.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="min-w-[10rem] whitespace-nowrap px-2 py-3 font-os">
                    {data?.fundingAsk ?? "N/A"}
                  </td>
                  <td className="px-2 py-3 font-os">
                    <a
                      href={data.externalUrl}
                      className={classNames(
                        "flex items-center gap-1 whitespace-nowrap ",

                        !data.externalUrl
                          ? "cursor-not-allowed text-zinc-300"
                          : "hover:text-primary",
                      )}
                      target="_blank"
                    >
                      Project Link{" "}
                      <ArrowRight size={16} className="-rotate-45" />
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>{" "}
      <div className="flex items-center justify-center">
        <button
          className={classNames(
            "mt-5 rounded-full border border-zinc-200 px-5 py-2 text-xs font-medium text-zinc-500",
          )}
          onClick={() => setCurrentPageSize(currentPageSize + 100)}
        >
          {currentPageSize < data.length
            ? "Load More"
            : "No more projects to load"}
        </button>
      </div>
    </>
  );
};

export default Table;
