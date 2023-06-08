import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SignIn from "./SignIn";
import SwitchThemeBtn from "./SwitchThemeBtn";
import logo from "../../assets/Logo.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuList from '@mui/material/MenuList';

import { FC, ReactElement } from "react";

type HandleOpenNavMenuType = (event: any) => void
type HandleCloseNavMenuType = () => void

const pages: string[] = ["Home", "Favorites", "About"];

const Header: FC = (): ReactElement => {

  const [anchorElNav, setAnchorElNav] = useState<null>(null);

  const handleOpenNavMenu:HandleOpenNavMenuType = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu: HandleCloseNavMenuType = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ mb: "64px" }}>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "transparent", backdropFilter: "blur(8px)" }}
      >
        <Box
          sx={{
            pl: { xs: "0px", md: "50px" },
            pr: { xs: "12px", md: "50px" },
          }}
        >
          <Toolbar disableGutters>
            <Box
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                color: "inherit",
              }}
            >
              <Link to={"/"}>
                <Box
                  component="img"
                  sx={{
                    height: 59,
                    width: 107,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    transition: "all 0.2s",
                    "&:hover": { transform: "scale(90%)" },
                  }}
                  alt="Logo"
                  src={logo}
                ></Box>
              </Link>
            </Box>
            {/* span menu 3 lines */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                color: "text.primary",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                // color="text.primary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuList
                  onClick={handleCloseNavMenu}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {pages.map((page) => (
                    <Link
                      key={page}
                      to={`${page}` === "Home" ? "/" : `/${page}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Button sx={{ 
                        color: "text.primary", 
                        transition: "all 0.2s", 
                        '&:hover':{boxShadow: "0px 0px 20px 0px dimgray", transform: "scale(90%)"} 
                        }}
                      >{page}</Button>
                    </Link>
                  ))}
                </MenuList>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <SwitchThemeBtn />
                </Box>
              </Menu>
            </Box>
            {/* logo for mobile  */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
              }}
            >
              <Link to={"/"}>
                <Box
                  component="img"
                  sx={{
                    display: { xs: "flex", md: "none" },
                    transition: "all 0.2s",
                    "&:hover": { transform: "scale(90%)" },
                  }}
                  alt="logo"
                  src={logo}
                ></Box>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link
                to={"/"}
                style={{ textDecoration: "none", marginRight: "25px" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "text.primary",
                    display: "block",
                    transition: "all 0.2s",
                    "&:hover": {
                      boxShadow: "0px 0px 20px 0px dimgray",
                      transform: "scale(90%)",
                    },
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link
                to={"/favorites"}
                style={{ textDecoration: "none", marginRight: "25px" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "text.primary",
                    display: "block",
                    transition: "all 0.2s",
                    "&:hover": {
                      boxShadow: "0px 0px 20px 0px dimgray",
                      transform: "scale(90%)",
                    },
                  }}
                >
                  Favorites
                </Button>
              </Link>
              <Link
                to={"/about"}
                style={{ textDecoration: "none", marginRight: "25px" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "text.primary",
                    display: "block",
                    transition: "all 0.2s",
                    "&:hover": {
                      boxShadow: "0px 0px 20px 0px dimgray",
                      transform: "scale(90%)",
                    },
                  }}
                >
                  About
                </Button>
              </Link>
              <SwitchThemeBtn />
            </Box>
            <SignIn />
          </Toolbar>
        </Box>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Header;
