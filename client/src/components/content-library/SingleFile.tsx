import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

type Prop = {
  file: File;
};

const uploadApi = async (
  chunk: ArrayBuffer,
  headers: Headers,
  chunkId: number,
  chunkCount: number
) => {
  let route: string;
  if (chunkId === 0) {
    route = "start";
  } else if (chunkId + 1 > chunkCount) {
    route = "finish";
  } else {
    route = "append";
  }
  let req = new Request(`http://localhost:5000/api/asset/${route}`, {
    method: "POST",
    headers,
    mode: "cors",
    body: chunk,
  });
  console.log(route);
  await fetch(req)
    .then((res) => res.json())
    .then((data) => {
      //   if (data.success) {
      //     if (chunkId + 1 > chunkCount) {
      //       setLoading(false);
      //       setProgress(0);
      //     }
      //   } else {
      //     console.log(data.message);
      //     setLoading(false);
      //   }
    })
    .catch((err) => console.log(err.message));
};

const SingleFile: FC<Prop> = ({ file }) => {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const upload = (targetFile: File) => {
    setLoading(true);
    try {
      const fileReader = new FileReader();
      const CHUNK_SIZE = 10000;
      fileReader.onload = async (ev) => {
        let fileResult = ev.target?.result as ArrayBuffer;
        let chunkCount = fileResult.byteLength / CHUNK_SIZE;
        console.log({ filesize: fileResult.byteLength, chunkCount });
        for (let chunkId = 0; chunkId < chunkCount + 1; chunkId++) {
          const chunk = fileResult.slice(
            chunkId * CHUNK_SIZE,
            chunkId * CHUNK_SIZE + CHUNK_SIZE
          );
          const uniqueSuffix = file.name.trim();
          let ext = uniqueSuffix.substring(uniqueSuffix.lastIndexOf(".") + 1);
          let fileName = `File${Math.random().toString(36).slice(2)}.${ext}`;
          let headers = new Headers();
          headers.append("Accept", "Application/JSON");
          headers.append("Access-Control-Allow-Origin", "*");
          headers.append("content-type", "application/octet-stream");
          headers.append("content-length", chunk.byteLength.toString());
          headers.append("x-values", name);
          headers.append("x-filename", fileName);
          //   console.log(Math.round((chunkId * 100) / chunkCount));

          uploadApi(chunk, headers, chunkId, chunkCount);

          setProgress(Math.round((chunkId * 100) / chunkCount));
          //   console.log(chunkId);
        }
      };
      if (targetFile) {
        fileReader.readAsArrayBuffer(targetFile);
      }
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const handleUpload = () => {
    if (name) {
      upload(file);
    } else {
      alert("Please give a name to file");
    }
  };

  useEffect(() => {
    // upload(file);
  }, []);
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
