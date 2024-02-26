import { customAlphabet } from "nanoid";
import connectToDatabase from "@/app/utils/mongodb";
import { filterDifferentKeys } from "./filterDifferentKeys";
import { CreateLinkReturnData } from "../types/create-link";
import type { WithId, Document, Collection, Filter } from "mongodb";

enum COLLECTION_NAMES {
  "url-info" = "url-info",
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const getHash = customAlphabet(characters, 4);

export default async function createLink(
  props: FormData,
): Promise<CreateLinkReturnData> {
  try {
    const allowUpdate = Boolean(props.get("allow_update_url"));
    console.log({ allowUpdate });
    const link = props.get("url");
    const title = props.get("title");
    const description = props.get("description");
    const alias = props.get("alias");
    const database = await connectToDatabase();
    const urlInfoCollection = database.collection(COLLECTION_NAMES["url-info"]);
    const hash = alias ?? getHash();
    const shortUrl = `${process.env.HOST}/${hash}`;
    const payload = { link, title, description, alias, hash, shortUrl };
    let linkExists: WithId<Document> | undefined;
    if (!!alias) {
      linkExists = (await urlInfoCollection.findOne({ alias })) ?? undefined;
      if (!!linkExists && !allowUpdate) {
        return {
          status: "ERROR",
          error: "alias_exists",
        };
      }

      if (!!linkExists && allowUpdate) {
        return (await updateOne(payload, linkExists, urlInfoCollection, {
          alias,
        })) as CreateLinkReturnData;
      }
    }

    linkExists = (await urlInfoCollection.findOne({ link })) ?? undefined;

    if (!linkExists) {
      const created = await urlInfoCollection.insertOne({
        ...payload,
        createdAt: new Date(),
      });
      const rpayload = {
        data: {
          shortUrl: shortUrl,
          link: link as string,
          created: created.acknowledged,
          update: false,
        },
        status: "SUCCESS",
      } satisfies CreateLinkReturnData;
      return rpayload;
    } else {
      return (await updateOne(payload, linkExists, urlInfoCollection, {
        link,
      })) as CreateLinkReturnData;
    }
  } catch (e: any) {
    return {
      status: "ERROR",
      error: e.toString(),
    };
  }
}

const updateOne = async (
  payload: any,
  linkExists: any,
  urlInfoCollection: Collection<Document>,
  filter: Filter<Document>,
) => {
  const diffObj = filterDifferentKeys(payload, linkExists);
  if (Object.keys(diffObj).length) {
    const update = await urlInfoCollection.updateOne(filter, {
      $set: { ...diffObj, updatedAt: new Date() },
    });
    return {
      data: {
        shortUrl: payload.shortUrl,
        link: payload.link as string,
        created: false,
        update: update.acknowledged,
        ...diffObj,
      },
      status: "SUCCESS",
    };
  }

  return {
    data: {
      shortUrl: payload.shortUrl,
      link: payload.link as string,
      created: false,
      update: false,
    },
    status: "SUCCESS",
  };
};
