import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react"
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from "dayjs";
// import 'dayjs/locale/fi';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


export default function AddTraining(props) {
    // states
    const [training, setTraining] = useState({ date: '', duration: '', activity: '', customer: '' });
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false); // is dialog open?

    const CUSTOMERS_URL = 'https://traineeapp.azurewebsites.net/getcustomers';

    // fetch customers
    useEffect(() => {
        fetch(CUSTOMERS_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData: " + responseData);
                setCustomers(responseData);
            })
            .catch(error => { console.log(error) })
    }, []);

    // functions

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false); // suljetaan dialogi
    }

    const changeDate = (newDate) => {
        setTraining({ ...training, date: newDate })
    }

    // return
    // addbutton
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained" style={{ margin: 10 }}>New Training</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date"
                            name="date"
                            format="DD.MM.YYYY HH:mm"
                            value={training.date}
                            onChange={changeDate}
                        />
                    </LocalizationProvider>
                    <br />
                    <TextField
                        margin="dense"
                        label="Duration in minutes"
                        name="duration"
                        value={training.duration}
                        onChange={handleInputChanged}
                    ></TextField>
                    <br />
                    <TextField
                        margin="dense"
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={handleInputChanged}
                    ></TextField>
                    <br />
                    <TextField
                        margin="dense"
                        select
                        label="Customer"
                        name="customer"
                        value={training.customer}
                        onChange={handleInputChanged}
                        helperText="Please select customer"
                    >
                        {customers.map(customer => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {`${customer.firstname} ${customer.lastname}`}
                            </MenuItem>
                        ))}

                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}>Close</Button>
                    <Button
                        onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}