import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const { data: session, status } = useSession();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Meetups App</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
          {session && status !== "unauthenticated" && (
            <li>
              <Link href="/manage-meetup">Manage Meetups</Link>
            </li>
          )}
          {!session && status !== "authenticated" && (
            <li>
              <Link href="/auth/login">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Login
                </a>
              </Link>
            </li>
          )}
          {session && status !== "unauthenticated" && (
            <li>
              <Link href="/api/auth/signout">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Logout
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
