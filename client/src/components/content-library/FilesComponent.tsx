import { FC } from "react";
import SingleFile from "./SingleFile";
import Box from "@mui/material/Box";

type Prop = {
  files: File[];
};

const FilesComponent: FC<Prop> = ({ files }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {files.map((f, id) => (
        <SingleFile key={id} file={f} />
      ))}
    </Box>
  );
};

export default FilesComponent;
