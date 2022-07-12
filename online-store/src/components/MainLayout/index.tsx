import React, {FC} from 'react';
import NavBar from "../NavBar";
import Footer from "../Footer";

export interface MainLayoutProps {
    title: string;
    children: React.ReactNode;
    cartCount: number;
    cartOnClick: () => void;
}

const MainLayout: FC<MainLayoutProps> =
    ({
         title,
         children,
         cartOnClick,
         cartCount
     }) => {
        return (
            <>
                <NavBar title={title} onClick={cartOnClick} count={cartCount}/>
                <main>
                    {children}
                </main>
                <Footer/>
            </>
        );
    };

export default MainLayout;
