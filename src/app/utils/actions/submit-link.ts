"use server";

import { CreateLinkReturnData } from "@/app/types/create-link";
import createLink from "../create-link";

export default async function submitLink(
  _: CreateLinkReturnData | undefined,
  formdata?: FormData
): Promise<CreateLinkReturnData> {
  try {
    if (!formdata) {
      return { status: "IDLE", error: "invalid_formdata" };
    }
    const url = formdata.get("url");
    if (!url) {
      return { status: "ERROR", error: "invalid_url" };
    }
    return await createLink(formdata);
  } catch (e: any) {
    return { status: "ERROR", error: e.toString() };
  }
}
