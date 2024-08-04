import React, { useEffect, useState } from 'react';
import './EventSkeleton.css';
import { dateSVG, goingSVG, interestedSVG, locationSVG, nameSVG } from './eventSVG';
import { useSelector } from 'react-redux';

export default function EventSkeleton({
    eventId,
    name,
    description,
    img,
    date,
    location,
    going: initialGoing,
    interested: initialInterested,
}) {
    const user = useSelector((state) => state.user.currentUser);
    const [going, setGoing] = useState(initialGoing);
    const [interested, setInterested] = useState(initialInterested);
    const [alreadyGoing, setAlreadyGoing] = useState(false);
    const [alreadyInterested, setAlreadyInterested] = useState(false);

    useEffect(() => {
        async function fetchEventStatus() {
            try {
                const response = await fetch(`http://localhost:5000/api/events/event-status/${eventId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch event status');
                }

                const { going: goingStatus, interested: interestedStatus } = await response.json();
                console.log(goingStatus, interestedStatus)
                setAlreadyGoing(goingStatus);
                setAlreadyInterested(interestedStatus);
            } catch (error) {
                console.error('Error fetching eveny status:', error);
            }
        }

        fetchEventStatus();
    }, [eventId]);

    async function handleGoingClick(e) {
        e.preventDefault();
        if (!eventId) {
            throw new Error('Event ID is missing.');
        }
        try {
            const response = await fetch(`http://localhost:5000/api/events/going/${eventId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(),
            });

            if (!response.ok) {
                throw new Error('Failed to update going status');
            }

            const { event } = await response.json();
            setGoing(going + 1);
            setAlreadyGoing(true);
            console.log('Event going successfully!');
        } catch (error) {
            console.error('There was a problem with the going functionality:', error);
        }
    }

    async function handleInterestedClick(e) {
        e.preventDefault();
        if (!eventId) {
            throw new Error('Event ID is missing.');
        }
        try {
            const response = await fetch(`http://localhost:5000/api/events/interested/${eventId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(),
            });

            if (!response.ok) {
                throw new Error('Failed to update interested status');
            }

            const { event } = await response.json();
            setInterested(interested + 1);
            setAlreadyInterested(true);
            console.log('Event interested successfully!');
        } catch (error) {
            console.error('There was a problem with the interested functionality:', error);
        }
    }

    return (
        <div className="event-skeleton">
            <div className="event-image">
                <img src={img} alt="Event" />
            </div>
            <div className="event-information">
                <div className="event-name">{nameSVG}{name}</div>
                <div className="event-date">{dateSVG}{date.slice(0, 10)}</div>
                <div className="event-location">{locationSVG}{location}</div>
                <div className="going-count">{goingSVG}{going} are going</div>
                <div className="interested-count">{interestedSVG}{interested} are interested in this event</div>
            </div>
            {user && (
                <div className='event-functionality'>
                    {(!alreadyGoing && !alreadyInterested) ? (
                        <>
                            <button className='functionalities-going' onClick={handleGoingClick}>Going</button>
                            <button className='functionalities-interested' onClick={handleInterestedClick}>Interested</button>
                        </>
                    ) : (
                        <div className='already-responded'>You already responded to this event!</div>
                    )}
                </div>
            )}
        </div>
    );
}
