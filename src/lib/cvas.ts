import { cva } from "class-variance-authority";

export const roundedNavButtonClass = cva(
  " whitespace-nowrap  rounded-full px-3 md:px-4 xl:px-5  py-2 md:py-3",
  {
    variants: {
      variant: {
        default: "font-medium text-xs md:text-sm bg-primary-sky ",
        children: "font-os  text-xs md:text-sm bg-primary-light",
      },
      size: {
        default: "min-w-[120px] md:min-w-[140px] xl:min-w-40",
        large: "min-w-[160px] md:min-w-[210px] xl:min-w-60",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const buttonVariants = cva(
  "inline-flex font-os  not-prose items-center rounded-full justify-center whitespace-nowrap    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ro focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary font-normal text-white hover:bg-[#0369A1]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-white font-normal text-zinc-600 border hover:bg-zinc-300 hover:text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "text-xs  px-3 lg:px-4 py-1.5 md:py-2 md:text-sm",
        sm: "py-1.5 rounded-full text-xs px-2.5",
        lg: "px-6 rounded-full py-3 text-sm",
        icon: "h-12 w-12 rounded-full",
        link: "text-xs md:text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const buttonVariants2 = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const tagCva = cva("rounded-full border font-os   px-3 py-1 text-xs  ", {
  variants: {
    active: {
      true: "border-primary bg-primary-light text-primary",
      false: "bg-zinc-50 text-zinc-400 border-zinc-200",
    },
    href: {
      true: "hover:border-primary hover:bg-primary-light hover:text-primary",
      false: "",
    },
  },
  defaultVariants: {
    active: false,
    href: false,
  },
});

export const titleCva = cva("  font-medium ", {
  variants: {
    color: {
      primary: "text-primary",
      secondary: "text-zinc-900",
      tertiary: "text-white",
    },
    size: {
      xl: "text-2xl md:text-3xl lg:text-4xl",
      lg: "text-xl md:text-2xl lg:text-3xl",
      md: "text-lg md:text-xl lg:text-2xl",
      sm: "text-sm md:text-base lg:text-lg",
      xs: "text-sm lg:text-base",
    },
  },
  defaultVariants: {
    color: "secondary",
    size: "md",
  },
});

export const paragraphCva = cva(" font-light", {
  variants: {
    color: {
      primary: "text-zinc-700",
      secondary: "text-zinc-200",
      tertiary: "text-zinc-100",
    },
    size: {
      sm: "text-xs",
      md: "text-xs  md:text-sm lg:text-base",
    },
    clamp: {
      true: "line-clamp-3",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
    clamp: false,
  },
});

export const smallCva = cva(
  "uppercase tracking-wide font-os text-xs lg:text-sm",
  {
    variants: {
      color: {
        primary: "text-zinc-900",
        secondary: "text-zinc-200",
        tertiary: "text-zinc-100",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  },
);
