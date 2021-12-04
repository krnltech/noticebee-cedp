import { Autocomplete, Button, Chip, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

type Props = {
  tag: string;
  tags: string[];
  loading: boolean;
  setTag: (a: string) => void;
  handleTags: () => void;
  clearTags: (t: string) => void;
};

const Tags: FC<Props> = ({
  tag,
  tags,
  loading,
  setTag,
  handleTags,
  clearTags,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Autocomplete
          size="small"
          id="tags"
          disabled={loading}
          disablePortal
          options={["a", "b"]}
          onChange={(event: any, newValue: string | null) => {
            setTag(newValue as string);
          }}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              value={tag}
              {...params}
              label="Tags"
              // helperText="Enter tags to add or set"
              variant="filled"
              type="text"
              onChange={(e) => setTag(e.target.value)}
            />
          )}
        />
        <Button
          disabled={loading}
          variant="contained"
          color="secondary"
          onClick={handleTags}
          sx={{ ml: 1 }}
        >
          Add
        </Button>
      </Box>
      {tags.map((t, id) => (
        <Chip
          label={t}
          color="primary"
          variant="outlined"
          key={id}
          onDelete={() => clearTags(t)}
        />
      ))}
    </>
  );
};

export default Tags;
