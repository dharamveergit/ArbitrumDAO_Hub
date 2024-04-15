import { cn } from "@/lib/utils";

const StatCard = ({
  value,
  label,
  variant = "DARK",
}: {
  value: any;
  label: string;
  variant: "DARK" | "LIGHT";
}) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col  items-start justify-end rounded-2xl  p-3 text-start ",
        variant === "DARK" && "bg-[#0C4A6E] text-white",
        variant === "LIGHT" && "bg-[#E0F2FE] text-zinc-800",
      )}
    >
      <h3
        className={cn(
          "font-medium  md:text-2xl lg:text-3xl",

          variant === "DARK" ? "text-lg" : "text-base",
        )}
      >
        {value}
      </h3>
      <p
        className={cn(
          "mt-1 text-sm font-normal text-zinc-100  ",
          variant === "DARK" && "text-zinc-100",
          variant === "LIGHT" && "text-zinc-800",
        )}
      >
        {label}
      </p>
    </div>
  );
};

export default StatCard;
