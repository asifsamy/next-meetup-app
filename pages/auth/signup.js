import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import SignupForm from "../../components/meetups/SignupForm";
import { useEffect } from "react";

function Signup() {
  const router = useRouter();

  async function addUserHandler(userData) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.push("/auth/login");
  }

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (session) {
        router.replace("/");
      }
    };

    securePage();
  }, []);

  return (
    <>
      <Head>
        <title>Signup please!</title>
        <meta
          name="description"
          content="Please signup to manage your meetups"
        />
      </Head>
      <SignupForm onSignup={addUserHandler} />
    </>
  );
}

export default Signup;
