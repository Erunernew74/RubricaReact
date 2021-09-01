import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import styles from "../styles/NavbarBootstrap.module.css";

import React from "react";

function NavbarBoot() {
  return (
    <div>
      <Navbar
        id={styles.bg}
        variant="dark"
        expand="md"
        collapseOnSelect
      >
        <Navbar.Brand href="home" className={styles.logoTitle}>
          RUBRICA TELEFONICA
        </Navbar.Brand>

        <Navbar.Toggle className={styles.navToggle} />
        <Navbar.Collapse className={styles.collapse}>
          <Nav className="ms-auto" id={styles.nav}>
            <Nav.Link href="/" id={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link href="/InserisciContatto" id={styles.navLink}>
              Inserisci utente
            </Nav.Link>
            <Nav.Link href="cercaUtente" id={styles.navLink}>
              cerca utente
            </Nav.Link>
            <Nav.Link href="/ListaContatti" id={styles.navLink}>
              Lista contatti
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarBoot;
