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
        <Typography variant="h4" my={1}>
          {board.name}
        </Typography>
        <Typography paragraph ml={1}>
          <b>Status</b> : Online
        </Typography>
      </Paper>
    </Container>
  );
};

export default BoardComponent;
