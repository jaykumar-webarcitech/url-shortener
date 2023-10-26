"use server";

import { CreateLinkReturnData } from "@/app/types/create-link";
import createLink from "../create-link";
import { redirect } from "next/navigation";

export default async function submitLink(
  _: CreateLinkReturnData | null,
  formdata: FormData
): Promise<CreateLinkReturnData> {
  try {
    const url = formdata.get("url");
    if (!url) {
      return { data: null, status: "ERROR", error: "invalid_url" };
    }
    return createLink(formdata);
  } catch (e: any) {
    console.error(e);
    return { data: null, status: "ERROR", error: e.toString() };
  }
}
