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

const AllNoticeSets: FC<Props> = ({ noticeSets }) => {
  const history = useHistory();
  return (
    <div>
      <h1>All noticeset</h1>
      {noticeSets.map((noticeSet, id) => (
        <Card key={id} variant="outlined">
          <CardContent>
            <Typography variant="h4">{noticeSet.name}</Typography>
            {/* <Typography variant="subtitle1">{asset.type}</Typography> */}
            {noticeSet.assets.map((nsAssets, idx) => (
              <Typography key={idx} variant="body1">
                {nsAssets.name}
              </Typography>
            ))}
          </CardContent>
          <CardActions>
            <Button size="small">Delete</Button>
            <Button
              onClick={() => history.push(`noticeset/edit/${noticeSet._id}`)}
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default AllNoticeSets;
