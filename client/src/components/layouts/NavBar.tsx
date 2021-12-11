import { Link as NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import routes from "../../utils/routes";
import { selectAdmin, setCurrentUser } from "../../redux/slices/adminSlide";
import { clearBoards } from "../../redux/slices/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearAssets } from "../../redux/slices/assetSlice";
import { clearNoticeSets } from "../../redux/slices/noticesetSlice";

const NavBarLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  padding: 8,
  borderRadius: 12,
  fontFamily: `'Raleway','sans-serif'`,
  fontSize: theme.typography.subtitle2.fontSize,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const LogOutLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  padding: 8,
  borderRadius: 12,
  fontFamily: `'Raleway','sans-serif'`,
  fontSize: theme.typography.subtitle2.fontSize,
  cursor: "pointer",
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
  const { isAuthenticated } = useSelector(selectAdmin);
  const handleLogout = () => {
    dispatch(clearBoards());
    dispatch(clearAssets());
    dispatch(clearNoticeSets());
    dispatch(setCurrentUser({}));
    localStorage.removeItem("noticebee-cedp-admin");
  };
  return (
    <AppBar
      color="default"
      position="sticky"
      sx={{ padding: 1, margin: 0, boxShadow: "none" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <NavBarTitle to="/">
          {isAuthenticated ? "COLLEGE NAME |" : ""} NOTICEBEE
        </NavBarTitle>
        <Stack
          direction="row"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          {routes
            .filter((rt) => rt.navbar)
            .filter((rt) => (isAuthenticated ? rt.private : !rt.private))
            .map((rt, id) => (
              <NavBarLink key={id} to={rt.path}>
                {rt.name}
              </NavBarLink>
            ))}
          {isAuthenticated && (
            <LogOutLink onClick={handleLogout}>Logout</LogOutLink>
          )}
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
