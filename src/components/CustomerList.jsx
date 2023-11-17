import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';


export default function CustomerList() {
    // state variables
    const [customers, setCustomers] = useState([]);

    // columns for customers ag-grid
    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', filter: true },
        { field: 'phone', filter: true }
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

    return (
        <>
            <div className="ag-theme-material" style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        </>
    );
}