// TabsLayout.jsx
import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    // Add more tabs as needed
];

const TabsLayout = ({ children }) => {
    const location = useLocation();
    const currentTab = tabs.findIndex((tab) => tab.path === location.pathname);

    const handleChange = (event, newValue) => {
        // You can navigate to the selected tab using your routing mechanism
        // For example, using react-router-dom:
        // history.push(tabs[newValue].path);
    };

    return (
        <>
            <AppBar position="static">
                <Tabs value={currentTab} onChange={handleChange}>
                    {tabs.map((tab, index) => (
                        <Tab key={index} label={tab.label} component={Link} to={tab.path} />
                    ))}
                </Tabs>
            </AppBar>
            {children}
        </>
    );
};

export default TabsLayout;
