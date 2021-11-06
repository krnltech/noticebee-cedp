import { FC } from "react";
import SingleFile from "./SingleFile";
import Box from "@mui/material/Box";

type Prop = {
  files: File[];
  removeFromList: (n: string) => void;
};

const FilesComponent: FC<Prop> = ({ files, removeFromList }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {files.map((f, id) => (
        <SingleFile
          key={id}
          file={f}
          removeFromList={(n: string) => removeFromList(n)}
        />
      ))}
    </Box>
  );
};

export default FilesComponent;
