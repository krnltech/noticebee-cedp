import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchAssets } from "../api/asset.api";
import { fetchNoticeSet as fns } from "../api/noticeset.api";
import NoticeSetForm from "../components/noticesets/NoticeSetForm";
import { selectAdmin } from "../redux/slices/adminSlide";
import { Asset } from "../utils/interface/Asset.interface";
import {
  NoticeSet,
  NoticeSetEditDefault,
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

  const fetchNoticeSet = async () => {
    setIsLoading(true);
    try {
      const noticeset: NoticeSet = await fns(noticeSetId);
      let ns: NoticeSetEditDefault = {
        _id: noticeset._id,
        name: noticeset.name,
        interval: noticeset.interval,
        startTime: noticeset.startTime,
        endTime: noticeset.endTime,
        admin: noticeset.admin,
        organization: noticeset.organization,
        shouldSchedule: noticeset.shouldSchedule,
        assets: [],
      };
      noticeset.assets?.map((asset: Asset) => {
        ns.assets.push(asset._id);
      });
      setNoticeSet(ns);
    } catch (error: any) {
      console.log(error);
      console.log(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Typography variant="h4" my={1}>
        Edit NoticeSets
      </Typography>
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
