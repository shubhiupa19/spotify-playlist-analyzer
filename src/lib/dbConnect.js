import moongoose from "mongoose";

export default async function dbConnect() {
  const uri = process.env.MONGO_URI;
  await moongoose.connect(uri);
}
