// Coded by Michele Carter

import { HiMagnifyingGlass } from "react-icons/hi2"
import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import Logo from "../assets/Leet-Logo.svg"
import WishlistIcon from "./ui/WishlistIcon";
import NotificationIcon from "./ui/NotificationIcon";
import { Link } from "react-router-dom"
import Button from "../components/ui/Button";
import Modal from "../components/Modal";
import PopupAuthForm from "../components/PopupAuthForm";


const Header = () => {

  // Define variable state using useState hook
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  
  // Hamburger state toggler
  const handleToggle = () => {
    setHamburgerOpen(!hamburgerOpen)
  }; 

  // Define state variable for the modal useState hook
  const [isModalOpen, setIsModalOpen] = useState(false);

  // function to toggle the modal's state
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // const { accountData, setAccountData } = useContext(AccountContext);

  // Hook for cheking viewport and adds an event listener for resize event
  useEffect(() => {
    if (window.innerWidth > 1280) setHamburgerOpen(true);
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

   // Function for checking breakpoint and setting hamburger state
  function checkWidth() {
    const width = window.innerWidth;
    if (width > 1280) {
      setHamburgerOpen(true);
    } else {
      setHamburgerOpen(false);
    }
  }


  return (
    <div className="fixed top-0 left-0 w-full ">
      <div className="flex items-center justify-between h-[100px] bg-background-2 z-[50] border-b px-4">

        <div className="flex items-center gap-4">
          {/* hamburger menu */}
          <div className={`${hamburgerOpen && 'xl:hidden'} flex-col flex-nowrap justify-around w-[36px] h-[23px] z-10 text-background-4 cursor-pointer`} onClick={handleToggle}>
            <div className="h-0.5 rounded-lg bg-primary origin-top-left mb-2"></div>
            <div className="h-0.5 rounded-lg bg-primary origin-top-left mb-2"></div>
            <div className="h-0.5 rounded-lg bg-primary origin-top-left mb-2"></div>
          </div>
          {/* Leet logo */}
          <div className="items-center w-[90px] h-[77px]">
            <img className="w-[90px] h-[77px]" src={Logo} />
          </div>
        </div> 

        {/* search bar */}
        <div className="flex">
          <div className="flex w-[50%] md:w-full justify-between h-10 rounded-3xl bg-background-2 border border-primary p-2">
            <input type="text" />
            <HiMagnifyingGlass className="text-neutral-light md:float-right mx-4 cursor-pointer" />
          </div>
        </div> 

        {/* wishlist/notification icons and sign in/account button */}
        <div className="hidden md:inline-flex items-center gap-6 ">
          <div><NotificationIcon size={20} /></div>
          <Link className="mr-[150px]" to="/wishlist"><WishlistIcon size={20} /></Link>
          
          <Button className="px-4" onClick={toggleModal}>Sign in</Button>
        </div>
      </div>

      
      {/* sidebar */} 
      <div className={`${!hamburgerOpen && 'z-[50] -translate-x-80'} h-screen ease-in duration-500 fixed z-[50] `}>
        <Sidebar />
      </div>   
      
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)}>
          <PopupAuthForm
            onSubmit={() => {
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}

    </div>
  );
};

export default Header;
