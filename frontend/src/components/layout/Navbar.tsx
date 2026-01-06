// import { Link } from "react-router-dom"
import {
  NavigationMenu,
  // NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu"
import { ModeToggle } from "./mode-toggle"
import Logo from '../../assets/HPI_logo.png';

function Navbar() {
  return (
    <div className="flex justify-between items-center px-4 py-2 border-b mb-5">
      <div className="flex items-center gap-8">
        <img src={Logo} alt="HPI Logo" className="h-8" />
        <NavigationMenu>
          <NavigationMenuList>
            {/* Home */}
            {/* <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem> */}

            {/* Calculator */}
            {/* <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/calculator">Calculator</Link>
              </NavigationMenuLink>
            </NavigationMenuItem> */}

            {/* About */}
            {/* <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="right-0">
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar