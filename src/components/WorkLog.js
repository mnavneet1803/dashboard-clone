import React, { useState } from 'react';
import * as XLSX from 'xlsx';  // For exporting to Excel
import { PiExportBold } from "react-icons/pi";
import { ToastContainer, toast,Slide } from 'react-toastify';

const WorkLog = () => {
    const [workLogData, setWorkLogData] = useState([
        { id: 1, employee: 'John Doe', task: 'Fix bugs in website', date: '2024-08-01', hoursWorked: 3 },
        { id: 2, employee: 'Jane Smith', task: 'Develop new feature', date: '2024-08-10', hoursWorked: 6 },
        { id: 3, employee: 'Sam Wilson', task: 'Code review', date: '2024-08-20', hoursWorked: 2 },
    ]);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredData = workLogData.filter(entry => {
        const entryDate = new Date(entry.date);
        const isInDateRange = (!startDate || entryDate >= new Date(startDate)) &&
            (!endDate || entryDate <= new Date(endDate));
        return isInDateRange &&
            (entry.task.toLowerCase().includes(search.toLowerCase()) ||
                entry.employee.toLowerCase().includes(search.toLowerCase()));
    });

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'WorkLog');
        XLSX.writeFile(wb, 'worklog.xlsx');
        toast('File Exported SuccessFully');
    };

    return (
        <div className="container my-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <h2>Work Log</h2>
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
                    placeholder="Search by employee or task"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="d-flex flex-wrap">
                    <input
                        type="date"
                        className="form-control mb-2 me-2"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        className="form-control mb-4"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Employee</th>
                            <th>Task</th>
                            <th>Date</th>
                            <th>Hours Worked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.employee}</td>
                                <td>{entry.task}</td>
                                <td>{entry.date}</td>
                                <td>{entry.hoursWorked}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkLog;
