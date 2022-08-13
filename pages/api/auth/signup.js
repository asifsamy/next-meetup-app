import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    try {
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vj15y.mongodb.net/meetups?retryWrites=true&w=majority`
      );
      const db = client.db();

      const usersCollection = db.collection("users");
      const result = await usersCollection.insertOne(data); // data is an object

      console.log(result);

      client.close();

      res.status(201).json({ message: "User inserted!" });
    } catch (err) {
      console.log(err);
    }
  }
}

export default handler;
