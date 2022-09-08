import React, { FC, ReactNode } from 'react';
import { Tabs } from '../../types';
import Header from '../Header';

interface Props {
  children: ReactNode;
  onChange: (tab: Tabs) => void;
}

const MainLayout: FC<Props> = ({ children, onChange }) => {
  return (
        <>
            <Header onChange={onChange}/>
            <main>
                {children}
            </main>
        </>
  );
};

export default MainLayout;
