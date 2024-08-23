import React, { useState } from 'react';

const Settings = () => {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '',
        notifications: true,
        theme: 'light',
    });

    // Handle changes to profile settings
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Settings saved!');
    };

    return (
        <div className="container my-4">
            <h2 className="mb-4">Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={profile.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={profile.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="notifications"
                            name="notifications"
                            className="form-check-input"
                            checked={profile.notifications}
                            onChange={handleChange}
                        />
                        <label htmlFor="notifications" className="form-check-label">
                            Receive Notifications
                        </label>
                    </div>
                </div>

                <button className="btn btn-dark" type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;
