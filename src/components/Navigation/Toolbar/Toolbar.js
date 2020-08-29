import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToogle from '../SideDrawer/DrawerToggle/DrawerToogle'

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToogle  clicked={props.drawerToggleClicked} />
       <div className={classes.Logo}>
            <Logo />
        </div> 
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
        </nav>
    </header>
)


export default Toolbar