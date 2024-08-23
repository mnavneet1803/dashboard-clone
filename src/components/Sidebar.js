import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import dashboardIcon from '../assets/icons/dashboard.png';
import feedbackIcon from '../assets/icons/feedback.png';
import leaveIcon from '../assets/icons/leave.png';
import attendanceIcon from '../assets/icons/attendance.png';
import timesheetIcon from '../assets/icons/timesheet.png';
import workIcon from '../assets/icons/work.png';
import ReimbursementsIcon from '../assets/icons/Reimbursements.png';
import ReportIcon from '../assets/icons/report.png';
import ExpenseIcon from '../assets/icons/expense.webp';
import IncomeIcon from '../assets/icons/Income.png';
import CategoryIcon from '../assets/icons/category.png';
import SettingIcon from '../assets/icons/setting.png';
import Logo from '../assets/logo.png'
const Sidebar = ({ menuItems }) => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  const iconObj = {
    dashboard: dashboardIcon,
    feedbacks: feedbackIcon,
    leaves: leaveIcon,
    attendance: attendanceIcon,
    "daily-timesheet": timesheetIcon,
    "work-log": workIcon,
    reimbursements: ReimbursementsIcon,
    reports: ReportIcon,
    "my-expenses": ExpenseIcon,
    income: IncomeIcon,
    categories: CategoryIcon,
    settings: SettingIcon
  };

  const activeIndex = menuItems.findIndex(item => `/${item.route}` === location.pathname);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 768);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getLinkStyle = (index) => ({
    borderRadius: 6,
    backgroundColor: index === activeIndex || hoveredIndex === index ? "#e7e7e7" : 'white',
    color: index === activeIndex || hoveredIndex === index ? "#0b0f12" : '#646464',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isLargeScreen ? 'flex-start' : 'center', // Center icons on smaller screens
    padding: isLargeScreen ? '10px 15px' : '10px 0', // Adjust padding for small screens
    fontSize: isLargeScreen ? '16px' : '0px', // Hide text on smaller screens
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transition: 'background-color 0.3s, color 0.3s',
  });

  return (
    <div
      className="d-flex flex-column vh-100 p-3 border-end sidebar"
      style={{
        minWidth: isLargeScreen ? '250px' : '80px', // Narrow width for small screens
        maxWidth: isLargeScreen ? '350px' : '80px', // Narrow max width for small screens
        flexShrink: 0,
        transition: 'min-width 0.3s, max-width 0.3s',
      }}
    >
      {isLargeScreen && (
        <div className="mb-1">
          <img src={Logo} height="30px" width="200px"/>
          {/* <h4 style={{ fontSize: isLargeScreen ? '20px' : '16px' }}>My Options</h4> Title visible only on large screens */}
        </div>
      )}
      <ul className="nav flex-column">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item mb-2">
            <Link
              to={`/${item.route}`}
              className="nav-link"
              style={getLinkStyle(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img 
                src={iconObj[item.route]} 
                height={isLargeScreen ? '32px' : '28px'} 
                alt={item.name} 
                className="me-2" 
                style={{ marginRight: isLargeScreen ? '10px' : '0px' }} // Adjust margin for small screens
              />
              {isLargeScreen && <span>{item.name}</span>} {/* Text visible only on large screens */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
