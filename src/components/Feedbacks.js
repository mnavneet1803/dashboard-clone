import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { PiExportBold } from "react-icons/pi";
import { ToastContainer, toast,Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Feedbacks = () => {
  const feedbackData = [
    { id: 1, user: 'John Doe', feedback: 'Great service!', date: '2023-08-20' },
    { id: 2, user: 'Jane Smith', feedback: 'Could be improved.', date: '2023-08-21' },
    { id: 3, user: 'Sam Wilson', feedback: 'Very satisfied with the support.', date: '2023-08-22' },
  ];
  const [search, setSearch] = useState('');

  // Filter data based on search input
  const filteredData = feedbackData.filter(entry =>
    entry.user.toLowerCase().includes(search.toLowerCase()) ||
    entry.feedback.toLowerCase().includes(search.toLowerCase())
  );

  // Export function
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Feedback');
    XLSX.writeFile(wb, 'Feedback.xlsx');
    toast('File Exported SuccessFully');
  };

  return (
    <div className="container my-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
        <h2>User Feedbacks</h2>
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
        placeholder="Search by user or feedback"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.user}</td>
                <td>{feedback.feedback}</td>
                <td>{feedback.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedbacks;
