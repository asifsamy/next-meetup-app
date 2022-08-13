import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "../ui/Modal";
import EditMeetupForm from "./editMeetupForm";
import classes from "./MyMeetups.module.css";

function MyMeetupItem(props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const deleteMeetup = async (meetupId) => {
    const response = await fetch(`/api/${meetupId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);

    // router.push("/manage-meetup");
    router.push(router.asPath);
    // fetch(`/api/${meetupId}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then(async (response) => {
    //   try {
    //     const data = await response.json();
    //     console.log("response data?", data);
    //   } catch (error) {
    //     console.log("Error happened here!");
    //     console.error(error);
    //   }
    // });
  };

  async function editMeetupHandler(updatedData, meetupId) {
    // console.log("id: ", meetupId);
    // console.log("data: ", updatedData);
    const response = await fetch(`/api/${meetupId}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    setShowModal(false);

    router.push(router.asPath);
  }

  const editMeetupModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className={classes.table}>
        <div className={classes.col}>{props.title}</div>
        <div className={classes.col}>{props.address}</div>
        <div className={classes.col}>
          <button type="button" onClick={() => deleteMeetup(props.id)}>
            delete
          </button>
          <button type="button" onClick={editMeetupModal}>
            Edit
          </button>
        </div>
      </div>
      {
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <EditMeetupForm
            meetupId={props.id}
            onEditMeetup={editMeetupHandler}
          />
        </Modal>
      }
    </>
  );
}

export default MyMeetupItem;
