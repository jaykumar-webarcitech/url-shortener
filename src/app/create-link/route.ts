import { NextRequest, NextResponse } from "next/server";
import createLink from "../utils/create-link";
import { CreateLinkReturnError } from "../types/create-link";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const link = formData.get("url");

  if (!link || typeof link !== "string") {
    return NextResponse.json({
      type: "Error",
      code: 400,
      message: "Expected {url: string}",
      status: 400,
    });
  }

  const data = await createLink(formData);

  if (!data || data.status === "ERROR") {
    return NextResponse.json({
      type: "Error",
      code: 500,
      message: {
        alias_exists: "Alias already exists",
        invalid_alias: "Invalid alias",
        invalid_description: "Invalid description",
        invalid_title: "Invalid title",
        invalid_url: "Please enter a valid URL",
        invalid_formdata: "",
      }[data.error as CreateLinkReturnError],
      error_code: data.error,
      status: 500,
    });
  }

  return NextResponse.json({
    type: "Success",
    message: "Created successfully",
    status: data.data?.created ? 201 : 200,
    data,
  });
}
