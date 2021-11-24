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
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FetchBoardType } from "../../utils/interface/Boards.interface";
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

type LayoutFormData = {
  room: string[];
  type: string;
};

type Props = {
  noticeBoard: FetchBoardType;
};

const EditLayout: FC<Props> = ({ noticeBoard }) => {
  const { setValue, control, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: {
      type: layouts[0],
      rooms: [],
    },
  });

  const handleLayoutChange = (idx: number, value: string) => {
    let v = `rooms[${idx.toString()}]`;
    setValue(v as "type" | "rooms", value);
  };

  const { type, rooms } = watch();
  const onsubmit: SubmitHandler<LayoutFormData> = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    reset({ ...getValues(), rooms: [] });
  }, [type]);

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
            <Stack direction="row" spacing={2}>
              <LayoutEditor
                idx={0}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[0]}
              />
            </Stack>
          )}
          {type === "one-one" && (
            <Stack direction="row" spacing={2}>
              <LayoutEditor
                idx={0}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[0]}
              />
              <LayoutEditor
                idx={1}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[1]}
              />
            </Stack>
          )}
          {type === "one-two" && (
            <Stack direction="row" spacing={2}>
              <LayoutEditor
                idx={0}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[0]}
              />
              <Stack direction="column" spacing={2}>
                <LayoutEditor
                  idx={1}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[1]}
                />
                <LayoutEditor
                  idx={2}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[2]}
                />
              </Stack>
            </Stack>
          )}
          {type === "two-one" && (
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={2}>
                <LayoutEditor
                  idx={0}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[0]}
                />
                <LayoutEditor
                  idx={1}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[1]}
                />
              </Stack>

              <LayoutEditor
                idx={2}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[2]}
              />
            </Stack>
          )}
          {type === "one-one-one" && (
            <Stack direction="row" spacing={2}>
              <LayoutEditor
                idx={0}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[0]}
              />
              <LayoutEditor
                idx={1}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[1]}
              />
              <LayoutEditor
                idx={2}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[2]}
              />
            </Stack>
          )}
          {type === "two-two" && (
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={2}>
                <LayoutEditor
                  idx={0}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[0]}
                />
                <LayoutEditor
                  idx={1}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[1]}
                />
              </Stack>

              <Stack direction="column" spacing={2}>
                <LayoutEditor
                  idx={2}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[2]}
                />
                <LayoutEditor
                  idx={3}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[3]}
                />
              </Stack>
            </Stack>
          )}
          {type === "two-one-one" && (
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={2}>
                <LayoutEditor
                  idx={0}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[0]}
                />
                <LayoutEditor
                  idx={1}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[1]}
                />
              </Stack>

              <LayoutEditor
                idx={2}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[2]}
              />
              <LayoutEditor
                idx={3}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[3]}
              />
            </Stack>
          )}
          {type === "one-two-one" && (
            <Stack direction="row" spacing={2}>
              <LayoutEditor
                idx={0}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[0]}
              />
              <Stack direction="column" spacing={2}>
                <LayoutEditor
                  idx={1}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[1]}
                />
                <LayoutEditor
                  idx={2}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[2]}
                />
              </Stack>

              <LayoutEditor
                idx={3}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[3]}
              />
            </Stack>
          )}
          {type === "one-one-two" && (
            <Stack direction="row" spacing={2}>
              <LayoutEditor
                idx={0}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[0]}
              />
              <LayoutEditor
                idx={1}
                handleLayoutChange={(a: number, b: string) =>
                  handleLayoutChange(a, b)
                }
                room={rooms[1]}
              />
              <Stack direction="column" spacing={2}>
                <LayoutEditor
                  idx={2}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[2]}
                />
                <LayoutEditor
                  idx={3}
                  handleLayoutChange={(a: number, b: string) =>
                    handleLayoutChange(a, b)
                  }
                  room={rooms[3]}
                />
              </Stack>
            </Stack>
          )}
        </Box>
        <Button type="submit">Set Layout</Button>
      </form>
    </Container>
  );
};

export default EditLayout;
