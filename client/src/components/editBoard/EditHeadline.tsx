import { FC, useState } from "react";
import { Box } from "@mui/system";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { setBoardHeadline } from "../../api/boards.api";
import {
  BoardHeadlineSetFormData,
  FetchBoardType,
} from "../../utils/interface/Boards.interface";

type Props = {
  noticeBoard: FetchBoardType;
};

const EditHeadline: FC<Props> = ({ noticeBoard }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      headline: noticeBoard.headline || "",
    },
  });
  const onSubmit: SubmitHandler<BoardHeadlineSetFormData> = async (
    formData
  ) => {
    setLoading(true);
    let message: string;
    try {
      message = await setBoardHeadline(formData, noticeBoard._id);
    } catch (error: any) {
      message = error.message;
    }
    console.log(message);
    setEdit(false);
    setLoading(false);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <FormControl fullWidth>
            <TextField
              disabled={loading || !edit}
              label="RSS Scroll feed"
              multiline
              rows={4}
              {...register("headline")}
            />
          </FormControl>
        </Stack>
        {edit && (
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
          >
            Set Headlines
          </Button>
        )}
      </form>
      {edit ? (
        <Button
          type="button"
          variant="outlined"
          color="error"
          onClick={() => setEdit(false)}
        >
          Cancel
        </Button>
      ) : (
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={() => setEdit(true)}
        >
          Edit Headlines
        </Button>
      )}
    </Box>
  );
};

export default EditHeadline;
