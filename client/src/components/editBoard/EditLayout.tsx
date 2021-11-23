import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useForm, WatchInternal } from "react-hook-form";
import LayoutEditor from "./LayoutEditor";

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

const EditLayout = () => {
  const { setValue, control, handleSubmit, watch } = useForm({
    defaultValues: {
      type: layouts[0],
      rooms: [],
    },
  });

  const handleLayoutChange = (idx: number, value: string) => {
    setValue(`rooms[${idx.toString()}]`, value);
  };

  const { type, rooms } = watch();
  const onsubmit = async () => {};
  return (
    <Container>
      <form onSubmit={handleSubmit(onsubmit)}>
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
                    control={<Radio />}
                    label={layout.toUpperCase()}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>
        <Box>
          {type === "one" && (
            <>
              <LayoutEditor
                idx={0}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[0]}
              />
            </>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default EditLayout;
