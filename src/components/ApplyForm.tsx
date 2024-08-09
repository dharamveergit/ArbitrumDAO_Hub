import React from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "./ui/button";
import { buttonVariants, paragraphCva, titleCva } from "@/lib/cvas";
import { ArrowRight, Loader2 } from "lucide-react";
import clsx from "clsx";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import CmsContributions from "./CmsContributions";
import ContributionDropdown from "./community-hub/contributeDropdown";
const ApplyForm = () => {
  const schema = z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email({ message: "Email is required" }),
      why: z.string().min(100, { message: "Min 100 characters" }),
      socialLinks: z.object({
        github: z.string().url({ message: "Github is required" }),
        twitter: z.string().url({ message: "Twitter is required" }),
      }),
      about: z.string().min(100, { message: "Min 100 characters" }),
    })
    .superRefine((data, ctx) => {
      if (data.socialLinks.github === data.socialLinks.twitter) {
        ctx.addIssue({
          code: "custom",
          message: "Github and Twitter can't be same",
          path: ["socialLinks", "github"],
        });
      }

      if (
        !data.socialLinks.github.startsWith("https://github.com/") ||
        (!data.socialLinks.twitter.startsWith("https://twitter.com/") &&
          !data.socialLinks.twitter.startsWith("https://x.com/"))
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "Please enter valid Github and Twitter links (https://github.com/) and (https://twitter.com/) ",
          path: ["socialLinks", "github"],
        });
      }
    });

  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-10 py-5 md:py-10">
      <div className="flex flex-col gap-4">
        <h1 className={titleCva()}>How to Contribute</h1>
        <p className={paragraphCva()}>
          One can contribute to Arbitrum Hub from one of two ways:
        </p>
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger className="mr-auto">
            <button
              className={buttonVariants({
                variant: "default",
                size: "default",
              })}
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </DialogTrigger>
          <DialogContent
            className={clsx(
              success ? "" : "border-t-[10px] border-primary",
              " flex max-w-[600px] flex-col gap-10 rounded-small border-x-0  border-b-0   bg-zinc-200 p-5 [&>button]:hidden",
            )}
          >
            {success ? (
              <div className="flex flex-col items-center justify-center gap-6 p-6">
                <svg
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M35 69.5C39.5306 69.5 44.0168 68.6076 48.2026 66.8738C52.3883 65.1401 56.1916 62.5988 59.3952 59.3952C62.5988 56.1916 65.1401 52.3883 66.8738 48.2026C68.6076 44.0168 69.5 39.5306 69.5 35C69.5 30.4694 68.6076 25.9832 66.8738 21.7974C65.1401 17.6117 62.5988 13.8084 59.3952 10.6048C56.1916 7.40119 52.3883 4.85994 48.2026 3.12616C44.0168 1.39237 39.5306 0.5 35 0.5C25.85 0.5 17.0748 4.13481 10.6048 10.6048C4.13481 17.0748 0.5 25.85 0.5 35C0.5 44.15 4.13481 52.9252 10.6048 59.3952C17.0748 65.8652 25.85 69.5 35 69.5ZM34.1107 48.9533L53.2773 25.9533L47.3893 21.0467L30.906 40.8228L22.3768 32.2898L16.9565 37.7102L28.4565 49.2102L31.4235 52.1772L34.1107 48.9533Z"
                    fill="#25ACFC"
                  />
                </svg>
                <h1 className={titleCva({ className: "text-center" })}>
                  Thank You for Your Submission!
                </h1>
                <p
                  className={paragraphCva({
                    className: "text-center text-zinc-700",
                  })}
                >
                  Our team will review your submission to assess your fit for
                  Arbitrum CMS. This process may take a few days. You will
                  receive an email notification with the outcome of your request
                  or any additional steps required.
                </p>
              </div>
            ) : (
              <>
                <h1 className={titleCva({ className: "text-center" })}>
                  Get access to Arbitrum CMS by filling this form.
                </h1>
                <form
                  onSubmit={handleSubmit((data) => {
                    setLoading(true);
                    const templateParams = {
                      from_name: data.name,
                      email: data.email,
                      github: data.socialLinks.github,
                      twitter: data.socialLinks.twitter,
                      about: data.about,
                      message: data.why,
                    };
                    emailjs
                      .send(
                        "service_r8y5ksd",
                        "template_bulpc2h",
                        templateParams,
                        "-udTBLJ7RMauLyoFn",
                      )
                      .then((res) => {
                        console.log(res);

                        setLoading(false);
                        setSuccess(true);
                        reset();
                      })
                      .catch((err) => {
                        toast.error(err.text);

                        setLoading(false);
                      });
                  })}
                  className="flex flex-col gap-5"
                >
                  <Input
                    label="Your Full Name"
                    register={register("name")}
                    error={errors.name}
                  />
                  <Input
                    label="Your Email"
                    register={register("email")}
                    error={errors.email}
                  />
                  <TextArea
                    label="What type of contributions are you interested in making to Arbitrum CMS?"
                    register={register("why")}
                    error={errors.why}
                  />
                  <div className="flex flex-col gap-1">
                    <h1 className={titleCva({ size: "xs" })}>
                      Please provide social links
                      <span className="text-red-500">*</span>
                    </h1>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-6">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 32 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M31.4894 32.0181L21.005 15.5525L31.2694 4.26203C31.6296 3.85604 31.8152 3.32444 31.7861 2.7825C31.7569 2.24056 31.5153 1.73195 31.1137 1.36694C30.712 1.00193 30.1827 0.809943 29.6404 0.832598C29.0982 0.855254 28.5867 1.09073 28.2169 1.48797L18.7174 11.9448L12.2394 1.76813C12.0532 1.47542 11.7962 1.23439 11.4922 1.06735C11.1882 0.900314 10.8469 0.81266 10.5 0.8125H2.25003C1.88057 0.81267 1.51793 0.912082 1.20003 1.10034C0.882126 1.28861 0.62063 1.55881 0.442875 1.8827C0.26512 2.20659 0.177632 2.57229 0.189555 2.94156C0.201478 3.31083 0.312376 3.67012 0.510655 3.98187L10.995 20.4475L0.72378 31.738C0.537811 31.9377 0.393341 32.1724 0.298744 32.4284C0.204147 32.6845 0.161303 32.9567 0.172696 33.2294C0.18409 33.5021 0.249494 33.7698 0.365117 34.017C0.48074 34.2643 0.644283 34.4861 0.846268 34.6697C1.04825 34.8532 1.28466 34.9949 1.54179 35.0864C1.79892 35.1779 2.07166 35.2175 2.3442 35.2028C2.61674 35.1882 2.88365 35.1196 3.12948 35.001C3.37531 34.8824 3.59516 34.7162 3.77628 34.512L13.2827 24.0552L19.7607 34.2319C19.9468 34.5246 20.2038 34.7656 20.5079 34.9327C20.8119 35.0997 21.1531 35.1873 21.5 35.1875H29.75C30.1195 35.1873 30.4821 35.0879 30.8 34.8997C31.1179 34.7114 31.3794 34.4412 31.5572 34.1173C31.7349 33.7934 31.8224 33.4277 31.8105 33.0584C31.7986 32.6892 31.6877 32.3299 31.4894 32.0181ZM22.6327 31.0625L6.00722 4.9375H9.36738L25.9928 31.0625H22.6327Z"
                            fill="black"
                          />
                        </svg>
                        <label
                          className={titleCva({
                            size: "xs",
                            className: "w-14",
                          })}
                        >
                          Twitter
                        </label>
                        <input
                          type="text"
                          className="w-full flex-1  rounded-lg border px-4 py-2 outline-none focus:border-primary"
                          {...register("socialLinks.twitter")}
                        />
                      </div>
                      {errors.socialLinks?.twitter && (
                        <p className="text-xs text-red-500">
                          {errors.socialLinks.twitter.message}
                        </p>
                      )}
                      <div className="flex items-center gap-6">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 0C17.3736 0 14.7728 0.517315 12.3463 1.52241C9.91982 2.5275 7.71503 4.00069 5.85786 5.85786C2.10714 9.60859 0 14.6957 0 20C0 28.84 5.74 36.34 13.68 39C14.68 39.16 15 38.54 15 38V34.62C9.46 35.82 8.28 31.94 8.28 31.94C7.36 29.62 6.06 29 6.06 29C4.24 27.76 6.2 27.8 6.2 27.8C8.2 27.94 9.26 29.86 9.26 29.86C11 32.9 13.94 32 15.08 31.52C15.26 30.22 15.78 29.34 16.34 28.84C11.9 28.34 7.24 26.62 7.24 19C7.24 16.78 8 15 9.3 13.58C9.1 13.08 8.4 11 9.5 8.3C9.5 8.3 11.18 7.76 15 10.34C16.58 9.9 18.3 9.68 20 9.68C21.7 9.68 23.42 9.9 25 10.34C28.82 7.76 30.5 8.3 30.5 8.3C31.6 11 30.9 13.08 30.7 13.58C32 15 32.76 16.78 32.76 19C32.76 26.64 28.08 28.32 23.62 28.82C24.34 29.44 25 30.66 25 32.52V38C25 38.54 25.32 39.18 26.34 39C34.28 36.32 40 28.84 40 20C40 17.3736 39.4827 14.7728 38.4776 12.3463C37.4725 9.91982 35.9993 7.71503 34.1421 5.85786C32.285 4.00069 30.0802 2.5275 27.6537 1.52241C25.2272 0.517315 22.6264 0 20 0Z"
                            fill="black"
                          />
                        </svg>

                        <label
                          className={titleCva({
                            size: "xs",
                            className: "w-14",
                          })}
                        >
                          Github
                        </label>
                        <input
                          type="text"
                          className="w-full flex-1  rounded-lg border px-4 py-2 outline-none focus:border-primary"
                          {...register("socialLinks.github")}
                        />
                      </div>
                      {errors.socialLinks?.github && (
                        <p className="text-xs text-red-500">
                          {errors.socialLinks.github.message}
                        </p>
                      )}

                      {errors.socialLinks && (
                        <p className="text-xs text-red-500">
                          {errors.socialLinks.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <TextArea
                    label="About yourself"
                    register={register("about")}
                    error={errors.about}
                  />
                  <button
                    type="submit"
                    className={buttonVariants({
                      size: "lg",
                      className: "mr-auto rounded-md",
                    })}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <CmsContributions setOpen={setOpen} />
      <ContributionDropdown className="!py-0" titleSize="sm" />
    </div>
  );
};

export default ApplyForm;

const TextArea = ({
  label,
  register,
  placeholder,
  error,
}: {
  label: string;
  register: any;
  placeholder?: string;
  error?: FieldError | undefined;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={clsx(
          titleCva({
            size: "xs",
          }),
        )}
      >
        {label}
        <span className="text-red-500">*</span>
      </label>
      <textarea
        placeholder={placeholder}
        className="max-h-[10rem] w-full rounded-lg border px-4 py-2 outline-none focus:border-primary"
        {...register}
      />
      <p className="text-xs text-red-500">{error?.message}</p>
    </div>
  );
};

const Input = ({
  label,
  register,
  placeholder,
  error,
}: {
  label: string;
  register: any;
  placeholder?: string;
  error?: FieldError | undefined;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={clsx(
          titleCva({
            size: "xs",
          }),
        )}
      >
        {label}
        <span className="text-red-500">*</span>
      </label>
      <input
        placeholder={placeholder}
        className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary"
        {...register}
      />
      <p className="text-xs text-red-500">{error?.message}</p>
    </div>
  );
};
