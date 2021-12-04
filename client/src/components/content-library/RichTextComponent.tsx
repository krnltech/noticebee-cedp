import { FC, lazy, Suspense, useState } from "react";
import { Box } from "@mui/system";
const Editor = lazy(() =>
  import("react-draft-wysiwyg").then((module) => ({
    default: module.Editor,
  }))
);
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Paper, TextField } from "@mui/material";
import draftToHtml from "draftjs-to-html";
import Loader from "../layouts/Loader";
import Tags from "./Tags";
import { selectAdmin } from "../../redux/slices/adminSlide";
import { useSelector } from "react-redux";
import { addTextAsset } from "../../api/asset.api";
import { AssetAdd } from "../../utils/interface/Asset.interface";

type Props = {
  reloadAsset: () => void;
};

const RichTextComponent: FC<Props> = ({ reloadAsset }) => {
  const { admin } = useSelector(selectAdmin);
  const [name, setName] = useState<string>();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

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
        content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        admin: adminId,
        organization: orgId,
        tags,
        type: "rich-text",
        source: "text",
      };
      // console.log(asset);
      try {
        const message = await addTextAsset(asset);
        console.log(message);
        if (message) {
          reloadAsset();
        }
      } catch (error) {
        console.log(error);
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
        <Suspense fallback={<Loader />}>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            editorStyle={{ height: "200px" }}
          />
        </Suspense>
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
            onClick={() => setEditorState(() => EditorState.createEmpty())}
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

export default RichTextComponent;
