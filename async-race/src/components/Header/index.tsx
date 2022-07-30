import React, { FC, useState } from 'react';
import { Tabs } from '../../types';

interface Props {
  onChange: (tab: Tabs) => void;
}

const Header: FC<Props> = ({ onChange }) => {
  const [tab, setTab] = useState<Tabs>(Tabs.Garage);
  const handleChange = (current: Tabs) => {
    setTab(current);
    onChange(current);
  };

  return (
        <header className="header container-fluid mb-3">
            <h1 className="py-2">Async race</h1>
            <nav>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            onClick={() => handleChange(Tabs.Garage)}
                            className={`nav-link ${tab === Tabs.Garage ? 'active' : ''}`}
                        >
                            Garage
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            onClick={() => handleChange(Tabs.Winners)}
                            className={`nav-link ${tab === Tabs.Winners ? 'active' : ''}`}
                        >
                            Winners
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
  );
};

export default Header;
