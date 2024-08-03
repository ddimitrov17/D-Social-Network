import { useEffect, useState } from 'react';
import EventSkeleton from '../Event/EventSkeleton';
import './rightPane.css'
import Spinner from '../../loadingSpinner/Spinner';

export default function RightPane() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events/all-events');
        const eventsData = await response.json();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="right-pane">
      <div className='popular-events-title'>Popular Events</div>
      <div className="catalog">
        {loading ? (
          <Spinner />
        ) : (
          events.map(currentEvent => (
            <EventSkeleton
              key={currentEvent._id}
              description={currentEvent.description}
              going={currentEvent.going.length}
              interested={currentEvent.interested.length}
              name={currentEvent.name}
              img={currentEvent?.img}
              creator={currentEvent.creator}
              location={currentEvent.location}
              date={currentEvent.date}
            />
          ))
        )}
      </div>
    </div>
  );
}


