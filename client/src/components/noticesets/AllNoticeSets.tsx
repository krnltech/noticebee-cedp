import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useHistory } from "react-router";
import { NoticeSet } from "../../utils/interface/NoticeSet.interface";

type Props = {
  noticeSets: NoticeSet[];
  isLoading: boolean;
};

const AllNoticeSets: FC<Props> = ({ noticeSets, isLoading }) => {
  const history = useHistory();
  return (
    <div>
      {isLoading ? (
        <Typography paragraph> . . . loading . . . </Typography>
      ) : (
        <>
          {noticeSets.map((noticeSet, id) => (
            <Card key={id} variant="outlined">
              <CardContent>
                <Typography variant="h4" my={1}>
                  {noticeSet.name}
                </Typography>
                {/* <Typography variant="subtitle1">{asset.type}</Typography> */}
                {noticeSet.assets.map((nsAssets, idx) => (
                  <Typography key={idx} variant="body1">
                    {nsAssets.name}
                  </Typography>
                ))}
              </CardContent>
              <CardActions>
                <Button variant="contained" color="error" size="small">
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() =>
                    history.push(`noticeset/edit/${noticeSet._id}`)
                  }
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default AllNoticeSets;
