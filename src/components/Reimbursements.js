import React, { useState } from 'react';
import * as XLSX from 'xlsx';  // For exporting to Excel
import { PiExportBold } from "react-icons/pi";
import { ToastContainer, toast,Slide } from 'react-toastify';

const Reimbursements = () => {
    const [reimbursementData, setReimbursementData] = useState([
        { id: 1, employee: 'John Doe', expenseType: 'Travel', amount: 150.00, date: '2023-08-01', status: 'Approved' },
        { id: 2, employee: 'Jane Smith', expenseType: 'Office Supplies', amount: 75.00, date: '2023-08-02', status: 'Pending' },
        { id: 3, employee: 'Sam Wilson', expenseType: 'Meals', amount: 50.00, date: '2023-08-03', status: 'Rejected' },
    ]);

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Filter data based on search input and status
    const filteredData = reimbursementData.filter(entry => {
        const isInStatus = statusFilter === 'All' || entry.status === statusFilter;
        return isInStatus &&
            (entry.employee.toLowerCase().includes(search.toLowerCase()) ||
                entry.expenseType.toLowerCase().includes(search.toLowerCase()));
    });

    // Export function to Excel
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Reimbursements');
        XLSX.writeFile(wb, 'reimbursements.xlsx');
        toast('File Exported SuccessFully');
    };

    return (
        <div className="container my-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <h2>Reimbursements</h2>
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
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Search by employee or expense type"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="form-select mb-4"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Employee</th>
                            <th>Expense Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.employee}</td>
                                <td>{entry.expenseType}</td>
                                <td>${entry.amount.toFixed(2)}</td>
                                <td>{entry.date}</td>
                                <td style={{ color: entry.status === 'Approved' ? '#195828' : entry.status === 'Rejected' ? '#a11623' : '#b98d04' }}>
                                    {entry.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reimbursements;
