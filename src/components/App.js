import React from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import Main from './Main.js';
import '../css/App.css';
import useTenantguid from '../hooks/useTenantguid.js';
import usePriorities from '../hooks/usePriorities.js';
import useStatuses from '../hooks/useStatuses.js';

function App() {
  const [currentSection, setCurrentSection] = React.useState('tasks');
  const { refetch: refetchTenantguid } = useTenantguid();
  usePriorities();
  useStatuses();

  React.useEffect(() => {
    refetchTenantguid();
  }, []);

  return (
    <div className="App">
      <Sidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <div className="App-right">
        <Header />
        <Main currentSection={currentSection} />
      </div>
    </div>
  );
}

export default App;
