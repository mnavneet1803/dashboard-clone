import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Import the components that correspond to routes
import Dashboard from './components/Dashboard';
import Feedbacks from './components/Feedbacks';
import Leaves from './components/Leaves';
import Attendance from './components/Attendance';
import DailyTimesheet from './components/DailyTimesheet';
import WorkLog from './components/WorkLog';
import Reimbursements from './components/Reimbursements';
import Reports from './components/Reports';
import MyExpenses from './components/MyExpenses';
import Income from './components/Income';
import Categories from './components/Categories';
import Settings from './components/Settings';

const App = () => {
  // menu items and their corresponding components here...
  const menuItems = [
    { name: 'Dashboard', route: 'dashboard', component: Dashboard },
    { name: 'Feedbacks', route: 'feedbacks', component: Feedbacks },
    { name: 'Leaves', route: 'leaves', component: Leaves },
    { name: 'Attendance', route: 'attendance', component: Attendance },
    { name: 'DailyTimesheet', route: 'daily-timesheet', component: DailyTimesheet },
    { name: 'WorkLog', route: 'work-log', component: WorkLog },
    { name: 'Reimbursements', route: 'reimbursements', component: Reimbursements },
    { name: 'Reports', route: 'reports', component: Reports },
    { name: 'MyExpenses', route: 'my-expenses', component: MyExpenses },
    { name: 'Income', route: 'income', component: Income },
    { name: 'Categories', route: 'categories', component: Categories },
    { name: 'Settings', route: 'settings', component: Settings },
  ];

  return (
    <Router>
      <div className="d-flex">
        <Sidebar menuItems={menuItems} />
        <div className="flex-grow-1 container-sm container-md container-lg">
          <Header />
          <div className="p-4">
            <Routes>
              {menuItems.map((item) => (
                <Route key={item.route} path={`/${item.route}`} element={<item.component />} />
              ))}
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
