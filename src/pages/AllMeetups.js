import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

const AllMeetups = () => {
  const [loading, setLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch(
      "https://react-getting-started-b8811-default-rtdb.firebaseio.com/meetups.json"
    )
      .then((response) => response.json())
      .then((data) => {
        // setLoadedMeetups expects an array therefore we can't save 'data' to state. Data is an obj
        // so we create an empty array and loop through the data, create an obj var.
        // Then push the new obj into that new array var. After, we set state to that new array
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };

          meetups.push(meetup);
        }

        setLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (loading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
};

export default AllMeetups;
