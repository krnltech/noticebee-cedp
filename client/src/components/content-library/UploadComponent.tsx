import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const UploadComponent: FC = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <Box sx={{ borderRadius: 1, padding: 2, backgroundColor: grey[50] }}>
      <Box
        sx={{
          padding: 2,
          backgroundColor: grey[50],
          border: "dotted",
          borderRadius: 1,
          borderBlockColor: grey[300],
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Box>
    </Box>
  );
};

export default UploadComponent;
