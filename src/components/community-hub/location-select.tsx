import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocationSelect = ({
  locations,
}: {
  locations: (string | undefined)[];
}) => {
  const removeDuplicates = (arr: (string | undefined)[]) => {
    return [...new Set(arr)];
  };

  const uniqueLocations = removeDuplicates(locations);

  return (
    <Select>
      <SelectTrigger className="w-fit gap-2 rounded-full border border-zinc-100  px-4 py-2 text-xs text-zinc-600  md:text-sm">
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent className="rounded-2xl">
        {uniqueLocations.map((location) => (
          <SelectItem
            key={location}
            value={location ?? ""}
            className="rounded-xl"
          >
            {location}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocationSelect;
