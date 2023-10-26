import { NextRequest, NextResponse } from "next/server";
import createLink from "../utils/create-link";

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
      message: "Failed to create",
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
