import { useState } from 'react';
import './CreateEvent.css'
import { useNavigate } from 'react-router-dom';

export default function CreateEvent({ onClose }) {
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        img: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    async function createSubmitHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/events/create-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(event)
            });
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error();
            }
            onClose();
            navigate('/catalog');
        } catch (error) {
            console.error('There was a problem with the event Creation:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className='create-event'>
                <button className="close-button" onClick={onClose}>X</button>
                <form className='form' onSubmit={createSubmitHandler}>
                    <input name="name"
                        placeholder="Event Name"
                        className='input'
                        onChange={handleChange} />
                    <textarea className='textarea'
                        name="description"
                        placeholder="Event Description"
                        onChange={handleChange} />
                    <input name="date"
                        type="date"
                        className='input'
                        onChange={handleChange} />
                    <input name="location"
                        placeholder="Location"
                        type="text"
                        className='input'
                        onChange={handleChange} />
                    <input type="text"
                        className='image'
                        placeholder='Insert image link here...'
                        name='img'
                        onChange={handleChange} />
                    <button className='button'>Create Event</button>
                </form>
            </div>
        </div>
    );
};
