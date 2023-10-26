import { customAlphabet } from "nanoid";
import connectToDatabase from "@/app/utils/mongodb";
import { filterDifferentKeys } from "./filterDifferentKeys";
import { CreateLinkReturnData } from "../types/create-link";
import type { WithId, Document } from "mongodb";

export enum COLLECTION_NAMES {
  "url-info" = "url-info",
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const getHash = customAlphabet(characters, 4);

export default async function createLink(
  props: FormData
): Promise<CreateLinkReturnData> {
  try {
    const link = props.get("url");
    const title = props.get("title");
    const description = props.get("description");
    const alias = props.get("alias");
    const database = await connectToDatabase();
    const urlInfoCollection = database.collection(COLLECTION_NAMES["url-info"]);
    let linkExists: WithId<Document> | null;
    if (!!alias) {
      linkExists = await urlInfoCollection.findOne({ alias });
      if (!!linkExists) {
        return {
          data: null,
          status: "ERROR",
          error: "alias_exists",
        };
      }
    } else {
      linkExists = await urlInfoCollection.findOne({ link });
    }

    const hash = alias ?? getHash();
    const shortUrl = `${process.env.HOST}/${hash}`;
    const payload = { link, title, description, alias, hash, shortUrl };
    if (!linkExists) {
      const created = await urlInfoCollection.insertOne({
        ...payload,
        createdAt: new Date(),
      });
      return {
        data: {
          shortUrl: shortUrl,
          link,
          created: created.acknowledged,
          update: false,
        },
        status: "SUCCESS",
      };
    } else {
      const diffObj = filterDifferentKeys(payload, linkExists);
      if (Object.keys(diffObj).length) {
        const update = await urlInfoCollection.updateOne(
          {
            link,
          },
          {
            $set: {
              ...diffObj,
              updatedAt: new Date(),
            },
          }
        );
        return {
          data: {
            shortUrl: linkExists?.shortUrl || shortUrl,
            link,
            created: false,
            update: update.acknowledged,
            ...diffObj,
          },
          status: "SUCCESS",
        };
      }
    }

    return {
      data: {
        shortUrl: linkExists?.shortUrl || shortUrl,
        link,
        created: !linkExists,
        update: false,
      },
      status: "SUCCESS",
    };
  } catch (e: any) {
    return {
      data: null,
      status: "ERROR",
      error: e,
    };
  }
}
