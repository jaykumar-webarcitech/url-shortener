import type { WithId, Document } from "mongodb";
import { COLLECTION_NAMES } from "./create-link";
import connectToDatabase from "./mongodb";

let linkCacheData: Record<string, WithId<Document> | null> = {};

export default async function getLinkData(
  alias: string
): Promise<WithId<Document> | null> {
  const database = await connectToDatabase();
  const urlInfoCollection = database.collection(COLLECTION_NAMES["url-info"]);
  const cache = linkCacheData[alias];
  if (!!cache) {
    return cache;
  }
  const linkData = (linkCacheData[alias] = await urlInfoCollection.findOne({
    alias,
  }));
  if (!linkData) {
    return null;
  }
  return linkData;
}
