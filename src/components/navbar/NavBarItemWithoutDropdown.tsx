import { NavLink } from "react-router-dom"
import { NavBarItemWithoutDropdownProps } from "../../utilities/type-aliases/navbar/NavBarItemWithoutDropdownProps"

export function NavBarItemWithoutDropdown({ navBarItems }: NavBarItemWithoutDropdownProps) {
    return (<>
        {navBarItems.map((navBarItem) => {
            return (
                <li
                    key={navBarItem.title} 
                    className="relative"
                >
                    <NavLink
                        to={navBarItem.navLink}
                        className="flex outline-none focus:outline-none px-4 py-2 rounded-md font-medium text-white hover:bg-slate-800"
                    >
                        {navBarItem.title}
                    </NavLink>
                </li>
            )
        })}
    </>)
}