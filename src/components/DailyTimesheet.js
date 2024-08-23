import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { PiExportBold } from "react-icons/pi";
import { ToastContainer, toast,Slide } from 'react-toastify';

const DailyTimesheet = () => {
    const [timesheetData, setTimesheetData] = useState([
        { id: 1, employee: 'John Doe', project: 'Website Redesign', startTime: '08:00 AM', endTime: '12:00 PM', hoursWorked: 4 },
        { id: 2, employee: 'Jane Smith', project: 'API Development', startTime: '09:00 AM', endTime: '05:00 PM', hoursWorked: 8 },
        { id: 3, employee: 'Sam Wilson', project: 'Database Migration', startTime: '10:00 AM', endTime: '03:00 PM', hoursWorked: 5 },
    ]);

    const [search, setSearch] = useState('');

    // Filter data based on search input
    const filteredData = timesheetData.filter(entry =>
        entry.project.toLowerCase().includes(search.toLowerCase()) ||
        entry.employee.toLowerCase().includes(search.toLowerCase())
    );

    // Export function
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(!search.length ? timesheetData : filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Timesheet');
        XLSX.writeFile(wb, 'timesheet.xlsx');
        toast('File Exported SuccessFully');
    };

    return (
        <div className="container my-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <h2>Daily Timesheet</h2>
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
                placeholder="Search by employee or project"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Employee</th>
                            <th>Project/Task</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Hours Worked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(search.length ? filteredData : timesheetData).map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.employee}</td>
                                <td>{entry.project}</td>
                                <td>{entry.startTime}</td>
                                <td>{entry.endTime}</td>
                                <td>{entry.hoursWorked}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailyTimesheet;
