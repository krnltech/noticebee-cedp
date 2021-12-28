import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { setBoardLayout } from "../../api/boards.api";
import {
  FetchBoardType,
  LayoutFormData,
} from "../../utils/interface/Boards.interface";
import LayoutEditor from "./LayoutEditor";
import { socket as io } from "../../api/socket.api";
import { selectAdmin } from "../../redux/slices/adminSlide";
import { useSelector } from "react-redux";
const layouts: string[] = [
  "one",
  "one-one",
  "one-two",
  "two-one",
  "one-one-one",
  "two-two",
  "one-one-two",
  "one-two-one",
  "two-one-one",
];

type Props = {
  noticeBoard: FetchBoardType;
};

const EditLayout: FC<Props> = ({ noticeBoard }) => {
  const { admin, isAuthenticated } = useSelector(selectAdmin);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);
  const methods = useForm({
    defaultValues: {
      type: noticeBoard.type || layouts[0],
      rooms: noticeBoard.rooms || [],
    },
  });
  const { setValue, control, handleSubmit, watch, reset, getValues } = methods;

  const handleLayoutChange = (idx: number, value: string) => {
    let v = `rooms[${idx.toString()}]`;
    setValue(v as "type" | "rooms", value);
  };

  const { type, rooms } = watch();
  const onsubmit: SubmitHandler<LayoutFormData> = async (formData) => {
    setLoading(true);
    let message: string;
    try {
      message = await setBoardLayout(formData, noticeBoard._id);
      io.emit("update", { admin });
    } catch (error: any) {
      message = error.message;
    }
    console.log(message);
    setLoading(false);
  };

  useEffect(() => {
    reset({ ...getValues(), rooms: noticeBoard.rooms });
  }, [type]);

  return (
    <Container sx={{ m: 2 }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onsubmit)} style={{ margin: "10px" }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Layout type</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="type"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  {layouts.map((layout, id) => (
                    <FormControlLabel
                      key={id}
                      value={layout}
                      control={<Radio disabled={loading || !edit} />}
                      label={layout.toUpperCase()}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl>
          <Box>
            {type === "one" && (
              <Stack direction="row" spacing={2}>
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={0}
                  room={rooms[0]}
                />
              </Stack>
            )}
            {type === "one-one" && (
              <Stack direction="row" spacing={2}>
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={0}
                  room={rooms[0]}
                />
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={1}
                  room={rooms[1]}
                />
              </Stack>
            )}
            {type === "one-two" && (
              <Stack direction="row" spacing={2}>
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={0}
                  room={rooms[0]}
                />
                <Stack direction="column" spacing={2}>
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={1}
                    room={rooms[1]}
                  />
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={2}
                    room={rooms[2]}
                  />
                </Stack>
              </Stack>
            )}
            {type === "two-one" && (
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={2}>
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={0}
                    room={rooms[0]}
                  />
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={1}
                    room={rooms[1]}
                  />
                </Stack>

                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={2}
                  room={rooms[2]}
                />
              </Stack>
            )}
            {type === "one-one-one" && (
              <Stack direction="row" spacing={2}>
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={0}
                  room={rooms[0]}
                />
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={1}
                  room={rooms[1]}
                />
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={2}
                  room={rooms[2]}
                />
              </Stack>
            )}
            {type === "two-two" && (
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={2}>
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={0}
                    room={rooms[0]}
                  />
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={1}
                    room={rooms[1]}
                  />
                </Stack>

                <Stack direction="column" spacing={2}>
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={2}
                    room={rooms[2]}
                  />
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={3}
                    room={rooms[3]}
                  />
                </Stack>
              </Stack>
            )}
            {type === "two-one-one" && (
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={2}>
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={0}
                    room={rooms[0]}
                  />
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={1}
                    room={rooms[1]}
                  />
                </Stack>

                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={2}
                  room={rooms[2]}
                />
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={3}
                  room={rooms[3]}
                />
              </Stack>
            )}
            {type === "one-two-one" && (
              <Stack direction="row" spacing={2}>
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={0}
                  room={rooms[0]}
                />
                <Stack direction="column" spacing={2}>
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={1}
                    room={rooms[1]}
                  />
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={2}
                    room={rooms[2]}
                  />
                </Stack>

                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={3}
                  room={rooms[3]}
                />
              </Stack>
            )}
            {type === "one-one-two" && (
              <Stack direction="row" spacing={2}>
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={0}
                  room={rooms[0]}
                />
                <LayoutEditor
                  edit={edit}
                  loading={loading}
                  type={noticeBoard.type}
                  idx={1}
                  room={rooms[1]}
                />
                <Stack direction="column" spacing={2}>
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={2}
                    room={rooms[2]}
                  />
                  <LayoutEditor
                    edit={edit}
                    loading={loading}
                    type={noticeBoard.type}
                    idx={3}
                    room={rooms[3]}
                  />
                </Stack>
              </Stack>
            )}
          </Box>
          {edit && (
            <Button type="submit" variant="contained" color="primary">
              Set Layout
            </Button>
          )}
        </form>
      </FormProvider>
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
          Edit Layout
        </Button>
      )}
    </Container>
  );
};

export default EditLayout;
