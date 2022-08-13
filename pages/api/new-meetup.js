// /api/ new-meetup
//POST /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body; // HTTP request has header, body, message

    try {
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vj15y.mongodb.net/meetups?retryWrites=true&w=majority`
      );
      const db = client.db();

      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data); // data is an object

      console.log(result);

      client.close();

      res.status(201).json({ message: "Meetup inserted!" });
    } catch (err) {
      console.log(err);
    }
  }
}

export default handler;
