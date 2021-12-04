import {
  Autocomplete,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "../../utils/axios.base";
import axiosMain from "axios";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { selectAdmin } from "../../redux/slices/adminSlide";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import Tags from "./Tags";

type Prop = {
  file: File;
  removeFromList: (n: string) => void;
  reloadAsset: () => void;
};

const SingleFile: FC<Prop> = ({ file, removeFromList, reloadAsset }) => {
  const [progress, setProgress] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const { admin } = useSelector(selectAdmin);

  const cancelUpload = () => {
    removeFromList(file.name);
  };

  const upload = (targetFile: File) => {
    setLoading(true);
    try {
      const fileReader = new FileReader();
      const CHUNK_SIZE = 1000000;
      fileReader.onload = async (ev) => {
        let fileResult = ev.target?.result as ArrayBuffer;
        let chunkCount = fileResult.byteLength / CHUNK_SIZE;
        const uniqueSuffix = file.name.trim();
        let ext = uniqueSuffix.substring(uniqueSuffix.lastIndexOf(".") + 1);
        let fileName = `File${Math.random().toString(36).slice(2)}.${ext}`;
        let orgId = admin.org as string;
        let adminId = admin.id as string;
        let fileType = file.type;
        // if (fileResult.byteLength > CHUNK_SIZE) {
        console.log({ filesize: fileResult.byteLength, chunkCount });
        let chunks: ArrayBuffer[] = [];
        for (let chunkId = 0; chunkId < chunkCount; chunkId++) {
          const chunk = fileResult.slice(
            chunkId * CHUNK_SIZE,
            chunkId * CHUNK_SIZE + CHUNK_SIZE
          );
          chunks.push(chunk);
          //   console.log(chunkId);
        }
        console.log(chunks.length === chunkCount);
        const axiosRequests = [];
        for (let i = 0; i < chunks.length; i++) {
          axiosRequests.push(
            axios({
              method: "post",
              url: `/api/asset/append`,
              data: chunks[i],
              headers: {
                Accept: "Application/JSON",
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/octet-stream",
                // "content-length": chunks[i].byteLength.toString(),
                "x-name": name,
                "x-filename": fileName,
                "x-orgid": orgId,
                "x-adminid": adminId,
              },
              onUploadProgress: (progressEvent) => {
                let uploadProgress = Math.round((i * 100) / chunks.length);

                // console.log(progressEvent);
                if (i + 1 === chunks.length) {
                  setProgress(100);
                } else {
                  setProgress(uploadProgress / chunks.length);
                }
              },
            })
          );
        }
        axiosMain.all(axiosRequests).then(async (info) => {
          console.log(info);
          const { data } = await axios.post("/api/asset/finish", {
            name,
            fileName,
            orgId,
            adminId,
            fileType,
            tags,
          });
          if (data) {
            removeFromList(file.name);
            reloadAsset();
          }
        });
        // if (data) {
        //   let uploadProgress = Math.round((i * 100) / chunks.length);
        //   console.log(data, " multi");
        //   if (i + 1 === chunks.length) {
        //     setProgress(100);
        //   } else {
        //     setProgress(uploadProgress);
        //   }
        // }
        // } else {

        // }
      };
      if (targetFile) {
        fileReader.readAsArrayBuffer(targetFile);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleUpload = () => {
    if (name) {
      upload(file);
    } else {
      alert("Please give a name to file");
    }
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

  return (
    <Paper elevation={3}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          p: 3,
          mt: 1,
        }}
      >
        <CircularProgressWithLabel value={progress} />
        <Box>
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              size="small"
              label="Content Name"
              helperText="Enter a name of the content"
              variant="filled"
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              sx={{ width: "100%" }}
            />
            <Tags
              tag={tag}
              tags={tags}
              setTag={(a: string) => setTag(a)}
              handleTags={() => handleTags()}
              loading={loading}
              clearTags={(t: string) => clearTags(t)}
            />
            <Box sx={{ width: "100%" }}>
              <Button
                sx={{ mr: 1, mt: 1 }}
                disabled={loading}
                variant="outlined"
                color="error"
                onClick={cancelUpload}
              >
                Cancel
              </Button>
              <Button
                sx={{ mr: 1, mt: 1 }}
                disabled={loading}
                color="primary"
                variant="contained"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </Box>
          </Stack>
          <Typography>
            <b>Selected File</b> : {file.name}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default SingleFile;
