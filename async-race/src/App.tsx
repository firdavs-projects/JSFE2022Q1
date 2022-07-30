import React, { FC, useState } from 'react';
import './App.css';
import MainLayout from './components/MainLayout';
import { Tabs } from './types';
import Garage from './components/Garage';
import Winners from './components/Winners';

const App: FC = () => {
  const [tab, setTab] = useState<Tabs>(Tabs.Garage);
  const handleChange = (current: Tabs) => {
    setTab(current);
  };

  return (
        <MainLayout onChange={handleChange}>
          <div className={tab === Tabs.Garage ? '' : 'hided'}>
            <Garage/>
          </div>
          <div className={tab === Tabs.Winners ? '' : 'hided'}>
            <Winners/>
          </div>
        </MainLayout>
  );
};

export default App;
