import { FC, useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { NoticeSetAddFormData } from "../../utils/interface/NoticeSet.interface";
import { selectAdmin } from "../../redux/slices/adminSlide";
import { useSelector } from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { selectAsset } from "../../redux/slices/assetSlice";
import { addNoticeset, editNoticeSet } from "../../api/noticeset.api";

type DefaultValueType = {
  name: string;
  interval: number;
  organization: string | undefined;
  admin: string | undefined;
  assets: string[];
  shouldSchedule: boolean;
  startTime: Date;
  endTime: Date;
};

type Props = {
  purpose: string;
  defaultvalues: DefaultValueType;
  closeAction: () => void;
  noticeSetId: string;
};

const NoticeSetForm: FC<Props> = ({
  purpose,
  defaultvalues,
  closeAction,
  noticeSetId,
}) => {
  const [loading, setLoading] = useState(false);
  const [defaultStartDate, setDefaultStartDate] = useState<Date | null>(
    purpose === "add" ? new Date() : new Date()
  );
  const [defaultEndDate, setDefaultEndDate] = useState<Date | null>(
    purpose === "add" ? new Date() : new Date()
  );
  const { admin } = useSelector(selectAdmin);
  const { assets, isLoading } = useSelector(selectAsset);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: defaultvalues,
  });
  const { shouldSchedule, assets: selectedAssets } = watch();

  const onSubmit: SubmitHandler<NoticeSetAddFormData> = async (formData) => {
    setLoading(true);
    console.log(formData);
    let message: string;
    if (purpose === "add") {
      message = await addNoticeset(formData);
      console.log(message);
    } else {
      message = await editNoticeSet(formData, noticeSetId);
    }
    console.log(message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Name"
            helperText="enter a name for noticeset"
            variant="filled"
            type="text"
            {...register("name", { required: true })}
          />
          {(purpose === "add" && selectedAssets?.length) > 1 && (
            <TextField
              label="Interval"
              helperText="enter an interval (in seconds)"
              variant="filled"
              type="number"
              {...register("interval", {
                required: selectedAssets?.length > 1,
                validate: (v) => v > 1,
              })}
            />
          )}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={defaultvalues.shouldSchedule}
                  {...register("shouldSchedule")}
                />
              }
              label="Schedule ?"
            />
          </FormGroup>
          {shouldSchedule && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <p>Schedule start time</p>
              <DateTimePicker
                disablePast
                value={defaultStartDate}
                onChange={(date) => {
                  setDefaultStartDate(date);
                  if (date) {
                    setValue("startTime", date);
                  }
                }}
                // {...register("startTime")}
                renderInput={(params) => <TextField {...params} />}
              />
              <p>Schedule end time</p>
              <DateTimePicker
                disablePast
                value={defaultEndDate}
                onChange={(date) => {
                  setDefaultEndDate(date);
                  if (date) {
                    setValue("endTime", date);
                  }
                }}
                // {...register("endTime")}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          )}
        </Stack>
        <Stack direction="column" spacing={2}>
          <FormGroup sx={{ maxHeight: "800px" }}>
            {assets.map((asset, id) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    // checked={defaultvalues.assets.some(asset._id)}
                    value={asset._id}
                    {...register("assets")}
                  />
                }
                label={asset.name}
              />
            ))}
          </FormGroup>
        </Stack>
      </Stack>
      <FormGroup>
        <Button disabled={loading} onClick={closeAction} type="button">
          Cancel
        </Button>
        <Button disabled={loading} type="submit">
          {purpose === "add" ? "Add" : "Edit"}
        </Button>
      </FormGroup>
    </form>
  );
};

export default NoticeSetForm;
