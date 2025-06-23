import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    PhoneOutlined,
    MailOutlined,
    ShoppingCartOutlined,
    MenuOutlined,
} from '@ant-design/icons';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Top header */}
            <div className="top">
                <div className="container ">
                    <div className="row g-3 px-md-0 align-items-center">
                        <div className="col-md">
                            <div className="fz-14 d-flex align-items-center gap-2">
                                <PhoneOutlined />
                                <span style={{ color: '#A0A09F' }}>0337866041</span>
                            </div>
                        </div>
                        <div className="col-md text-center fz-14">
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <MailOutlined />
                                <span style={{ color: '#A0A09F' }}>vonhut123a@gmail.com</span>
                            </div>
                        </div>
                        <div className="col-md-5 text-end fz-14">
                            <span>Open hours: Monday - Sunday 8:00AM - 9:00PM</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav className=" nav border-bottom border-white border-opacity-25 py-2" style={{ marginTop: "35px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <Link to="/" className="nav__brand text-white fw-bold fs-5 text-decoration-none">
                                Feliciano
                            </Link>
                        </div>

                        <div className="col-10 d-flex justify-content-end align-items-center">
                            {/* Desktop menu */}
                            <div className="d-none d-md-block">
                                <ul className="d-flex mb-0 gap-3">
                                    <li className=" px-2 "><NavLink className="nav_link text-white text-decoration-none px-2" to="/">Home</NavLink></li>
                                    <li className=" px-2 "><NavLink className="nav_link text-white text-decoration-none px-2" to="/about">About</NavLink ></li>
                                    <li className=" px-2 "><NavLink className="nav_link text-white text-decoration-none px-2" to="/dish">Dish</NavLink ></li>
                                    <li className=" px-2 "><NavLink className="  btn btn-outline-light btn-sm px-2" to="/book">Book a table</NavLink ></li>
                                    <li className=" px-2 "><NavLink className="nav_link text-white text-decoration-none px-2" to="/login">Login</NavLink ></li>
                                    <li className="position-relative">
                                        <ShoppingCartOutlined style={{ fontSize: 30, color: 'white' }} />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill icon_cart">
                                            0
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Mobile toggle */}
                            <div className="d-md-none ms-3" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: 'pointer' }}>
                                <MenuOutlined style={{ color: '#8d8d8d', fontSize: 24 }} />
                                <p className="text-white m-0">MENU</p>
                            </div>
                        </div>

                        {/* Mobile menu dropdown */}
                        {mobileMenuOpen && (
                            <div className="col-12 mt-3 d-md-none">
                                <ul className="list-unstyled text-center">
                                    <li className="px-2"><NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink ></li>
                                    <li className="px-2"><NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About</NavLink ></li>
                                    <li className="px-2"><NavLink to="/menu" onClick={() => setMobileMenuOpen(false)}>Menu</NavLink ></li>
                                    <li className="px-2"><NavLink to="/stories" onClick={() => setMobileMenuOpen(false)}>Stories</NavLink ></li>
                                    <li className="px-2"><NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink ></li>
                                    <li className="px-2"><NavLink to="/book" onClick={() => setMobileMenuOpen(false)}>Book a table</NavLink ></li>
                                    <li className="px-2"><NavLink to="/account/login" onClick={() => setMobileMenuOpen(false)}>Login</NavLink ></li>
                                    <li className="d-flex justify-content-center align-items-center gap-2">
                                        <ShoppingCartOutlined style={{ fontSize: 20 }} />
                                        <span className="badge bg-danger">0</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
