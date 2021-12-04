import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Card,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";

import { useDispatch, useSelector } from "react-redux";
import { fetchAssets } from "../api/asset.api";
// import Button from "@mui/material/Button";
import UploadComponent from "../components/content-library/UploadComponent";
import { selectAdmin } from "../redux/slices/adminSlide";
import { selectAsset } from "../redux/slices/assetSlice";
import Loader from "../components/layouts/Loader";
import RichTextComponent from "../components/content-library/RichTextComponent";
import ExternalSourceComponent from "../components/content-library/ExternalSourceComponent";

const ContentLibrary: FC = () => {
  // const [addNew, setAddNew] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [mediaSource, setMediaSource] = useState<string>("media");
  const { assets, isLoading } = useSelector(selectAsset);
  const { admin } = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const reloadAsset = () => {
    if (admin.id) {
      fetchAssets(admin.id, dispatch);
    }
  };

  const handleMediaSource = (e: ChangeEvent<HTMLInputElement>) => {
    setMediaSource((e.target as HTMLInputElement).value);
  };

  const handleSearch = (e: any) => {
    setQuery(e.target.value);
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
      <FormControl component="fieldset">
        <RadioGroup row value={mediaSource} onChange={handleMediaSource}>
          <FormControlLabel value="media" control={<Radio />} label="Media" />
          <FormControlLabel value="text" control={<Radio />} label="Text" />
          <FormControlLabel
            value="external"
            control={<Radio />}
            label="External Source"
          />
        </RadioGroup>
      </FormControl>
      {mediaSource === "media" ? (
        <UploadComponent reloadAsset={() => reloadAsset()} />
      ) : mediaSource === "text" ? (
        <RichTextComponent reloadAsset={() => reloadAsset()} />
      ) : mediaSource === "external" ? (
        <ExternalSourceComponent reloadAsset={() => reloadAsset()} />
      ) : (
        <></>
      )}
      <TextField
        id="outlined-search"
        label="Search assets"
        type="search"
        onChange={handleSearch}
        helperText="Search by name, tags etc."
        sx={{ my: 1, width: "100%" }}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {assets
            .filter((asset) => {
              return asset.name.toLowerCase().includes(query.toLowerCase()) ||
                (asset.tags && asset.tags?.length !== 0)
                ? asset.tags?.some((tag) =>
                    tag.toLowerCase().includes(query.toLowerCase())
                  )
                : true;
            })
            .map((asset, id) => (
              <Card key={id} elevation={3} sx={{ my: 1 }}>
                <CardContent>
                  <Typography variant="h4" my={1}>
                    {asset.name}
                  </Typography>
                  <Typography variant="caption">{asset.type}</Typography>
                  <Typography variant="subtitle2">Url:</Typography>
                  <Typography variant="body1">{asset.content}</Typography>
                  <Typography variant="subtitle2">Tags:</Typography>
                  {asset.tags?.map((tag, id) => (
                    <Chip
                      label={tag}
                      color="secondary"
                      key={id}
                      sx={{ mr: 1, mt: 1 }}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
        </>
      )}
    </Container>
  );
};

export default ContentLibrary;
