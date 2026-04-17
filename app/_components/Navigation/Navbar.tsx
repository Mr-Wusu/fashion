import NavbarClient from "./NavbarClient";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return <NavbarClient navLinks={<NavLinks />} />;
}
