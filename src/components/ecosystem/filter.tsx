import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUrl } from "@/lib/utils";

interface checkedItem {
  title: string;
  checked: boolean;
}

const Filter = ({ data, pathname }: { data: string[]; pathname: string }) => {
  const [checkedItems, setCheckedItems] = useState<checkedItem[]>([]);

  useEffect(() => {
    setCheckedItems(
      data.map((item) => ({
        title: item,
        checked: pathname.includes(item),
      })),
    );
  }, [data]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full border px-3 py-1 text-sm">
          Filter
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <a href="/ecosystem-hub/grant-projects/all#filter">
          <DropdownMenuCheckboxItem

          // onCheckedChange={(checked) => {
          //   setCheckedItems((prev) =>
          //     prev.map((prevItem) => {
          //       if (prevItem.title === item.title) {
          //         return {
          //           ...prevItem,
          //           checked,
          //         };
          //       }
          //       return prevItem;
          //     }),
          //   );
          // }}
          >
            All
          </DropdownMenuCheckboxItem>
        </a>
        {checkedItems.map((item) => (
          <a href={getUrl(item.title, pathname, data)} key={item.title}>
            <DropdownMenuCheckboxItem
              key={item.title}
              checked={item.checked}
              // onCheckedChange={(checked) => {
              //   setCheckedItems((prev) =>
              //     prev.map((prevItem) => {
              //       if (prevItem.title === item.title) {
              //         return {
              //           ...prevItem,
              //           checked,
              //         };
              //       }
              //       return prevItem;
              //     }),
              //   );
              // }}
              className="capitalize"
            >
              {item.title}
            </DropdownMenuCheckboxItem>
          </a>
        ))}
        {/* <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
