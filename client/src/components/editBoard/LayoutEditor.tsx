import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectNoticeSet } from "../../redux/slices/noticesetSlice";
import Loader from "../layouts/Loader";

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
        <Loader />
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
