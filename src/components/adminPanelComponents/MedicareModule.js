import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
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
} from "@firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import { TailSpin } from "react-loader-spinner";
import { Container } from "@mui/material";

const MedicareModule = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  const rows = clients;

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "fname", headerName: "First Name", width: 150, editable: true },
    { field: "lname", headerName: "Last Name", width: 150, editable: true },
    { field: "gender", headerName: "Gender", width: 150, editable: true },
    { field: "phone", headerName: "Phone", width: 150, editable: true },
    { field: "address", headerName: "Address", width: 300, editable: true },
    { field: "dob", headerName: "DOB", width: 150, editable: true },
    { field: "si", headerName: "State", width: 150, editable: true },
    { field: "city", headerName: "City", width: 150, editable: true },
    { field: "zip", headerName: "ZIP", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 250, editable: true },
    { field: "ip", headerName: "IP Address", width: 150, editable: true },
    { field: "jid", headerName: "Jornaya ID", width: 300, editable: true },
    { field: "createdAt", headerName: "Creation TS", minWidth: 300 },
    { field: "sourceUrl", headerName: "Source Url", minWidth: 300 },
  ];
  useEffect(() => {
    // loadDataFromDB()
    onSnapshot(collection(db, "medicareClients"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const clientObj = {
            id: change.doc.id,
            fname: change.doc.data().fname,
            lname: change.doc.data().lname,
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
            sourceUrl: "https://advancedinsonline.com/medicare",
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
    <Container justify="center" height="100">
      <div>Medicare Clients</div>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <TailSpin
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            justifySelf="center"
            alignSelf="center"
            // timeout={3000} //3 secs
          />
        </div>
      ) : (
        <div style={{ height: 650, width: "100%" }}>
          {/* <DataGrid getRowId={(r) => r.id} rows={rows} columns={columns} /> */}
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      )}
    </Container>
  );
};

export default MedicareModule;
