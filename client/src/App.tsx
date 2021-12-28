import { Suspense, useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "./App.css";
import NavBar from "./components/layouts/NavBar";
import { useDispatch, useSelector } from "react-redux";
import routes from "./utils/routes";
import { selectAdmin, setCurrentUser } from "./redux/slices/adminSlide";
import { withRouter } from "react-router";
import PrivateRoute from "./components/auth/PrivateRoute";
import { getCurrentUser } from "./api/auth.api";
import { socket as io } from "./api/socket.api";
// import { SocketContext } from "./api/socket.api";
import bg from "./logo.svg";
import Loader from "./components/layouts/Loader";

function App() {
  const dispatch = useDispatch();
  const { admin, isAuthenticated } = useSelector(selectAdmin);
  // const io: any = useContext(SocketContext);
  useEffect(() => {
    if (isAuthenticated && admin.id) {
      // const io = createConnection();
      io.emit("update", { admin });
      io.on("updateBoard", (args) => {
        console.log(args);
      });
    }
    dispatch(setCurrentUser(getCurrentUser()));
  }, []);
  return (
    // <SocketContext.Provider value={io}>
    <Box sx={{ margin: 0 }}>
      <NavBar />
      <Container maxWidth="xl">
        <Suspense fallback={<Loader />}>
          <Switch>
            {routes
              .filter((rt) => rt.private)
              .map((rt, id) => (
                <PrivateRoute
                  key={id}
                  exact={true}
                  path={rt.path}
                  component={rt.component}
                />
              ))}
            {routes
              .filter((rt) => !rt.private)
              .map((rt, id) => (
                <Route
                  key={id}
                  exact={true}
                  path={rt.path}
                  component={rt.component}
                />
              ))}
          </Switch>
        </Suspense>
      </Container>
    </Box>
    // </SocketContext.Provider>
  );
}

export default withRouter(App);
