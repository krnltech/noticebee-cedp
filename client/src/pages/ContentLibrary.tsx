import { FC, useState } from "react";
// import Button from "@mui/material/Button";
import UploadComponent from "../components/content-library/UploadComponent";

const ContentLibrary: FC = () => {
  // const [addNew, setAddNew] = useState(false);
  return (
    <div>
      <h1>ContentLibrary</h1>
      {/* <Button onClick={() => setAddNew((an) => !an)}>
        {addNew ? "Cancel" : "Add new content"}
      </Button> */}
      <UploadComponent />
    </div>
  );
};

export default ContentLibrary;
