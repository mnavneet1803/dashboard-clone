import React, { useState } from 'react';
import * as XLSX from 'xlsx';  // For exporting to Excel
import { PiExportBold } from "react-icons/pi";
import { ToastContainer, toast,Slide } from 'react-toastify';

const MyExpenses = () => {
    const [expenseData, setExpenseData] = useState([
        { id: 1, expenseType: 'Travel', amount: 150.00, date: '2023-08-01', description: 'Flight to NYC', status: 'Approved' },
        { id: 2, expenseType: 'Office Supplies', amount: 75.00, date: '2023-08-02', description: 'Stationery purchase', status: 'Pending' },
        { id: 3, expenseType: 'Meals', amount: 50.00, date: '2023-08-03', description: 'Lunch with client', status: 'Rejected' },
    ]);

    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');

    // Filter data based on search input and type
    const filteredData = expenseData.filter(entry => {
        const isInType = typeFilter === 'All' || entry.expenseType === typeFilter;
        return isInType &&
            (entry.description.toLowerCase().includes(search.toLowerCase()));
    });

    // Export function to Excel
    const handleExport = () => {
        toast('File Exported SuccessFully');
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Expenses');
        XLSX.writeFile(wb, 'my_expenses.xlsx');
    };

    return (
        <div className="container my-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <h2>My Expenses</h2>
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
                    placeholder="Search by description"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="form-select mb-4"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="All">All Types</option>
                    <option value="Travel">Travel</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Meals">Meals</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Expense Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.expenseType}</td>
                                <td>${entry.amount.toFixed(2)}</td>
                                <td>{entry.date}</td>
                                <td>{entry.description}</td>
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

export default MyExpenses;
