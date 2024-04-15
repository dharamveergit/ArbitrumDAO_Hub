import { buttonVariants } from "@/lib/cvas";
import { type VariantProps } from "class-variance-authority";
import { ArrowRightCircle } from "lucide-react";
import React from "react";

const Button = ({
  variant = "default",
  size = "default",
  children,
  href = "/coming-soon",
  arrow,

  ...buttonProps
}: {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  children: React.ReactNode;
  href?: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  arrow?: boolean;
}) => {
  return (
    <a
      href={href}
      {...buttonProps}
      className={buttonVariants({ variant, size })}
      target={href.startsWith("http") ? "_blank" : "_self"}
    >
      {children}
      {arrow && (
        <ArrowRightCircle className="ml-2 h-4 w-4 -rotate-45 text-[#52525B]" />
      )}
    </a>
  );
};

export default Button;
