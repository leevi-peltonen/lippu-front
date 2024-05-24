//import Header from "../common/Header";

import { Toaster } from "react-hot-toast";
import HomeButton from "../common/HomeButton";

interface MainLayoutProps {
    children: React.ReactNode
    disableHomeButton?: boolean
}

const MainLayout = ({ children, disableHomeButton }: MainLayoutProps) => {
    return (
        <div>
            {/* <Header /> */}
            {!disableHomeButton &&
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "absolute",
                    top: 100,
                    right: 100
                }}
            >
                <HomeButton />
            </div>
            }

            <main>{children}</main>
            <Toaster />
        </div>
    );
}

export default MainLayout
