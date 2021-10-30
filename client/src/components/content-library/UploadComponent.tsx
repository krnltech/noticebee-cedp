import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import FilesComponent from "./FilesComponent";
import Stack from "@mui/material/Stack";

const UploadComponent: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    console.log(acceptedFiles);
    acceptedFiles.map((file: File) =>
      setFiles((oldArray) => [...oldArray, file])
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <Stack direction="column" spacing={2}>
      <Box sx={{ borderRadius: 1, padding: 2, backgroundColor: grey[50] }}>
        <Box
          sx={{
            padding: 2,
            backgroundColor: grey[50],
            border: "dashed",
            borderRadius: 1,
            borderWidth: 2.2,
            borderColor: grey[300],
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          <Typography paragraph>
            {isDragActive
              ? "Drop the files here ..."
              : "Drag 'n' drop some files here, or click to select files"}
          </Typography>
        </Box>
      </Box>
      <FilesComponent files={files} />
    </Stack>
  );
};

export default UploadComponent;
