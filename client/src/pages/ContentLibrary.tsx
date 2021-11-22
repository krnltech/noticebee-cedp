import { FC, useEffect } from "react";
import { Card, Container, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";

import { useDispatch, useSelector } from "react-redux";
import { fetchAssets } from "../api/asset.api";
// import Button from "@mui/material/Button";
import UploadComponent from "../components/content-library/UploadComponent";
import { selectAdmin } from "../redux/slices/adminSlide";
import { selectAsset } from "../redux/slices/assetSlice";

const ContentLibrary: FC = () => {
  // const [addNew, setAddNew] = useState(false);
  const { assets, isLoading } = useSelector(selectAsset);
  const { admin } = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const reloadAsset = () => {
    if (admin.id) {
      fetchAssets(admin.id, dispatch);
    }
  };
  useEffect(() => {
    reloadAsset();
  }, [admin]);
  // all/:adminId
  return (
    <Container>
      <Typography variant="h4" my={1}>
        Content Library
      </Typography>
      {/* <Button onClick={() => setAddNew((an) => !an)}>
        {addNew ? "Cancel" : "Add new content"}
      </Button> */}
      <UploadComponent reloadAsset={() => reloadAsset()} />
      {assets.map((asset, id) => (
        <Card key={id} variant="outlined">
          <CardContent>
            <Typography variant="h4" my={1}>
              {asset.name}
            </Typography>
            <Typography variant="subtitle1">{asset.type}</Typography>
            <Typography variant="body1">{asset.url}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default ContentLibrary;
