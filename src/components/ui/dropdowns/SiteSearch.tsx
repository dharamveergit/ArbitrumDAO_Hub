import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import S from "astro-pagefind/components/Search";
const SiteSearch = () => {
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <Search height={16} width={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Search for anything on the site</DialogDescription>
          <S
            id="search"
            className="pagefind-ui"
            uiOptions={{ showImages: false }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SiteSearch;
