import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { Button, Snackbar } from "@mui/material";


export default function CustomerList() {
    // state variables
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);


    // columns for customers ag-grid
    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', filter: true },
        { field: 'postcode', filter: true },
        { field: 'city', filter: true },
        { field: 'email', filter: true },
        { field: 'phone', filter: true },
        {
            cellRenderer: params => <EditCustomer params={params.data} updateCustomer={updateCustomer} />,
            width: 150
        },
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>
        }
    ];

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData.content)
                setCustomers(responseData.content)
            })
            .catch(error => console.error(error));
    }

    const deleteCustomer = (params) => {
        console.log("params: " + params.data.links[0].href)
        if (window.confirm('Are you sure you want to delete?')) {
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Customer was deleted succesfully!');
                        setOpen(true);
                        getCustomers();
                    } else {
                        alert('Something went wrong in deleting the customer!')
                    }
                })
                .catch(err => console.error(err));
        }
    }

    const addCustomer = (customer) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer was added succesfully!')
                    getCustomers();
                } else {
                    alert('Something went wrong while adding a customer!');
                }
            })
            .catch(error => console.error(error));
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer info was updated succesfully!')
                    getCustomers();
                } else {
                    alert('Something went wrong while updating the customer info!');
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                ></Snackbar>
            </div>
        </>
    );
}