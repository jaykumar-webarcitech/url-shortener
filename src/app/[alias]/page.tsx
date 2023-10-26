import { redirect } from "next/navigation";
import getLinkData from "../utils/get-link";

export default async function Alias(props: { params: { alias: string } }) {
  const alias = props.params.alias;
  const shortLink = (await getLinkData(alias))?.link;
  redirect(!!shortLink ? shortLink : "/");
  return <span>{shortLink}</span>;
}
