import React, { FC, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MainLayout from './components/MainLayout';
import { Tabs } from './types';
import Garage from './components/Garage';
import Winners from './components/Winners';

const App: FC = () => {
  const [tab, setTab] = useState<Tabs>(Tabs.Garage);
  const handleChange = (tab: Tabs) => {
    setTab(tab);
  }

  return (
    <MainLayout onChange={handleChange}>
        {tab === Tabs.Garage && <Garage />}
        {tab === Tabs.Winners && <Winners />}
    </MainLayout>
  );
}

export default App;
