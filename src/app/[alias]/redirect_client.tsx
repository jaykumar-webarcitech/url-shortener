"use client";

import { useEffect } from "react";

export default function RedirectToLink(props: { link: string }) {
  useEffect(() => {
    window.location.href = props.link;
  }, [props.link]);

  return <span>{"Redirecting...."}</span>;
}
