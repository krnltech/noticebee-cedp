import { Link as NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import routes from "../../utils/routes";
import { logout } from "../../redux/slices/adminSlide";
import { useDispatch } from "react-redux";

const NavBarLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  padding: 12,
  borderRadius: 12,
  fontFamily: `'Raleway','sans-serif'`,
  fontSize: theme.typography.subtitle1.fontSize,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const LogOutLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  padding: 12,
  borderRadius: 12,
  fontFamily: `'Raleway','sans-serif'`,
  fontSize: theme.typography.subtitle1.fontSize,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const NavBarTitle = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontFamily: `'Raleway','sans-serif'`,
  fontWeight: 700,
  borderRadius: 12,
  fontSize: theme.typography.h5.fontSize,
}));

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <AppBar
      color="default"
      position="sticky"
      sx={{ padding: 1, margin: 0, boxShadow: "none" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <NavBarTitle to="/">ORGANIZATION | NOTICEBEE</NavBarTitle>
        <Stack
          direction="row"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          {routes
            .filter((rt) => rt.navbar)
            .map((rt, id) => (
              <NavBarLink key={id} to={rt.path}>
                {rt.name}
              </NavBarLink>
            ))}
          <LogOutLink onClick={() => dispatch(logout())}>Logout</LogOutLink>
        </Stack>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Stack>
    </AppBar>
  );
};

export default NavBar;
