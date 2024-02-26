import type { Metadata, ResolvingMetadata } from "next";
import getLinkData from "../utils/get-link";
import getAllAliases from "../utils/get-all-aliases";
import type { WithId, Document } from "mongodb";

type Props = {
  params: { alias: string } & WithId<Document>;
};

export async function generateStaticParams() {
  const allAliases = await getAllAliases();
  return allAliases
    .map((data) => ({ alias: data.alias as string | undefined }))
    .filter((data) => !!data.alias);
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

export async function generateMetadata(
  { params: { alias } }: Props,
  _: ResolvingMetadata,
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
