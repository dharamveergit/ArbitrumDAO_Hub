import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
// client:load
// name={link.name}
// sublinks={link.sublinks}
const HeaderDropdown = ({
  name,
  sublinks,
}: {
  name: string;
  sublinks: Array<{ name: string; href: string; description: string }>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex  items-center gap-1 text-sm font-medium text-secondary focus:outline-none">
        <span>{name}</span>
        <svg
          xmlns="https://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="max-w-[280px]  gap-0 p-4 md:rounded-3xl"
      >
        {sublinks?.map((link, i) => {
          return (
            <div key={link.href}>
              <DropdownMenuItem
                className="flex cursor-pointer  flex-col items-start rounded-xl py-3"
                asChild
              >
                <HeaderItem
                  title={link.name}
                  description={link.description}
                  href={link.href}
                />
              </DropdownMenuItem>
              {i !== sublinks.length - 1 && <DropdownMenuSeparator />}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;

interface HeaderItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  description: string;
  href?: string;
}

const HeaderItem = ({ title, description, ...props }: HeaderItemProps) => {
  return (
    <a className="" {...props}>
      <h1 className=" text-sm font-medium text-secondary ">{title}</h1>
      <p className="font-os text-xs text-gray-500">{description}</p>
    </a>
  );
};
