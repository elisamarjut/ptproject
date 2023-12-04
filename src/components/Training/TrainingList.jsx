import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from "dayjs";
// import 'dayjs/locale/fi';
import AddTraining from "./AddTraining";
import { Button, Snackbar } from "@mui/material";

export default function TrainingList() {
    // state variables
    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    // columns for training ag-grid
    const columns = [
        { field: 'date', sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'customer.firstname', headerName: "Customer's firstname", sortable: true, filter: true },
        { field: 'customer.lastname', headerName: "Customer's lastname", sortable: true, filter: true },
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteTraining(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ];

    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData);
                const formattedTrainings = responseData.map(training => {
                    const formattedDate = dayjs(training.date).format('DD.MM.YYYY HH:mm');
                    return { ...training, date: formattedDate };
                });

                setTrainings(formattedTrainings);
            })
            .catch(error => console.error(error));
    };


    const deleteTraining = (params) => {
        const deleteURL = `https://traineeapp.azurewebsites.net/api/trainings/${params.data.id}`;
        console.log("params: " + params.data.id);

        if (window.confirm('Are you sure you want to delete?')) {
            fetch(deleteURL, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Training was deleted succesfully!');
                        setOpen(true);
                        getTrainings();
                    } else {
                        alert('Something went wrong in deletion!');
                    }
                })
                .catch(err => {
                    console.error('Error deleting training:', err);
                    alert('Something went wrong while deleting the training!');
                });
        }
    };

    const ADD_TRAINING_URL = 'https://traineeapp.azurewebsites.net/api/trainings';

    const addTraining = (training) => {
        fetch(ADD_TRAINING_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                date: dayjs(training.date).toISOString(),
                duration: training.duration,
                activity: training.activity,
                customer: `https://traineeapp.azurewebsites.net/api/customers/${training.customer}`
            })
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Training was added succesfully!');
                    getTrainings();
                } else {
                    alert('Something went wrong while adding a new training!');
                }
            })
            .catch(err => {
                console.error('Error adding trainings:', err);
                alert('Something went wrong while adding a new training!');
            });
    };

    return (
        <>
            <AddTraining addTraining={addTraining} />
            <div className="ag-theme-material" style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}>
                </Snackbar>
            </div>
        </>
    );
}