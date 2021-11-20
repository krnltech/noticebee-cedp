import { Paper } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchAssets } from "../api/asset.api";
import { fetchNoticeSet } from "../api/noticeset.api";
import NoticeSetForm from "../components/noticesets/NoticeSetForm";
import { selectAdmin } from "../redux/slices/adminSlide";
import { Asset } from "../utils/interface/Asset.interface";
import {
  NoticeSet,
  NoticeSetAddFormData,
} from "../utils/interface/NoticeSet.interface";

const EditNoticeSet = () => {
  const history = useHistory();
  const { noticeSetId } = useParams<{ noticeSetId: string }>();
  const [noticeSet, setNoticeSet] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { admin } = useSelector(selectAdmin);
  const reloadAsset = () => {
    if (admin.id) {
      fetchAssets(admin.id, dispatch);
    }
  };

  useEffect(() => {
    reloadAsset();
    fetchNoticeSet();
  }, [admin]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     const noticeset =  fetchNoticeSet(noticeSetId);
  //     if (noticeSet) {
  //       setNoticeSet(noticeset);
  //     }
  //     setIsLoading(false);
  //   }, [noticeSetId]);

  const fetchNoticeSet = async () => {
    try {
      const { data }: AxiosResponse<{ noticeset: any }> = await axios.get(
        `http://localhost:5000/api/admin/noticeset/${noticeSetId}`
      );
      console.log(data);
      const ns = data.noticeset;
      let nsAssets = noticeSet?.assets;
      let tAssets: string[] = [];
      nsAssets?.map((asset: Asset) => {
        tAssets.push(asset._id);
      });
      ns.assets = tAssets;
      console.log(ns, tAssets, nsAssets);
      setNoticeSet(ns);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(noticeSet);
  }, [noticeSet]);

  return (
    <div>
      <h1>Add NoticeSets</h1>
      <Paper sx={{ padding: 3, maxWidth: "400px" }}>
        {isLoading ? (
          " . . . loading . . . "
        ) : (
          <>
            {noticeSet && (
              <NoticeSetForm
                purpose="edit"
                closeAction={() => history.goBack()}
                defaultvalues={noticeSet}
                noticeSetId={noticeSetId}
              />
            )}
          </>
        )}
      </Paper>
    </div>
  );
};

export default EditNoticeSet;
