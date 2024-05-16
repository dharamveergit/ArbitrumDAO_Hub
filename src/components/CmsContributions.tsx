import React from "react";
import ContributionDropdown from "./community-hub/contributeDropdown";
import { paragraphCva, titleCva } from "@/lib/cvas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children} <Toaster />
    </QueryClientProvider>
  );
};

const CmsContributions = () => {
  return (
    <Provider>
      <ContributionDropdown
        title={
          <>
            Add Using CMS {""} : <CheckStatus />
          </>
        }
        titleSize="sm"
        className="!py-0"
        description={
          <p className={paragraphCva()}>
            Are you eager to impart your insights and knowledge to our vibrant
            community? Explore our comprehensive guide on how you can actively
            contribute to this dynamic and evolving space by using the Arbitrum
            Hub CMS in a few easy steps.
          </p>
        }
        data={[
          {
            title: "Apply for eligibility",
            description: (
              <>
                Apply for eligibility to use the Arbitrum Hub CMS by clicking
                this{" "}
                <a
                  href="https://api.github.com/repos/dharamveergit/ArbitrumDAO_Hub/contributors?anon=1"
                  className="underline"
                  target="_blank"
                >
                  link.
                </a>
              </>
            ),
          },
          {
            title: "Check Eligibility",
            description:
              "Check whether you can make contributions through Arbitrum Hub CMS",
          },
          {
            title: "Select the area of contribution",
            description:
              "Carefully select what the intended contribution is for",
          },
          {
            title: "Add the content to contribute",
            description:
              "Fill the details as asked for on the content management system for easy implementation",
          },
          {
            title: "Wait for review",
            description:
              "Since the authenticity and quality of content is important therefore a through review is conducted before publishing the content",
          },
          {
            title: "Receive confirmation",
            description:
              "Once the changes are complete and live, one will receive a confirmation for the same",
          },
        ]}
      />
    </Provider>
  );
};

export default CmsContributions;

const CheckStatus = () => {
  const { data } = useQuery({
    queryKey: ["checkStatus"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/repos/dharamveergit/ArbitrumDAO_Hub/contributors?anon=1",
      );
      return response.json();
    },
  });

  console.log(data);

  const [userName, setUserName] = React.useState("");
  const [isEligible, setIsEligible] = React.useState(false);
  return (
    <Dialog>
      <DialogTrigger className="underline">
        {" "}
        Check eligibility for using CMS
      </DialogTrigger>
      <DialogContent className="flex flex-col  gap-10 bg-zinc-200 p-5 md:rounded-large [&>button]:hidden">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className={titleCva()}>Notice:</h1>
          <p
            className={paragraphCva({
              className: "text-center",
            })}
          >
            If you did'nt find your username in the list of contributors, you
            can apply for the same by clicking this{" "}
            <a href="" className="underline">
              link
            </a>
          </p>
        </div>
        <div className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Enter your username"
            className="flex-1 rounded-xl border  bg-white p-2"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            onClick={() => {
              const findUser = data?.find(
                (user: any) => user.login === userName,
              );
              if (findUser) {
                toast.success("You are eligible to use CMS");
                setIsEligible(true);
              } else {
                toast.error("You are not eligible to use CMS");
                setIsEligible(false);
              }
            }}
            className="rounded-xl bg-primary p-2 text-white "
          >
            Check
          </button>
        </div>
        {isEligible && (
          <DialogDescription className="text-center text-green-600">
            You are eligible to use CMS . Please follow this{" "}
            <a href="/admin/" className="underline">
              link
            </a>{" "}
            to start contributing to Arbitrum Hub.
          </DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  );
};
