import { FC } from "react";
import SingleFile from "./SingleFile";
import Box from "@mui/material/Box";

type Prop = {
  files: File[];
  removeFromList: (n: string) => void;
  reloadAsset: () => void;
};

const FilesComponent: FC<Prop> = ({ files, removeFromList, reloadAsset }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {files.map((f, id) => (
        <SingleFile
          key={id}
          file={f}
          removeFromList={(n: string) => removeFromList(n)}
          reloadAsset={() => reloadAsset()}
        />
      ))}
    </Box>
  );
};

export default FilesComponent;
