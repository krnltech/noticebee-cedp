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
import { Control, Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectNoticeSet } from "../../redux/slices/noticesetSlice";
import { LayoutFormData } from "../../utils/interface/Boards.interface";

type Props = {
  idx: number;
  room: string;
  type?: string;
  edit: boolean;
  loading: boolean;
};

const LayoutEditor: FC<Props> = ({ idx, room, loading, edit }) => {
  const { noticeSets, isLoading } = useSelector(selectNoticeSet);
  const { control } = useFormContext();

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select noticeset for this layout
          </InputLabel>
          <Controller
            name={`rooms.${idx}`}
            defaultValue={room || ""}
            control={control}
            render={({ field }) => (
              <Select
                sx={{ width: "100%" }}
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select noticeset for this layout"
                disabled={loading || !edit}
              >
                {noticeSets.map((ns, id) => (
                  <MenuItem key={id} value={ns._id}>
                    {ns.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      )}
    </Box>
  );
};

export default LayoutEditor;
