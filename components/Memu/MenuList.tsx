import { getMenu } from "@/lib/getData"
import MenuCard from "./MenuCard";

const MenuList = async () => {
    const Menu = await getMenu();
    return (
        <>
            <div className="z-5 relative mx-auto w-full text-center">
                <h1 className="mb-8 text-2xl font-bold leading-none tracking-normal md:text-3xl md:tracking-tight">
                    Menu
                </h1>
            </div>
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
                <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Menu.map((menus) => (
                        <MenuCard key={menus._id} menu={{ ...menus, size: [''], getFilteredSelectedRowModel: () => {} }} />
                    ))}
                </div>


            </div>
        </>
    )
}

export default MenuList
