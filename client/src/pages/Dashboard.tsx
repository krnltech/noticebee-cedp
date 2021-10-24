import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin } from "../redux/slices/adminSlide";
import { fetchBoards } from "../redux/slices/boardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector(selectAdmin);
  useEffect(() => {
    dispatch(fetchBoards(admin.id));
  }, []);
  return (
    <div>
      <h1>Dash</h1>
    </div>
  );
};

export default Dashboard;
