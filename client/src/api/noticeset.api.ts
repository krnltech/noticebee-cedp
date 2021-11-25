import axios, { AxiosResponse } from "axios";
import {
  setNoticeSets,
  setNoticeSetsError,
  setNoticeSetsLoading,
} from "../redux/slices/noticesetSlice";
import { MessageResponse } from "../utils/interface/Axios.interface";
import {
  NoticeSet,
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
  return new Promise<NoticeSet>(async function (resolve, reject) {
    try {
      const { data }: AxiosResponse<{ noticeset: NoticeSet }> = await axios.get(
        `http://localhost:5000/api/admin/noticeset/${noticeSetId}`
      );
      resolve(data.noticeset);
    } catch (error: any) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const addNoticeset = async (formData: NoticeSetAddFormData) => {
  return new Promise<string>(async function (resolve, reject) {
    try {
      const { data }: AxiosResponse<MessageResponse> = await axios.post(
        "http://localhost:5000/api/admin/noticeset/add",
        formData
      );
      resolve(data.message);
    } catch (error: any) {
      reject(error);
    }
  });
};

export const editNoticeSet = async (
  formData: NoticeSetAddFormData,
  noticeSetId: string
) => {
  return new Promise<string>(async function (resolve, reject) {
    try {
      const { data }: AxiosResponse<MessageResponse> = await axios.post(
        `http://localhost:5000/api/admin/noticeset/edit/${noticeSetId}`,
        formData
      );
      resolve(data.message);
    } catch (error: any) {
      reject(error);
    }
  });
};
