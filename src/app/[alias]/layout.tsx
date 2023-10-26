import type { Metadata, ResolvingMetadata } from "next";
import getLinkData from "../utils/get-link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

type Props = {
  params: { alias: string };
};

export async function generateMetadata(
  { params: { alias } }: Props,
  _: ResolvingMetadata
): Promise<Metadata> {
  const parent = await _;
  const linkData = await getLinkData(alias);
  const title = linkData?.title || parent.title || "404";
  const description = linkData?.description || parent.description || "404";
  const link = `https://shrtm.in/${alias}` || parent.alternates?.canonical;
  const ogLink =
    `https://shrtm.in/${alias}` || (parent.openGraph?.url ?? undefined);
  return {
    title,
    description,
    alternates: {
      canonical: link,
    },
    openGraph: {
      title,
      description,
      url: ogLink,
    },
  };
}
