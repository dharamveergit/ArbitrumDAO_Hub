export const ApiBadge = ({ api }: { api: "TALLY" | "SNAPSHOT" }) => {
  if (api === "SNAPSHOT") {
    return (
      <div className=" rounded-full bg-gray-100 px-2 py-1">
        <img src="/images/logos/snapshot.png" className="h-[12px] w-[43px] " />
      </div>
    );
  }

  return (
    <div className=" rounded-full bg-gray-100 px-2 py-1">
      <img
        src="/images/logos/tally.png"
        className="h-[18px] w-[64.5px] object-contain"
      />
    </div>
  );
};
