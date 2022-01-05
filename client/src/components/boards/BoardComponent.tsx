import { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { Board } from "../../utils/interface/Boards.interface";
import { useHistory } from "react-router";
import { typography } from "@mui/system";

type Prop = {
  board: Board;
};

const BoardComponent: FC<Prop> = ({ board }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h4" my={1}>
          {board.name}
        </Typography>
        <Typography paragraph ml={1}>
          <b>Status</b> : <LightbulbIcon color="success" fontSize="small" />{" "}
          Online
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleOpen}
        >
          Get a preview
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Typography variant="h1" my={1}>
              {new Date().toLocaleDateString()}
            </Typography>
            <img src="" alt="" />
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleOpen}
            >
              Get latest preview
            </Button>
          </Box>
        </Modal>
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
