import React, { useState } from 'react';
import * as XLSX from 'xlsx';  // For exporting to Excel
import { PiExportBold } from "react-icons/pi";
import { ToastContainer, toast,Slide } from 'react-toastify';

const Categories = () => {
    const [categoryData, setCategoryData] = useState([
        { id: 1, categoryName: 'Travel', description: 'Expenses related to travel', budget: 1500.00, spent: 1200.00 },
        { id: 2, categoryName: 'Office Supplies', description: 'Expenses for office supplies', budget: 500.00, spent: 450.00 },
        { id: 3, categoryName: 'Meals', description: 'Food and dining expenses', budget: 300.00, spent: 275.00 },
    ]);

    const [search, setSearch] = useState('');

    // Filter data based on search input
    const filteredData = categoryData.filter(entry =>
        entry.categoryName.toLowerCase().includes(search.toLowerCase()) ||
        entry.description.toLowerCase().includes(search.toLowerCase())
    );

    // Export function
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Categories');
        XLSX.writeFile(wb, 'categories.xlsx');
        toast('File Exported SuccessFully');
    };

    return (
        <div className="container my-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <h2>Categories</h2>
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
                    className="form-control"
                    placeholder="Search by category name or description"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Budget</th>
                            <th>Spent</th>
                            <th>Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.categoryName}</td>
                                <td>{entry.description}</td>
                                <td>${entry.budget.toFixed(2)}</td>
                                <td>${entry.spent.toFixed(2)}</td>
                                <td>${(entry.budget - entry.spent).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;
