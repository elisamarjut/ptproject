import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useState, useEffect } from 'react';
import dayjs from "dayjs";


export default function TrainingCalendar() {
    // states
    const [events, setEvents] = useState([]);

    // functions
    const localizer = momentLocalizer(moment)

    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';


    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData)
                const formattedEvents = responseData.map(training => ({
                    ...training,
                    id: training.id,
                    title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                    start: dayjs(training.date).toDate(),
                    end: dayjs(training.date).add(training.duration, 'minutes').toDate(),
                }));

                setEvents(formattedEvents)
            })
            .catch(error => console.error(error))
    };

    useEffect(() => getTrainings(), []);


    // return
    return (
        <>
            <div>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                >
                </Calendar>
            </div>
        </>
    );
}