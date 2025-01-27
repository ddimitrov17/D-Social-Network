import { useEffect, useState } from 'react';
import EventSkeleton from '../Event/EventSkeleton';
import './EventsCatalog.css';
import Spinner from '../../loadingSpinner/Spinner';
import { useSelector } from 'react-redux';

export default function EventsCatalog() {
    const user = useSelector((state) => state.user.currentUser);
    const [events, setEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);
    const [userStatus, setUserStatus] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/all-events`);
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
        <>
            <div className="events-catalog">
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
                        />
                    ))
                )}
            </div>
        </>
    );
}