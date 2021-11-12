import axios, { AxiosResponse } from "axios";
import {
  setNoticeSets,
  setNoticeSetsError,
  setNoticeSetsLoading,
} from "../redux/slices/noticesetSlice";
import { NoticeSetApiResponse } from "../utils/interface/NoticeSet.interface";

export const fetchNoticeSets = async (
  organizationId: string,
  dispatch: any
) => {
  dispatch(setNoticeSetsLoading(true));
  try {
    const { data }: AxiosResponse<NoticeSetApiResponse> = await axios.get(
      `http://localhost:5000/api/getNoticesets/${organizationId}`
    );
    dispatch(setNoticeSets(data.noticesets));
  } catch (error: any) {
    setNoticeSetsError(error.message);
  }
  dispatch(setNoticeSetsLoading(false));
};
