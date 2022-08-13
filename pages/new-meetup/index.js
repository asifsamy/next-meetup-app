// our-domain.com/new-meetup

import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { getSession } from "next-auth/react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage({ session }) {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify({
        title: enteredMeetupData.title,
        image: enteredMeetupData.image,
        address: enteredMeetupData.address,
        description: enteredMeetupData.description,
        userId: session.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups andd create amazing networking oppertunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${window.location.origin}/new-meetup`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
