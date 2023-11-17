import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";


export default function CustomerList() {
    // state variables
    const [customers, setCustomers] = useState([]);

    // columns for customers ag-grid
    const columns = [
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'streetaddress' },
        { field: 'postcode' },
        { field: 'city' },
        { field: 'email' },
        { field: 'phone' }
    ];

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData)

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