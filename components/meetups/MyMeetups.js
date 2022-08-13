import classes from "./MyMeetups.module.css";
import MyMeetupItem from "./MyMeetupItem";

function MyMeetups({ myMeetups }) {
  return (
    <section className={classes.container}>
      <div>
        <div className={classes.table}>
          <div>Title</div>
          <div>Address</div>
          <div>Actions</div>
        </div>
        {myMeetups.map((meetup) => (
          <MyMeetupItem
            key={meetup.id}
            id={meetup.id}
            title={meetup.title}
            address={meetup.address}
          />
        ))}
      </div>
    </section>
  );
}

export default MyMeetups;
