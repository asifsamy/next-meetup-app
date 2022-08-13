import Link from "next/link";
import { useState } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

function LoginForm(props) {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  function submitHandler(event) {
    event.preventDefault();

    props.onLogin(userInfo);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, email: target.value })
            }
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
          />
        </div>
        <div>
          New user? <Link href="/auth/signup">Signup</Link>
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
    </Card>
  );
}

export default LoginForm;
