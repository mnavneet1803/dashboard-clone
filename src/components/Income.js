import React, { useState } from 'react';
import * as XLSX from 'xlsx';  // For exporting to Excel
import { PiExportBold } from "react-icons/pi";
import { ToastContainer, toast,Slide } from 'react-toastify';

const Income = () => {
    const [incomeData, setIncomeData] = useState([
        { id: 1, source: 'Salary', amount: 5000.00, date: '2023-08-01', description: 'Monthly salary', category: 'Regular' },
        { id: 2, source: 'Freelance', amount: 1200.00, date: '2023-08-15', description: 'Freelance work', category: 'Project-based' },
        { id: 3, source: 'Investment', amount: 300.00, date: '2023-08-20', description: 'Investment returns', category: 'Passive' },
    ]);

    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    // Filter data based on search input and category
    const filteredData = incomeData.filter(entry => {
        const isInCategory = categoryFilter === 'All' || entry.category === categoryFilter;
        return isInCategory &&
            (entry.description.toLowerCase().includes(search.toLowerCase()));
    });

    // Export function to Excel
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Income');
        XLSX.writeFile(wb, 'my_income.xlsx');
        toast('File Exported SuccessFully');
    };

    return (
        <div className="container my-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <h2>My Income</h2>
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
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Regular">Regular</option>
                    <option value="Project-based">Project-based</option>
                    <option value="Passive">Passive</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Source</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.source}</td>
                                <td>${entry.amount.toFixed(2)}</td>
                                <td>{entry.date}</td>
                                <td>{entry.description}</td>
                                <td>{entry.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Income;
