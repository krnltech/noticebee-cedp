import { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import { Board } from "../../utils/interface/Boards.interface";
import { useHistory } from "react-router";

type Prop = {
  board: Board;
};

const BoardComponent: FC<Prop> = ({ board }) => {
  const history = useHistory();
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" my={1}>
          {board.name}
        </Typography>
        <Typography paragraph ml={1}>
          <b>Status</b> : Online
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="error" size="small">
          Get a preview
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => history.push(`noticeboard/edit/${board._id}`)}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default BoardComponent;
