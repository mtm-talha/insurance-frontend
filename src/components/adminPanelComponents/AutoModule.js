import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import {
  getDoc,
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  query,
  where,
  onSnapshot,
  document,
  getDocs,
  orderBy,
  limit,
} from "@firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import { TailSpin } from "react-loader-spinner";

const AutoModule = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const { pageSize, setPageSize } = useState(5);
  const { rowsPerPage, setRowsPerPage } = useState([25]);
  const { lastDoc, setLastDoc } = useState("");
  async function loadDataFromDB() {
    const querySnapshot = await getDocs(collection(db, "autoClients"));
    const clientLocalArr = [];
    if (!querySnapshot.empty) {
      //("Clients Found!")

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //(doc.id, " => ", doc.data())
        const id = doc.id;
        // //("Time stamp is now " + doc.data().createdAt)
        const clientObj = {
          id: doc.id,
          secondDriver: doc.data().secondDriverAdded ? "Yes" : "No",
          secondCar: doc.data().secondCarAdded ? "Yes" : "No",

          fcmake:
            doc.data().firstVehicle.Make == null
              ? "N/A"
              : doc.data().firstVehicle.Make,
          fcmodel:
            doc.data().firstVehicle.Model == null
              ? "N/A"
              : doc.data().firstVehicle.Model,
          fcyear:
            doc.data().firstVehicle.Year == null
              ? "N/A"
              : doc.data().firstVehicle.Year,

          scmake:
            doc.data().secondVehicle.Make == null
              ? "N/A"
              : doc.data().secondVehicle.Make,
          scmodel:
            doc.data().secondVehicle.Model == null
              ? "N/A"
              : doc.data().secondVehicle.Model,
          scyear:
            doc.data().secondVehicle.Year == null
              ? "N/A"
              : doc.data().secondVehicle.Year,
          insured: doc.data().insured,
          insuranceName:
            doc.data().insuranceName == null ? "N/A" : doc.data().insuranceName,
          insuranceTime:
            doc.data().insuranceTime == null ? "N/A" : doc.data().insuranceName,

          fdfname:
            doc.data().firstDriver.Fname == null
              ? "N/A"
              : doc.data().firstDriver.Fname,
          fdlname:
            doc.data().firstDriver.Lname == null
              ? "N/A"
              : doc.data().firstDriver.Lname,
          fdaccident:
            doc.data().firstDriver.AtFaultAccident == null
              ? "N/A"
              : doc.data().firstDriver.AtFaultAccident,
          fddob:
            doc.data().firstDriver.DOB == null
              ? "N/A"
              : doc.data().firstDriver.DOB,
          fdgender:
            doc.data().firstDriver.Gender == null
              ? "N/A"
              : doc.data().firstDriver.Gender,
          fdmarried:
            doc.data().firstDriver.Married == null
              ? "N/A"
              : doc.data().firstDriver.Married,
          fddui:
            doc.data().firstDriver.DUI == null
              ? "N/A"
              : doc.data().firstDriver.DUI,
          sdfname:
            doc.data().secondDriver.Fname == null
              ? "N/A"
              : doc.data().secondDriver.Fname,
          sdlname:
            doc.data().secondDriver.Lname == null
              ? "N/A"
              : doc.data().secondDriver.Lname,
          sdaccident:
            doc.data().secondDriver.AtFaultAccident == null
              ? "N/A"
              : doc.data().secondDriver.AtFaultAccident,
          sddob:
            doc.data().secondDriver.DOB == null
              ? "N/A"
              : doc.data().secondDriver.DOB,
          sdgender:
            doc.data().secondDriver.Gender == null
              ? "N/A"
              : doc.data().secondDriver.Gender,
          sdmarried:
            doc.data().secondDriver.Married == null
              ? "N/A"
              : doc.data().secondDriver.Married,
          sddui:
            doc.data().secondDriver.DUI == null
              ? "N/A"
              : doc.data().secondDriver.DUI,

          name: doc.data().name,
          gender: doc.data().gender,
          phone: doc.data().phone,
          address: doc.data().address,
          dob: doc.data().dob,
          si: doc.data().stateInitial,
          city: doc.data().city,
          zip: doc.data().zip,
          email: doc.data().email,
          ip: doc.data().clientIP,
          jid: doc.data().jornayaID,
          // createdAt: new Date(doc.data().createdAt.seconds * 1000),
          createdAt: doc.data().createdAt,
        };

        clientLocalArr.push(clientObj);
      });
      setClients(clientLocalArr);
      setLoading(false);
      return true;
    } else {
      //("There are no Clients yet!")
    }
  }

  // const rows: GridRowsProp = [
  //   { id: 1, col1: "Hello", col2: "World" },
  //   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  //   { id: 3, col1: "MUI", col2: "is Amazing" },
  // ]
  const rows = clients;

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150 },

    { field: "fdfname", headerName: "FD First Name", minWidth: 150 },
    { field: "fdlname", headerName: "FD Last Name", minWidth: 150 },
    { field: "fdaccident", headerName: "FD Accident", minWidth: 150 },
    { field: "fddob", headerName: "FD DOB", minWidth: 150 },
    { field: "fdgender", headerName: "FD Gender", minWidth: 150 },
    { field: "fdmarried", headerName: "FD Married", minWidth: 150 },
    { field: "fddui", headerName: "FD DUI", minWidth: 150 },

    { field: "fcmake", headerName: "FC Make", minWidth: 150 },
    { field: "fcmodel", headerName: "FC Model", minWidth: 150 },
    { field: "fcyear", headerName: "FC Year", minWidth: 150 },

    { field: "secondDriver", headerName: "Second Driver Added", minWidth: 150 },

    { field: "sdfname", headerName: "SD First Name", minWidth: 150 },
    { field: "sdlname", headerName: "SD Last Name", minWidth: 150 },
    { field: "sdaccident", headerName: "SD Accident", minWidth: 150 },
    { field: "sddob", headerName: "SD DOB", minWidth: 150 },
    { field: "sdgender", headerName: "SD Gender", minWidth: 150 },
    { field: "sdmarried", headerName: "SD Married", minWidth: 150 },
    { field: "sddui", headerName: "SD DUI", minWidth: 150 },
    { field: "secondCar", headerName: "Second Car Added", minWidth: 150 },

    { field: "scmake", headerName: "SC Make", minWidth: 150 },
    { field: "scmodel", headerName: "SC Model", minWidth: 150 },
    { field: "scyear", headerName: "SC Year", minWidth: 150 },

    { field: "insured", headerName: "Prev. Insured", minWidth: 150 },
    {
      field: "insuranceName",
      headerName: "Prev. Insurance Name",
      minWidth: 150,
    },
    {
      field: "insuranceTime",
      headerName: "Time with prev. Insurance",
      minWidth: 150,
    },
    { field: "phone", headerName: "Phone", minWidth: 150 },
    { field: "address", headerName: "Address", minWidth: 150 },
    { field: "si", headerName: "State", minWidth: 150 },
    { field: "city", headerName: "City", minWidth: 150 },
    { field: "zip", headerName: "ZIP", minWidth: 150 },
    { field: "email", headerName: "Email", minWidth: 150 },
    { field: "ip", headerName: "IP Address", minWidth: 150 },
    { field: "jid", headerName: "Jornaya ID", minWidth: 320 },
    { field: "createdAt", headerName: "Creation TS", minWidth: 300 },
    { field: "sourceUrl", headerName: "Source Url", minWidth: 300 },
  ];
  useEffect(() => {
    // loadDataFromDB()
    const q = query(
      collection(db, "autoClients"),
      orderBy("createdAt", "desc"),
      limit(5000)
    );
    // onSnapshot(collection(db, "autoClients"), (snapshot) => {
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // //(
        //   "Time stamp is now " +
        //     new Date(change.doc.data().createdAt.seconds * 1000).toLocaleString(
        //       "en-US",
        //       { timeZone: "US/Central" }
        //     )
        // )
        if (change.type === "added") {
          const clientObj = {
            id: change.doc.id,
            secondDriver: change.doc.data().secondDriverAdded ? "Yes" : "No",
            secondCar: change.doc.data().secondCarAdded ? "Yes" : "No",
            fcmake:
              change.doc.data().firstVehicle.Make == null
                ? "N/A"
                : change.doc.data().firstVehicle.Make,
            fcmodel:
              change.doc.data().firstVehicle.Model == null
                ? "N/A"
                : change.doc.data().firstVehicle.Model,
            fcyear:
              change.doc.data().firstVehicle.Year == null
                ? "N/A"
                : change.doc.data().firstVehicle.Year,

            scmake:
              change.doc.data().secondVehicle.Make == null
                ? "N/A"
                : change.doc.data().secondVehicle.Make,
            scmodel:
              change.doc.data().secondVehicle.Model == null
                ? "N/A"
                : change.doc.data().secondVehicle.Model,
            scyear:
              change.doc.data().secondVehicle.Year == null
                ? "N/A"
                : change.doc.data().secondVehicle.Year,
            insured: change.doc.data().insured,
            insuranceName:
              change.doc.data().insuranceName == null
                ? "N/A"
                : change.doc.data().insuranceName,
            insuranceTime:
              change.doc.data().insuranceTime == null
                ? "N/A"
                : change.doc.data().insuranceName,

            fdfname:
              change.doc.data().firstDriver.Fname == null
                ? "N/A"
                : change.doc.data().firstDriver.Fname,
            fdlname:
              change.doc.data().firstDriver.Lname == null
                ? "N/A"
                : change.doc.data().firstDriver.Lname,
            fdaccident:
              change.doc.data().firstDriver.AtFaultAccident == null
                ? "N/A"
                : change.doc.data().firstDriver.AtFaultAccident,
            fddob:
              change.doc.data().firstDriver.DOB == null
                ? "N/A"
                : change.doc.data().firstDriver.DOB,
            fdgender:
              change.doc.data().firstDriver.Gender == null
                ? "N/A"
                : change.doc.data().firstDriver.Gender,
            fdmarried:
              change.doc.data().firstDriver.Married == null
                ? "N/A"
                : change.doc.data().firstDriver.Married,
            fddui:
              change.doc.data().firstDriver.DUI == null
                ? "N/A"
                : change.doc.data().firstDriver.DUI,
            sdfname:
              change.doc.data().secondDriver.Fname == null
                ? "N/A"
                : change.doc.data().secondDriver.Fname,
            sdlname:
              change.doc.data().secondDriver.Lname == null
                ? "N/A"
                : change.doc.data().secondDriver.Lname,
            sdaccident:
              change.doc.data().secondDriver.AtFaultAccident == null
                ? "N/A"
                : change.doc.data().secondDriver.AtFaultAccident,
            sddob:
              change.doc.data().secondDriver.DOB == null
                ? "N/A"
                : change.doc.data().secondDriver.DOB,
            sdgender:
              change.doc.data().secondDriver.Gender == null
                ? "N/A"
                : change.doc.data().secondDriver.Gender,
            sdmarried:
              change.doc.data().secondDriver.Married == null
                ? "N/A"
                : change.doc.data().secondDriver.Married,
            sddui:
              change.doc.data().secondDriver.DUI == null
                ? "N/A"
                : change.doc.data().secondDriver.DUI,

            name: change.doc.data().name,
            gender: change.doc.data().gender,
            phone: change.doc.data().phone,
            address: change.doc.data().address,
            dob: change.doc.data().dob,
            si: change.doc.data().stateInitial,
            city: change.doc.data().city,
            zip: change.doc.data().zip,
            email: change.doc.data().email,
            ip: change.doc.data().clientIP,
            jid: change.doc.data().jornayaID,
            createdAt:
              new Date(
                change.doc.data().createdAt.seconds * 1000
              ).toLocaleString("en-US", { timeZone: "US/Central" }) +
              "\tUS/Central Timezone",
            sourceUrl: "https://advancedinsonline.com/auto-insurance",
          };
          setClients((oldArray) => [...oldArray, clientObj]);
        }
      });
    });
  }, []);
  useEffect(() => {
    //("Clients are:", clients)
    if (clients.length > 0) {
      setLoading(false);
    }
  }, [clients]);
  return (
    <>
      <div style={styles.topBar}>
        <Typography style={styles.heading}>Auto Clients</Typography>
        {/* <Typography>30 total entries</Typography> */}
      </div>

      {loading ? (
        <TailSpin
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        // timeout={3000} //3 secs
        />
      ) : (
        <div style={{ height: 650, width: "100%" }}>
          {/* <DataGrid getRowId={(r) => r.id} rows={rows} columns={columns} /> */}
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            style={{ width: "100%" }}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      )}
    </>
  );
};

const styles = {
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "30px",
  },
};

export default AutoModule;
