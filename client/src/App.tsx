import { Switch, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "./App.css";
import NavBar from "./components/layouts/NavBar";

import routes from "./utils/routes";

function App() {
  return (
    <Box sx={{ margin: 0 }}>
      <NavBar />
      <Container maxWidth="xl">
        <Switch>
          {routes.map((rt, id) => (
            <Route exact key={id} path={rt.path} component={rt.component} />
          ))}
        </Switch>
      </Container>
    </Box>
  );
}

export default App;
