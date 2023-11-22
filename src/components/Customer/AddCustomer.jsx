import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react"


export default function AddCustomer(props) {
    // states
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', email: '' });
    const [open, setOpen] = useState(false); // is dialog open?

    // functions
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false); // suljetaan dialogi
    }

    // return
    // addbutton
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained" style={{ margin: 10 }}>New Customer</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInputChanged}
                    ></TextField>
                    <br />
                    <TextField
                        margin="dense"
                        label="Lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInputChanged}
                    ></TextField>
                    <br />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChanged}
                    ></TextField>
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