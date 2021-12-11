import { FC, useState } from "react";
import { Box } from "@mui/system";
import { Button, Paper, TextField } from "@mui/material";
import Loader from "../layouts/Loader";
import Tags from "./Tags";
import { selectAdmin } from "../../redux/slices/adminSlide";
import { useSelector } from "react-redux";
import { addExternalAsset, addTextAsset } from "../../api/asset.api";
import { AssetAdd } from "../../utils/interface/Asset.interface";
import { useSnackbar } from "notistack";
import handleError from "../../utils/errorhandler";

type Props = {
  reloadAsset: () => void;
};

const ExternalSourceComponent: FC<Props> = ({ reloadAsset }) => {
  const { admin } = useSelector(selectAdmin);
  const [name, setName] = useState<string>();
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const { enqueueSnackbar } = useSnackbar();

  const handleTags = () => {
    if (!tags.includes(tag)) {
      setTags((oldTags) => [...oldTags, tag]);
    }
    setTag("");
  };
  const clearTags = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const handleUpload = async () => {
    if (name) {
      let orgId = admin.org as string;
      let adminId = admin.id as string;
      const asset: AssetAdd = {
        name,
        content: content,
        admin: adminId,
        organization: orgId,
        tags,
        type: "",
        source: "external",
      };
      // console.log(asset);
      try {
        const message = await addExternalAsset(asset);
        // console.log(message);
        enqueueSnackbar(message, { variant: "success" });
        if (message) {
          reloadAsset();
        }
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          enqueueSnackbar(error.response?.data?.message, { variant: "error" });
        } else {
          enqueueSnackbar(error.message, { variant: "error" });
        }
      }
    } else {
      alert("Please give a name to file");
    }
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ my: 1, p: 3 }}>
        <TextField
          size="small"
          label="Content Name"
          helperText="Enter a name of the content"
          variant="filled"
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          // disabled={loading}
          sx={{ width: "100%" }}
        />
        <TextField
          size="small"
          label="Content source"
          helperText="The content source link must be a direct download link"
          variant="filled"
          type="text"
          id="name"
          onChange={(e) => setContent(e.target.value)}
          // disabled={loading}
          sx={{ width: "100%" }}
        />
        <Tags
          tag={tag}
          tags={tags}
          setTag={(a: string) => setTag(a)}
          handleTags={() => handleTags()}
          loading={false}
          clearTags={(t: string) => clearTags(t)}
        />
        <Box sx={{ width: "100%" }}>
          <Button
            sx={{ mr: 1, mt: 1 }}
            // disabled={loading}
            variant="outlined"
            color="error"
            onClick={() => setContent("")}
          >
            Cancel
          </Button>
          <Button
            sx={{ mr: 1, mt: 1 }}
            // disabled={loading}
            color="primary"
            variant="contained"
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ExternalSourceComponent;
