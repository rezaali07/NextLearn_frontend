import React, { useState } from "react";
import "./UserOption.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Support from "@material-ui/icons/ReportProblem";
import HeartIcon from "@material-ui/icons/FavoriteBorder";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../actions/UserActions";

const UserData = ({ user }) => {
  const favouriteItems = useSelector((state) => state.favourite?.favouriteItems || []);

  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const dashboard = () => history.push("/dashboard");
  const home = () => history.push("/");
  const favourite = () => history.push("/favourites");
  const account = () => history.push("/me");
  const settings = () => history.push("/settings");
  const report = () => history.push("/support");
  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
  };

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <HomeIcon />, name: "Home", func: home },
    {
      icon: (
        <HeartIcon
          style={{ color: favouriteItems.length > 0 ? "tomato" : "gray" }}
        />
      ),
      name: `Favourites (${favouriteItems.length})`,
      func: favourite,
    },
    { icon: <Support />, name: "Report Us", func: report },
    { icon: <SettingsIcon />, name: "Settings", func: settings },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user?.role === "admin" || user?.role === "Creator") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <>
      <Backdrop
        open={open}
        style={{ zIndex: 10, backgroundColor: "rgba(0,0,0,0.5)" }}
      />
      <SpeedDial
        ariaLabel="User Options"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user?.avatar?.url || "/profile.png"}
            alt="Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/profile.png";
            }}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen
            classes={{ tooltip: "customTooltip" }}
          />
        ))}
      </SpeedDial>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable
      />
    </>
  );
};

export default UserData;
