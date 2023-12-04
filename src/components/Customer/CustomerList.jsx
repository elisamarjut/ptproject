import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { Button, Snackbar } from "@mui/material";
import { CSVLink } from "react-csv";


export default function CustomerList() {
    // state variables
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);


    // columns for customers ag-grid
    // sorting and filtering
    const columns = [
        { field: 'firstname', sortable: true, filter: true, floatingFilter: true },
        { field: 'lastname', sortable: true, filter: true, floatingFilter: true },
        { field: 'streetaddress', headerName: 'Street address', sortable: true, filter: true, floatingFilter: true },
        { field: 'postcode', sortable: true, filter: true, floatingFilter: true },
        { field: 'city', sortable: true, filter: true, floatingFilter: true },
        { field: 'email', sortable: true, filter: true, floatingFilter: true },
        { field: 'phone', sortable: true, filter: true, floatingFilter: true },
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

    // REST API URL
    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    // Getting customer data
    const getCustomers = () => {
        // fetching customers from the REST API
        fetch(REST_URL)
            .then(response => response.json()) // extracting json data
            .then(responseData => {
                // logging responseData into the console
                console.log("responseData" + responseData.content);
                // setting appropiate data to the customers state variable
                setCustomers(responseData.content);
            })
            // error handling
            .catch(err => console.error(err));
    };

    // Getting the customers only after the first render
    useEffect(() => getCustomers(), []);

    // Deleting a customer
    const deleteCustomer = (params) => {
        console.log("params: " + params.data.links[0].href)
        // Confirming the deletion
        if (window.confirm('Are you sure you want to delete?')) {
            // Fetching customer to be deleted
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Customer was deleted succesfully!');
                        setOpen(true);
                        getCustomers();
                    } else {
                        alert('Something went wrong in deletion!');
                    }
                })
                // Error handling
                .catch(err => {
                    console.error('Error deleting customer:', err);
                    alert('Something went wrong in deleting the customer!');
                });
        }
    };

    // Adding a customer
    const addCustomer = (customer) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            // Converting customer data into a string
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer was added succesfully!');
                    getCustomers();
                } else {
                    alert('Something went wrong while adding a customer!');
                }
            })
            // Error handling
            .catch(err => {
                console.error('Error adding cutomer:', err);
                alert('Something went wrong in adding a customer!');
            });
    };

    // Updating/editing customer
    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer info was updated succesfully!');
                    getCustomers();
                } else {
                    alert('Something went wrong while updating the customer info!');
                }
            })
            // Error handling
            .catch(err => console.error(err));
    };

    // Headers for CSV export
    const headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Street address", key: "streetaddress" },
        { label: "Postcode", key: "postcode" },
        { label: "City", key: "city" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" }
    ];

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <br />
            <CSVLink
                filename={"Customer-data.csv"}
                data={customers}
                headers={headers}
                separator={";"}
            >
                Export to CSV
            </CSVLink>
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