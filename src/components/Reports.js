import React, { useState } from 'react';
import * as XLSX from 'xlsx';  // For exporting to Excel
import { PiExportBold } from "react-icons/pi";
import { ToastContainer, toast,Slide } from 'react-toastify';
const Reports = () => {
    const [reportData, setReportData] = useState([
        { id: 1, reportName: 'Monthly Sales', date: '2023-07-31', author: 'Alice Johnson', status: 'Completed' },
        { id: 2, reportName: 'Annual Revenue', date: '2023-08-15', author: 'Bob Lee', status: 'Not Started' },
        { id: 3, reportName: 'Employee Performance', date: '2023-08-20', author: 'Carol Smith', status: 'In Progress' },
    ]);

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Filter data based on search input and status
    const filteredData = reportData.filter(entry => {
        const isInStatus = statusFilter === 'All' || entry.status === statusFilter;
        return isInStatus &&
            (entry.reportName.toLowerCase().includes(search.toLowerCase()) ||
                entry.author.toLowerCase().includes(search.toLowerCase()));
    });

    // Export function to Excel
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Reports');
        XLSX.writeFile(wb, 'reports.xlsx');
        toast('File Exported SuccessFully');
    };

    return (
        <div className="container my-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <h2>Reports</h2>
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
                    placeholder="Search by report name or author"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="form-select mb-4"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Not Started">Not Started</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Report Name</th>
                            <th>Date</th>
                            <th>Author</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.reportName}</td>
                                <td>{entry.date}</td>
                                <td>{entry.author}</td>
                                <td style={{ color: entry.status === 'Completed' ? '#195828' : entry.status === 'Not Started' ? '#a11623' : '#b98d04' }}>
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

export default Reports;
