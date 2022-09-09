import React, { useEffect, useState } from "react";
import LeftDrawer from "../components/adminPanelComponents/LeftDrawer";
import { useAppContext } from "../context/appContext/AppContext";
import {
  SET_ADMIN_OBJ,
  SET_MODULE_ADMIN_PANEL,
} from "../context/appContext/appActions";
import { useNavigate } from "react-router-dom";

const AdminPanelPage = () => {
  const [finishStatus, setfinishStatus] = useState(false);
  const { setActiveModule, setAdminAccess, setAdminObj } = useAppContext();
  const navigate = useNavigate();
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (
        window.confirm(
          "You will logout of the account,do you want to proceed ?"
        )
      ) {
        //("Going Back to home")
        setfinishStatus(true);
        // your logic
        navigate("/");
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false);
      }
    }
  };
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  useEffect(() => {
    //("Admin Panel use effect")
    setActiveModule(SET_MODULE_ADMIN_PANEL);
    if (window.sessionStorage.getItem("authAccess") === "true") {
      //("Cookie exists for admin")
      setAdminObj(window.sessionStorage.getItem("accessType"));
      setAdminAccess(true);
    } else {
      setAdminAccess(false);
    }
  }, []);
  return (
    <div>
      <LeftDrawer />
    </div>
  );
};

export default AdminPanelPage;
