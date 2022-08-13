import { signIn } from "next-auth/react";

import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import LoginForm from "../../components/meetups/LoginForm";
import { useEffect } from "react";

function Login() {
  const router = useRouter();

  async function loginHandler(user) {
    const response = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    if (response) {
      router.push("/");
    }
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
        <title>Login please!</title>
        <meta
          name="description"
          content="Please login to manage your meetups"
        />
      </Head>
      <LoginForm onLogin={loginHandler} />
    </>
  );
}

export default Login;
