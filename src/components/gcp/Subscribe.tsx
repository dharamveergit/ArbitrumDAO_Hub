import clsx from "clsx";
import { useState } from "react";

const SubscribeGCP = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const env = import.meta.env.PUBLIC_GCP_KEY;

  const sendEmailToSheet = () => {
    if (
      email === "" ||
      !email.includes("@") ||
      email.split("@")[1] !== "gmail.com"
    ) {
      return;
    }
    const FromData = new FormData();
    FromData.append("Email", email ?? "None");

    FromData.append(
      "Date",
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    );
    try {
      fetch(env, {
        method: "POST",
        body: FromData,
      });
      setSuccess(true);
      setEmail("");
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section
      id="newsletter"
      className="flex flex-col gap-11 rounded-small bg-blue-light p-2 text-black md:gap-20 md:rounded-3xl md:p-4 lg:gap-32 lg:rounded-5xl lg:p-5"
    >
      <p className="font-os text-lg font-normal md:text-xl lg:w-1/2 lg:text-3xl">
        Get Notified everything about GCP with our weekly Newsletter
      </p>
      <div className="mt-10 flex justify-end gap-2 md:mt-0 lg:ml-auto lg:mt-0 lg:w-1/2 lg:gap-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter your email"
          className="w-full flex-1 rounded-xl border border-gray-300 p-2 text-xs md:rounded-2xl md:p-4 md:text-base lg:text-xl"
        />
        <button
          onClick={sendEmailToSheet}
          className={clsx(
            "whitespace-nowrap rounded-xl  px-3 text-xs  md:rounded-2xl md:text-base lg:text-xl",
            success ? "bg-green-500 text-white" : "bg-primary text-white",
          )}
        >
          {success ? "Subscribed" : "Notify Me"}
        </button>
      </div>
    </section>
  );
};

export default SubscribeGCP;
