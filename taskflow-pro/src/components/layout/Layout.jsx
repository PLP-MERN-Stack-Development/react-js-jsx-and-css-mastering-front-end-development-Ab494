import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, currentView, setCurrentView }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;