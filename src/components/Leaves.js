import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { PiExportBold } from "react-icons/pi";
import { ToastContainer, toast,Slide } from 'react-toastify';

const Leaves = () => {
    const leaveData = [
        { id: 1, employee: 'John Doe', type: 'Sick Leave', startDate: '2023-08-01', endDate: '2023-08-03', status: 'Approved' },
        { id: 2, employee: 'Jane Smith', type: 'Vacation', startDate: '2023-08-10', endDate: '2023-08-15', status: 'Pending' },
        { id: 3, employee: 'Sam Wilson', type: 'Personal Leave', startDate: '2023-08-20', endDate: '2023-08-22', status: 'Rejected' },
    ];

    const [search, setSearch] = useState('');

    // Filter data based on search input
    const filteredData = leaveData.filter(entry =>
        entry.employee.toLowerCase().includes(search.toLowerCase()) ||
        entry.type.toLowerCase().includes(search.toLowerCase())
    );

    // Export function
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(!search.length ? leaveData : filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Leaves');
        XLSX.writeFile(wb, 'Leaves.xlsx');
        toast('File Exported SuccessFully');
    };

    return (
        <div className="container my-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <h2>Employee Leaves</h2>
                <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition = {Slide}
                />
                <button
                    className="btn btn-dark"
                    onClick={handleExport}
                >
                    <PiExportBold style={{ marginRight: "8px", height: "18px", width: "18px" }} />
                    <b> Export to Excel</b>
                </button>
            </div>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search by employee or type"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Employee</th>
                            <th>Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(search.length ? filteredData : leaveData).map((leave) => (
                            <tr key={leave.id}>
                                <td>{leave.id}</td>
                                <td>{leave.employee}</td>
                                <td>{leave.type}</td>
                                <td>{leave.startDate}</td>
                                <td>{leave.endDate}</td>
                                <td style={{ color: leave.status === 'Approved' ? '#195828' : leave.status === 'Rejected' ? '#a11623' : '#b98d04' }}>
                                    {leave.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaves;
