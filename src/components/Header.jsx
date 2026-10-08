import { useEffect, useState } from 'react';
import taskService from '../services/taskService';

function Header() {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    let cancelled = false;

    const checkHealth = async () => {
      try {
        await taskService.healthCheck();
        if (!cancelled) setApiStatus('connected');
      } catch {
        if (!cancelled) setApiStatus('disconnected');
      }
    };

    checkHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <h1>MERN Task Manager</h1>
        <p>Manage your tasks efficiently</p>
        <div className={`status-indicator status-${apiStatus}`}>
          API Status: {apiStatus}
        </div>
      </div>
    </header>
  );
}

export default Header;