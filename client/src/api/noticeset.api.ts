import axios, { AxiosResponse } from "axios";
import {
  setNoticeSets,
  setNoticeSetsError,
  setNoticeSetsLoading,
} from "../redux/slices/noticesetSlice";
import {
  NoticeSet,
  NoticeSetAddApiResponse,
  NoticeSetAddFormData,
  NoticeSetApiResponse,
} from "../utils/interface/NoticeSet.interface";

export const fetchNoticeSets = async (
  organizationId: string,
  dispatch: any
) => {
  dispatch(setNoticeSetsLoading(true));
  try {
    const { data }: AxiosResponse<NoticeSetApiResponse> = await axios.get(
      `http://localhost:5000/api/admin/noticesets/${organizationId}`
    );
    dispatch(setNoticeSets(data.noticesets));
  } catch (error: any) {
    setNoticeSetsError(error.message);
  }
  dispatch(setNoticeSetsLoading(false));
};

export const fetchNoticeSet = async (noticeSetId: string) => {
  try {
    return new Promise(async function (resolve, reject) {
      const { data }: AxiosResponse<{ noticeset: NoticeSet }> = await axios.get(
        `http://localhost:5000/api/admin/noticeset/${noticeSetId}`
      );
      resolve(data.noticeset);
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addNoticeset = async (formData: NoticeSetAddFormData) => {
  try {
    const { data }: AxiosResponse<NoticeSetAddApiResponse> = await axios.post(
      "http://localhost:5000/api/admin/noticeset/add",
      formData
    );
    return data.message;
  } catch (error: any) {
    return error.message;
  }
};

export const editNoticeSet = async (
  formData: NoticeSetAddFormData,
  noticeSetId: string
) => {
  try {
    const { data }: AxiosResponse<NoticeSetAddApiResponse> = await axios.post(
      `http://localhost:5000/api/admin/edit/${noticeSetId}`,
      formData
    );
    return data.message;
  } catch (error: any) {
    return error.message;
  }
};
