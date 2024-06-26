import { Dropdown } from "./Dropdown"
import { NavBarItemWithDropdownProps } from "../../utilities/type-aliases/navbar/NavBarItemWithDropdownProps"

export function NavBarItemWithDropdown({ navBarItems }: NavBarItemWithDropdownProps) {
    return (
        navBarItems.map((navBarItem) => {
            return (
                <li key={navBarItem.title}
                    className="relative"
                >
                    <button 
                        type="button"
                        className="flex outline-none focus:outline-none px-4 py-2 rounded-md font-medium text-white hover:bg-slate-800"
                        onClick={navBarItem.onClick}
                    >
                            {navBarItem.title}
                    </button>
                    { navBarItem.isDropdownOpen && <Dropdown dropdownItems={navBarItem.dropdownData}/> }
                </li>
            )
        })
    )
}