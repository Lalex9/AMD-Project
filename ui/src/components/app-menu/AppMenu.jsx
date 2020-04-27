import React from 'react';
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';

class AppMenu extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>AMD</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link>Menu</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item>Action</NavDropdown.Item>
                        <NavDropdown.Item>Another action</NavDropdown.Item>
                        <NavDropdown.Item>Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export {AppMenu};
