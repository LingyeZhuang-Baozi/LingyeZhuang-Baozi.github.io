import React, { useState , useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";

/**
 * Nav
 * 
 * props:
 *	- mode (str)
 */
export default function Nav() {
	return (
		<div>
			<nav className="Navbar">
				<NavLink to="/" className="Navtab">About</NavLink>
				<NavLink to="/login" className="Navtab">LogIn</NavLink>
				<NavLink to="/upload" className="Navtab">Upload</NavLink>
				<NavLink to="/explore" className="Navtab">Explore</NavLink>
				<NavLink to="/admin" className="Navtab">Admin</NavLink>
			</nav>
		</div>
	);
}