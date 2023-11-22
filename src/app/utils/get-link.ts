import type { WithId, Document } from "mongodb";
import connectToDatabase from "./mongodb";

let linkCacheData: Record<string, WithId<Document> | undefined> = {};

export default async function getLinkData(
  alias: string
): Promise<WithId<Document> | undefined> {
  const database = await connectToDatabase();
  const urlInfoCollection = database.collection("url-info");
  const cache = linkCacheData[alias];
  if (!!cache) {
    return cache;
  }
  const linkData = (linkCacheData[alias] =
    (await urlInfoCollection.findOne({
      alias,
    })) ?? undefined);
  if (!linkData) {
    return undefined;
  }
  return linkData;
}
