import classNames from "classnames";

const p = " prose-p:font-os   prose-p:text-sm lg:prose-p:text-base font-light ";
const h1 =
  " prose-h1:text-2xl prose-h1:mt-0   md:prose-h1:text-3xl prose-h1:font-medium    lg:prose-h1:text-4xl  ";
const h2 =
  " prose-h2:text-xl  prose-h2:mt-0  md:prose-h2:text-2xl   prose-h2:font-medium  lg:prose-h2:text-3xl  ";

const h3 =
  " prose-h3:text-lg prose-h3:mt-0   md:prose-h3:text-xl  prose-h3:font-medium   lg:prose-h3:text-2xl  ";

const h4 =
  " prose-h4:text-base   md:prose-h4:text-lg  prose-h4:font-medium   lg:prose-h4:text-xl  ";
const h5 =
  " prose-h5:text-sm   md:prose-h5:text-base  prose-h5:font-medium   lg:prose-h5:text-lg  ";
const h6 =
  " prose-h5:text-sm   md:prose-h5:text-sm  prose-h5:font-medium   lg:prose-h5:text-base  ";
const ul =
  " prose-ul:font-os  prose-ul:text-sm lg:prose-ul:text-base font-light";
const ol = " prose-ol:font-os   text-sm lg:prose-ol:text-base font-light";
const table =
  " prose-table:overflow-x-auto prose-table:table-auto prose-table:font-os prose-th:text-sm md:prose-th:text-base lg:prose-th:text-lg prose-th:text-semibold prose-td:text-xs  md:prose-td:text-sm lg:prose-td:text-base  ";

export const proseClasses = classNames(
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  table,
  ol,
  "prose max-w-full prose-img:w-full  prose-zinc prose-hr:my-10 md:prose-hr:my-16 lg:prose-hr:my-20 ",
);
