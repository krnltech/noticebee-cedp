import { FC, useState } from "react";
import { Box } from "@mui/system";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { setBoardLayout } from "../../api/boards.api";
import { Board } from "../../utils/interface/Boards.interface";

type BoardHeadlineFormData = {
  headlineOne: string;
  headlineTwo: string;
};

type Props = {
  noticeBoard: FetchBoardType;
};

const EditHeadline: FC<Props> = ({ noticeBoard }) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      headlineOne: "",
      headlineTwo: "",
    },
  });
  const onSubmit: SubmitHandler<BoardHeadlineFormData> = async (formData) => {
    setLoading(true);
    let message: string;
    try {
      message = await setBoardLayout(formData, noticeBoard._id);
    } catch (error: any) {
      message = error.message;
    }
    console.log(message);
    setLoading(false);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <FormControl fullWidth>
            <TextField
              disabled={loading}
              label="Primary headline"
              multiline
              rows={4}
              {...register("headlineOne")}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              disabled={loading}
              label="Secondary headline"
              multiline
              rows={4}
              {...register("headlineTwo")}
            />
          </FormControl>
        </Stack>
        <Button disabled={loading} type="submit">
          Set Headlines
        </Button>
      </form>
    </Box>
  );
};

export default EditHeadline;
