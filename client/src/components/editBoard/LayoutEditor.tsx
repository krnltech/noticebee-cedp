import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { useSelector } from "react-redux";
import { selectNoticeSet } from "../../redux/slices/noticesetSlice";

type Props = {
  handleLayoutChange: (a: number, b: string) => void;
  idx: number;
  room: string;
};

const LayoutEditor: FC<Props> = ({ handleLayoutChange, idx, room }) => {
  const { noticeSets, isLoading } = useSelector(selectNoticeSet);
  const handleChange = (e: SelectChangeEvent) => {
    handleLayoutChange(idx, e.target.value);
  };
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Select noticeset for this layout
        </InputLabel>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={room || ""}
            label="Select noticeset for this layout"
            onChange={handleChange}
          >
            {noticeSets.map((ns, id) => (
              <MenuItem key={id} value={ns._id}>
                {ns.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </Box>
  );
};

export default LayoutEditor;
