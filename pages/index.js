// our-domain.com
import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups App</title>
        <meta
          name="description"
          content="Browse a huge list of highly active meetups information"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

/*
// SSR concept
export async function getServerSideProps(context) {
  /**
   * code here executed for each input request
   * run in the serverside
   * useful for realtime database or data changes very frequently (multiple/s)
   */
/*
  const request = context.req;
  const response = context.res;

  // fetch data from API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}*/

// SSG concept
export async function getStaticProps() {
  /**
   * code here executed during the build process.
   * Not in the server as well as client side
   */

  // fetch data from API
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vj15y.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
    /**
     * here, "revalidate: 1" means every 1 seconds the page will be pre-generated
     * Not only in the build process but also after the deployment with the change of data
     * the page will be pre-generated / re pre-rendered.
     * the value (in second) depends on the frequency of data changing
     */
  };
}

export default HomePage;
