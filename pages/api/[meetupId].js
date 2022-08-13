import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  const { meetupId } = req.query;

  if (req.method === "GET") {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vj15y.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const selectedMeetup = await meetupsCollection.findOne({
      _id: ObjectId(meetupId),
    });

    client.close();

    res.status(200).json(selectedMeetup);
  } else if (req.method === "DELETE") {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vj15y.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.deleteOne({
      _id: ObjectId(meetupId),
    });

    client.close();

    res.status(200).json(result);
  } else if (req.method === "PUT") {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vj15y.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.updateOne(
      {
        _id: ObjectId(meetupId),
      },
      {
        $set: req.body,
      }
    );

    client.close();

    res.status(200).json(result);
  }
}

export default handler;
