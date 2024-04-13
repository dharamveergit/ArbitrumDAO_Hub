import classNames from "classnames";

export const GradientHead = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return (
    <div
      className={classNames(
        "flex flex-col items-start gap-4 rounded-4xl bg-sky px-2 pt-32  md:rounded-3xl md:px-4 lg:rounded-5xl lg:px-5 lg:pt-40",
        // className,
      )}
    >
      {children}
    </div>
  );
};
