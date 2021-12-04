import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import FilesComponent from "./FilesComponent";
import Stack from "@mui/material/Stack";

type Prop = {
  reloadAsset: () => void;
};

const UploadComponent: FC<Prop> = ({ reloadAsset }) => {
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
  const removeFromList = (name: string) => {
    reloadAsset();
    setFiles(files.filter((item) => item.name !== name));
  };
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
          <input
            {...getInputProps()}
            accept="image/*, video/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pps, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation"
          />

          <Typography paragraph>
            {isDragActive
              ? "Drop the files here ..."
              : "Drag 'n' drop some files here, or click to select files"}
          </Typography>
        </Box>
      </Box>
      <FilesComponent
        files={files}
        reloadAsset={() => reloadAsset()}
        removeFromList={(n: string) => removeFromList(n)}
      />
    </Stack>
  );
};

export default UploadComponent;
