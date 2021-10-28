import { FC } from "react";
import { Container } from "@mui/material";
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
        <p>
          <b>Status</b> : Online
        </p>
      </Paper>
    </Container>
  );
};

export default BoardComponent;
