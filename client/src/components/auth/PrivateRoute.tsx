import { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectAdmin } from "../../redux/slices/adminSlide";

const PrivateRoute: React.FC<{
  component: FC;
  path: string;
  exact: boolean;
}> = ({ exact, path, component }) => {
  const { isAuthenticated } = useSelector(selectAdmin);

  return (
    <>
      {isAuthenticated ? (
        <Route path={path} exact={exact} component={component} />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};
export default PrivateRoute;
