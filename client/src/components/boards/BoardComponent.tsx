import { FC } from "react";
import { Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

import { Board } from "../../utils/interface/Boards.interface";

type Prop = {
  board: Board;
};

const BoardComponent: FC<Prop> = ({ board }) => {
  return (
    <Container>
      <Paper>
        <h1>{board.name}</h1>
        <Typography paragraph ml={1}>
          <b>Status</b> : Online
        </Typography>
      </Paper>
    </Container>
  );
};

export default BoardComponent;
