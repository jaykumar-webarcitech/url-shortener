import getLinkData from "../utils/get-link";
import RedirectToLink from "./redirect_client";

export default async function Alias(props: { params: { alias: string } }) {
  const alias = props.params.alias;
  const shortLink = (await getLinkData(alias))?.link;
  return <RedirectToLink link={shortLink || "/"} />;
}
