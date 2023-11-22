import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react"


export default function EditCustomer(props) {
    // states
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', email: '' });
    const [open, setOpen] = useState(false); // is dialog open?

    // functions
    const handleClickOpen = () => {
        console.log(props.params);
        setCustomer({ firstname: props.params.firstname, lastname: props.params.lastname, email: props.params.email })
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleUpdate = () => {
        props.updateCustomer(customer, props.params.links[0].href);
        setOpen(false); // suljetaan dialogi
    }

    // return
    // editbutton
    return (
        <>
            <Button onClick={handleClickOpen} variant="text">Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
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
                        onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}