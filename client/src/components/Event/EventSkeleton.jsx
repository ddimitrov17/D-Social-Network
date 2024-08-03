import React from 'react';
import './EventSkeleton.css';
import { dateSVG, goingSVG, interestedSVG, locationSVG, nameSVG } from './eventSVG';

export default function EventSkeleton({ name, description, img, date, location, going, interested }) {
    return (
        <div className="event-skeleton">
            <div className='event-image'>
                <img src={img} alt="Event" />
            </div>
            <div className='event-information'>
                <div className='event-name'>{nameSVG}{name}</div>
                <div className='event-date'>{dateSVG}{date.slice(0, 10)}</div>
                <div className='event-location'>{locationSVG}{location}</div>
                <div className='going-count'>{goingSVG}{going} people are going</div>
                <div className='interested-count'>{interestedSVG}{interested} are interested in this event</div>
            </div>
            <div className='event-functionality'>
                <button className='functionalities-going'>Going</button>
                <button className='functionalities-interested'>Interested</button>
            </div>
        </div>
    );
}
