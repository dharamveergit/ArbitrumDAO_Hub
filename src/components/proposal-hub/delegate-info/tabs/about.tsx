import { Skeleton } from "@/components/ui/skeleton";
import { proseClasses } from "@/lib/classes";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import type { DelegateData } from "../../types/delegate";
import { useDelegates } from "../../useDelegates";

const About = ({ address }: { address: string }) => {
  const { getDelegateByAddress } = useDelegates();

  const delegate = useQuery<DelegateData, Error>({
    queryKey: ["DELEGATE", address],
    queryFn: () => getDelegateByAddress({ address: address }),
  });

  if (delegate.isLoading) {
    return (
      <div className="flex flex-col gap-y-2">
        <Skeleton className="mt-1 h-10  w-[40%]  text-lg font-medium leading-[40px] md:text-3xl lg:text-4xl" />
        <Skeleton className="mt-1 h-5  w-full  text-lg font-medium leading-[40px] md:text-3xl lg:text-4xl" />
        <Skeleton className="mt-1 h-5  w-full  text-lg font-medium leading-[40px] md:text-3xl lg:text-4xl" />
        <Skeleton className="mt-1 h-5  w-full  text-lg font-medium leading-[40px] md:text-3xl lg:text-4xl" />{" "}
        <Skeleton className="mt-1 h-5  w-full  text-lg font-medium leading-[40px] md:text-3xl lg:text-4xl" />{" "}
        <Skeleton className="mt-1 h-5  w-full  text-lg font-medium leading-[40px] md:text-3xl lg:text-4xl" />{" "}
        <Skeleton className="mt-1 h-5  w-full  text-lg font-medium leading-[40px] md:text-3xl lg:text-4xl" />
        <Skeleton className="mt-1 h-5  w-[20%]  text-lg font-medium leading-[40px] md:text-3xl lg:text-4xl" />
      </div>
    );
  }

  if (delegate.isError) {
    return <div>error</div>;
  }

  if (delegate.data && delegate.data.delegate) {
    return (
      <Markdown className={proseClasses}>
        {delegate.data.delegate?.statement?.statement}
      </Markdown>
    );
  }

  return null;
};

export default About;
