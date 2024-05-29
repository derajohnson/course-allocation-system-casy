"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  title: string;
  icon?: string;
  url: string;
};

const SidebarItem = (props: Props): React.JSX.Element => {
  const path = usePathname();
  const checkPathMatch = (linkTitle: string): boolean => {
    return path.includes(linkTitle.toLowerCase());
  };

  return (
    <>
      <Link
        href={props.url}
        className={`text-[18px] leading-[18px} font-medium hover:text-white ${
          checkPathMatch(props.title) ? "text-muted" : "text-muted"
        }`}
      >
        {props.title}
      </Link>
    </>
  );
};

export default SidebarItem;
