import Link from "next/link";
import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

function SignupForm(props) {
  const fNameInputRef = useRef();
  const lNameInputRef = useRef();
  const emailInputRef = useRef();
  const passInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredFName = fNameInputRef.current.value;
    const enteredLName = lNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;

    const userData = {
      firstName: enteredFName,
      lastName: enteredLName,
      email: enteredEmail,
      password: enteredPass,
    };

    props.onSignup(userData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="first_name">First Name</label>
          <input type="text" required id="first_name" ref={fNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="last_name">Last Name</label>
          <input type="text" required id="last_name" ref={lNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="title">Email</label>
          <input type="text" required id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Password</label>
          <input type="password" required id="password" ref={passInputRef} />
        </div>
        <div>
          Already a user? <Link href="/auth/login">Login</Link>
        </div>
        <div className={classes.actions}>
          <button>Signup</button>
        </div>
      </form>
    </Card>
  );
}

export default SignupForm;
