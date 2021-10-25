import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "./App.css";
import NavBar from "./components/layouts/NavBar";
import { useDispatch, useSelector } from "react-redux";
import routes from "./utils/routes";
import { selectAdmin } from "./redux/slices/adminSlide";
import Login from "./components/auth/Login";
import { fetchBoards } from "./redux/slices/boardSlice";

function App() {
  const { isAuthenticated } = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const { admin } = useSelector(selectAdmin);

  useEffect(() => {
    dispatch(fetchBoards(admin.id));
  }, []);
  return (
    <Box sx={{ margin: 0 }}>
      <NavBar />
      <Container maxWidth="xl">
        {isAuthenticated ? (
          <Switch>
            {routes.map((rt, id) => (
              <Route exact key={id} path={rt.path} component={rt.component} />
            ))}
          </Switch>
        ) : (
          <Login />
        )}
      </Container>
    </Box>
  );
}

export default App;
