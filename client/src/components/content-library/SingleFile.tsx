import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { selectAdmin } from "../../redux/slices/adminSlide";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

type Prop = {
  file: File;
  removeFromList: (n: string) => void;
  reloadAsset: () => void;
};

const SingleFile: FC<Prop> = ({ file, removeFromList, reloadAsset }) => {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const { admin } = useSelector(selectAdmin);

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
              url: `http://localhost:5000/api/asset/append`,
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
              onUploadProgress: (progressEvent) => console.log(progressEvent),
            })
          );
        }
        axios.all(axiosRequests).then(async (info) => {
          console.log(info);
          const { data } = await axios.post(
            "http://localhost:5000/api/asset/finish",
            {
              name,
              fileName,
              orgId,
              adminId,
            }
          );
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

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        borderWidth: 1,
        borderColor: "primary.main",
        borderStyle: "solid",
        padding: 1,
      }}
    >
      <CircularProgressWithLabel value={progress} />
      <Box>
        <Stack
          direction="row"
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
          />
          <Button disabled={loading} onClick={handleUpload}>
            Ok
          </Button>
        </Stack>
        <Typography>
          <b>Selected File</b> : {file.name}
        </Typography>
      </Box>
    </Stack>
  );
};

export default SingleFile;
