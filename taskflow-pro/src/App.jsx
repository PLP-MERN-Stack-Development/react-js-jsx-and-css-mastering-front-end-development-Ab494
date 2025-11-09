import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/layout/Layout';
import TaskManager from './pages/TaskManager';
import UserDirectory from './pages/UserDirectory';
import Analytics from './pages/Analytics';

function App() {
  const [currentView, setCurrentView] = useState('tasks');

  const renderView = () => {
    switch (currentView) {
      case 'tasks':
        return <TaskManager />;
      case 'users':
        return <UserDirectory />;
      case 'analytics':
        return <Analytics />;
      default:
        return <TaskManager />;
    }
  };

  return (
    <ThemeProvider>
      <TaskProvider>
        <Layout currentView={currentView} setCurrentView={setCurrentView}>
          <div className="animate-fade-in">
            {renderView()}
          </div>
        </Layout>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;