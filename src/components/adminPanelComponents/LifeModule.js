import React, { useEffect, useState } from "react"
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid"
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
} from "@firebase/firestore"
import { db } from "../../firebaseConfig/firebase"
import { TailSpin } from "react-loader-spinner"

const MedicareModule = () => {
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState([])
  async function loadDataFromDB() {
    const querySnapshot = await getDocs(collection(db, "lifeClients"))
    const clientLocalArr = []
    if (!querySnapshot.empty) {
      //("Clients Found!")

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // //(doc.id, " => ", doc.data())
        const id = doc.id
        const clientObj = {
          id: doc.id,
          fname: doc.data().fname,
          lname: doc.data().lname,
          gender: doc.data().gender,
          phone: doc.data().phone,
          height: doc.data().height,
          weight: doc.data().weight,
          isMarried: doc.data().is_married,
          coverageAmount: doc.data().coverage_amount,
          coverageTime: doc.data().coverage_time,
          hasCondition: doc.data().is_health_condition,
          isTobacco: doc.data().is_tobacco,
          address: doc.data().address,
          dob: doc.data().dob,
          si: doc.data().stateInitial,
          city: doc.data().city,
          zip: doc.data().zip,
          email: doc.data().email,
          ip: doc.data().clientIP,
          jid: doc.data().jornayaID,
          createdAt: new Date(doc.data().createdAt.seconds * 1000),
        }
        clientLocalArr.push(clientObj)
      })
      setClients(clientLocalArr)
      setLoading(false)
      return true
    } else {
      //("There are no Clients yet!")
    }
  }

  // const rows: GridRowsProp = [
  //   { id: 1, col1: "Hello", col2: "World" },
  //   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  //   { id: 3, col1: "MUI", col2: "is Amazing" },
  // ]
  const rows = clients

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "fname", headerName: "First Name", width: 150 },
    { field: "lname", headerName: "Last Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "hasCondition", headerName: "Has Condition", width: 150 },

    { field: "coverageAmount", headerName: "Coverage Amount", width: 150 },
    { field: "coverageTime", headerName: "Coverage Time", width: 150 },
    { field: "isMarried", headerName: "Married", width: 150 },
    { field: "isTobacco", headerName: "Tobbaco Usage", width: 150 },
    { field: "height", headerName: "Height", width: 150 },
    { field: "weight", headerName: "Weight", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "dob", headerName: "DOB", width: 150 },
    { field: "si", headerName: "State", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "zip", headerName: "ZIP", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "ip", headerName: "IP Address", width: 150 },
    { field: "jid", headerName: "Jornaya ID", width: 300 },
    { field: "createdAt", headerName: "Creation TS", minWidth: 300 },
    { field: "sourceUrl", headerName: "Source Url", minWidth: 300 },
  ]
  useEffect(async() => {
    // loadDataFromDB()
    onSnapshot(collection(db, "lifeClients"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const clientObj = {
            id: change.doc.id,
            fname: change.doc.data().fname,
            lname: change.doc.data().lname,
            gender: change.doc.data().gender,
            phone: change.doc.data().phone,
            height: change.doc.data().height,
            weight: change.doc.data().weight,
            isMarried: change.doc.data().is_married,
            coverageAmount: change.doc.data().coverage_amount,
            coverageTime: change.doc.data().coverage_time,
            hasCondition: change.doc.data().is_health_condition,
            isTobacco: change.doc.data().is_tobacco,
            address: change.doc.data().address,
            dob: change.doc.data().dob,
            si: change.doc.data().stateInitial,
            city: change.doc.data().city,
            zip: change.doc.data().zip,
            email: change.doc.data().email,
            ip: change.doc.data().clientIP,
            jid: change.doc.data().jornayaID,
            createdAt:   new Date(
              change.doc.data().createdAt.seconds * 1000
            ).toLocaleString("en-US", { timeZone: "US/Central" }) +
            "\tUS/Central Timezone",
            sourceUrl: "https://advancedinsonline.com/life-insurance",
          }
          setClients((oldArray) => [...oldArray, clientObj])
        }
      })
    })
    const clientObject = await getDocs(collection(db, "vendorApi"))

console.log(clientObject,"Client Object")

//function to post data from server using fetch with application/json and cors enabled
//function to post data to server using fetch with application/x-www-form-urlencoded and cors enabled

//example usage
// for (v in vendors) {

//   let resp = await postData(v.url, clientObj);
//   resp.then(n => n.json()).then(resp => {
//     console.log("l160",resp);
//    }).catch(n => {
//        console.error(n);
//    });
// }

  }, []);

  let postDataForm = function (endppoint, data) {
    return fetch(endppoint, {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    });
  }
  
  useEffect(() => {
    //("Clients are:", clients)
    if (clients.length > 0) {
      setLoading(false)
    }
  }, [clients])
  return (
    <>
      <div>Life Module</div>
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
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      )}
    </>
  )
}

export default MedicareModule
