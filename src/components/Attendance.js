import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { PiExportBold } from "react-icons/pi";
import { ToastContainer, toast,Slide } from 'react-toastify';

const Attendance = () => {
    const attendanceData = [
        { id: 1, employee: 'John Doe', date: '2023-08-01', status: 'Present', checkIn: '09:00 AM', checkOut: '05:00 PM' },
        { id: 2, employee: 'Jane Smith', date: '2023-08-01', status: 'Absent', checkIn: '-', checkOut: '-' },
        { id: 3, employee: 'Sam Wilson', date: '2023-08-01', status: 'Present', checkIn: '09:15 AM', checkOut: '05:10 PM' },
    ];
    
    const [search, setSearch] = useState('');

    // Filter data based on search input
    const filteredData = attendanceData.filter(entry =>
        entry.employee.toLowerCase().includes(search.toLowerCase()) ||
        entry.date.toLowerCase().includes(search.toLowerCase())
    );

    // Export function
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(!search.length ? attendanceData : filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
        XLSX.writeFile(wb, 'attendance.xlsx');
        toast('File Exported SuccessFully');
    };

    return (
        <div className="container my-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <h2>Employee Attendance</h2>
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
                placeholder="Search by employee or date"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Check-In Time</th>
                            <th>Check-Out Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(search.length ? filteredData : attendanceData).map((attendance) => (
                            <tr key={attendance.id}>
                                <td>{attendance.id}</td>
                                <td>{attendance.employee}</td>
                                <td>{attendance.date}</td>
                                <td>{attendance.status}</td>
                                <td>{attendance.checkIn}</td>
                                <td>{attendance.checkOut}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;
