import { useEffect, useState } from 'react';
import EventSkeleton from '../Event/EventSkeleton';
import './rightPane.css';
import Spinner from '../../loadingSpinner/Spinner';
import { useSelector } from 'react-redux';

export default function RightPane() {
  const user = useSelector((state) => state.user.currentUser);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(false); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events/all-events');
        const eventsData = await response.json();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
    setUserStatus(true); 
  }, []);

  if (!userStatus) {
    return <Spinner />;
  }

  return (
    <div className="right-pane">
      <div className='popular-events-title'>Popular Events</div>
      <div className="catalog">
        {eventsLoading ? (
          <Spinner />
        ) : (
          events.map(currentEvent => (
            <EventSkeleton
              eventId={currentEvent._id.toString()}
              key={currentEvent._id}
              description={currentEvent.description}
              going={currentEvent.going.length}
              interested={currentEvent.interested.length}
              name={currentEvent.name}
              img={currentEvent.img}
              creator={currentEvent.creator}
              location={currentEvent.location}
              date={currentEvent.date}
              // alreadyGoing={currentEvent.going.includes(user._id)}
              // alreadyInterested={currentEvent.interested.includes(user._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
