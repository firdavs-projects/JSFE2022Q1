import React, {FC} from 'react';
import NavBar from "../NavBar";
import Footer from "../Footer";

export interface MainLayoutProps {
    title: string;
    children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({title, children}) => {
    return (
        <>
            <NavBar title={title} />
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default MainLayout;