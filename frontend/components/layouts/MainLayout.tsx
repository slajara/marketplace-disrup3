import { FC, ReactNode } from "react"
import Navbar from "../Navbar";
import Footer from "../Footer";

interface Props {
    children?: ReactNode;
}

const MainLayout: FC<Props> = ({children}) => {
  return (
    <>
        <Navbar/>
            {children}     
        <Footer />      
    </>
   
  )
}

export default MainLayout