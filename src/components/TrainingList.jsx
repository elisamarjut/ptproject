import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from "dayjs";
import 'dayjs/locale/fi';

export default function TrainingList() {
    // state variables
    const [trainings, setTrainings] = useState([]);

    // columns for training ag-grid
    const columns = [
        { field: 'date', sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'customer', sortable: true, filter: true }
    ];

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/trainings';

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData.content)
                const formattedTrainings = responseData.content.map(training => {
                    const formattedDate = dayjs(training.date).format('DD.MM.YYYY HH:mm');
                    return { ...training, date: formattedDate, }
                })

                setTrainings(formattedTrainings)
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            <div className="ag-theme-material" style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        </>
    )
}