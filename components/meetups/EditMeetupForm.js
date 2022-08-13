import { useEffect, useRef, useState } from "react";
import classes from "./EditMeetupForm.module.css";

function EditMeetupForm(props) {
  //   const [meetup, setMeetup] = useState({});
  const { meetupId } = props;

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    const meetupData = {
      title,
      image,
      address,
      description,
    };
    // console.log(meetupData);

    props.onEditMeetup(meetupData, meetupId);
  };

  useEffect(() => {
    const getMeetupById = async () => {
      const response = await fetch(`/api/${meetupId}`, {
        method: "GET",
      });
      const data = await response.json();
      //   setMeetup(data);
      //   console.log("Meetup:", meetup);
      setTitle(data.title);
      setImage(data.image);
      setAddress(data.address);
      setDescription(data.description);
    };
    getMeetupById();
  }, [meetupId]);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Meetup Title</label>
        <input
          type="text"
          required
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          //   defaultValue={meetup.title}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="image">Meetup Image</label>
        <input
          type="url"
          required
          id="image"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          //   defaultValue={meetup.image}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          required
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          //   defaultValue={meetup.address}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          required
          rows="5"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button>Update Meetup</button>
      </div>
    </form>
  );
}

export default EditMeetupForm;
