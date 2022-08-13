// our-domain.com/manage-meetup

import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
import MyMeetups from "../../components/meetups/MyMeetups";

function ManageMeetup({ meetups }) {
  return (
    <Fragment>
      <Head>
        <title>Meetups App</title>
        <meta name="description" content="Manage your meetup content" />
      </Head>
      <MyMeetups myMeetups={meetups} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=http://localhost:3000/manage-meetup`,
        permanent: false,
      },
    };
  } else {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vj15y.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    //   const meetups = await meetupsCollection.find().toArray();

    const meetups = await meetupsCollection
      .find({ userId: session.user.id })
      .toArray();

    client.close();

    return {
      props: {
        meetups: meetups.map((meetup) => ({
          title: meetup.title,
          address: meetup.address,
          id: meetup._id.toString(),
        })),
      },
    };
  }
}

export default ManageMeetup;
