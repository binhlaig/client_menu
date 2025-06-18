import AvatorNav from "./AvatorNav"
import SidebarDrawer from "./SidebarDrawer"


const Header = () => {
  return (
    <header className="sticky top-0 z-10 rounded-md text-white bg-blue-950 shadow-sm dark:bg-black">
    <nav className="p-4 transition-all">
        <div className='mx-8 flex flex-wrap items-center justify-between'>
            <div className="flex items-center justify-start">
              <SidebarDrawer/>
            </div>
            <div className="flex items-center space-x-3 md:space-x-6">
               <AvatorNav/>
            </div>
        </div>
    </nav>
</header>
  )
}

export default Header
