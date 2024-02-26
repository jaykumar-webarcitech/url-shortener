import connectToDatabase from "./mongodb";

export default async function getAllAliases() {
  const database = await connectToDatabase();
  const urlInfoCollection = database.collection("url-info");
  const aliases = await urlInfoCollection.find({}).toArray();
  return aliases;
}
