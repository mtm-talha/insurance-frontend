import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import moment from "moment";

import {
  NEXT_STEP,
  PREV_STEP,
  SET_MODULE_AUTO,
  SET_MODULE_LIFE,
  SET_MODULE_MEDICARE,
  SET_MODULE_HOMEPAGE,
  SET_MODULE_ADMIN_PANEL,
  SET_READY_TO_POST,
  CLEAR_APP_STATES,
  SET_TOTAL_STEPS,
  SET_GET_STARTED,
  SET_IS_EDITING,
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  SET_ADMIN_ACCESS,
  SET_ADMIN_OBJ,
} from "./appActions";

import { db } from "../../firebaseConfig/firebase";
import {
  addDoc,
  collection,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
  FieldValue,
} from "firebase/firestore";

import { appReducer } from "./appReducer";
// import { allSteps } from "../../util/allSteps"

// import {
//   ADD_DRIVER,
//   ADD_VEHICLE,
//   ADD_INFO,
//   NEXT_STEP,
//   PREV_STEP,
// } from "./appActions"

export const AppContext = createContext();
const initialState = {
  user: [],
  activeModule: SET_MODULE_HOMEPAGE,
  step: null,
  historyStack: [],
  readyToPost: false,
  totalSteps: null,
  getStarted: false,
  isEditing: false,
  adminAccess: false,
  adminObj: null,
};
export const useAppContext = () => useContext(AppContext);

export default function AutoContextProvider({ children }) {
  const databaseState = doc(db, "dbState", "clientCounts");
  const [state, dispatch] = useReducer(appReducer, initialState);
  const auth = getAuth();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentAuth) => {
  //     //("Auth changed", currentAuth)
  //     setAdminAuthObj(currentAuth)
  //   })
  // }, [])
  function setGetStarted(val) {
    //("Sending dispatch for setGetStarted ")
    dispatch({
      type: SET_GET_STARTED,
      payload: val,
    });
  }
  function setIsEditing(val) {
    //("Sending dispatch for setIsEditing ", val)
    dispatch({
      type: SET_IS_EDITING,
      payload: val,
    });
  }
  function setReadyToPost(isReady) {
    //("Sending dispatch for SetReadyToPost ", isReady)
    dispatch({
      type: SET_READY_TO_POST,
      payload: isReady,
    });
  }
  function setTotalSteps(tot_steps) {
    //("Sending dispatch for setTotalSteps ", tot_steps)
    dispatch({
      type: SET_TOTAL_STEPS,
      payload: tot_steps,
    });
  }

  // function setUser() {}
  function setActiveModule(moduleName) {
    //("Setting active module to ", moduleName)
    switch (moduleName) {
      default:
        return null;
      case SET_MODULE_LIFE:
        dispatch({
          type: SET_MODULE_LIFE,
        });
        break;
      case SET_MODULE_AUTO:
        dispatch({
          type: SET_MODULE_AUTO,
        });
        break;
      case SET_MODULE_MEDICARE:
        dispatch({
          type: SET_MODULE_MEDICARE,
        });
        break;
      case SET_MODULE_HOMEPAGE:
        dispatch({
          type: SET_MODULE_HOMEPAGE,
        });
        break;
      case SET_MODULE_ADMIN_PANEL:
        dispatch({
          type: SET_MODULE_ADMIN_PANEL,
        });
        break;
    }
  }
  function nextStep(stepName) {
    //("Moving to Step: ", stepName)
    dispatch({
      type: NEXT_STEP,
      payload: stepName,
    });
  }
  function prevStep() {
    var prevPage = state.historyStack[state.historyStack.length - 2];

    //("Moving back to Step: ", prevPage)
    dispatch({
      type: PREV_STEP,
      payload: prevPage,
    });
  }
  function clearAppStates() {
    //("Clearing States")
    dispatch({
      type: CLEAR_APP_STATES,
    });
  }

  async function addMedicareClient(
    DOB,
    gender,
    name,
    fname,
    lname,
    is_insured,
    insurance_name,
    insurancePrivateSecondary,
    address,
    unit,
    stateInitial,
    zip,
    email,
    phone,
    clientIP,
    jornayaID,
    city
  ) {
    //(
    //   "Recieved this data for posting to medicare collection :",
    //   "DOB:",
    //   DOB,
    //   "gender:",
    //   gender,
    //   "name:",
    //   name,
    //   "address:",
    //   address,
    //   "unit:",
    //   unit,
    //   "city:",
    //   city,
    //   "stateInitial:",
    //   stateInitial,
    //   "is_insured:",
    //   is_insured,
    //   "insurance_name:",
    //   insurance_name,
    //   "insurancePrivateSecondary:",
    //   insurancePrivateSecondary,
    //   "zip:",
    //   zip,
    //   "email:",
    //   email,
    //   "phone:",
    //   phone,
    //   "clientIP:",
    //   clientIP,
    //   "jornayaID:",
    //   jornayaID
    // )
    //(
    //   "City in APP CONTEXT BEFORE POSTING",
    //   insurancePrivateSecondary,
    //   city
    // )


    var myHeaders = new Headers();
    myHeaders.append("Cookie", "AWSALB=2RMcPx/frIrsMf03cR8NHAI4uKX/PZIyQeNbsA4zNv/vCIXd5WPvZ7A0ajbTUSMhRftBPN9CQHU5bbrP6b5JPqFA3+95dujRqSa4jCJU1d/wBWyUX9bUJPEmLX9o; PHPSESSID=37qu0e8pccjvg8s1vbvrl18gi1");
    
    const data = {
      dob: DOB,
      gender: gender,
      fname: fname,
      lname: lname,
      address: address,
      unit: unit,
      city: city,
      stateInitial: stateInitial,
      is_insured: is_insured,
      insurance_name: insurance_name,
      insurancePrivateSecondary: insurancePrivateSecondary,
      zip: zip,
      email: email,
      phone: phone,
      clientIP: clientIP,
      jornayaID: jornayaID,
      createdAt: Timestamp.now(),
      addedOn: `${moment().format("ddd, ll")} `,
    }
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
   
    return await addDoc(collection(db, "medicareClients"), {
      dob: DOB,
      gender: gender,
      fname: fname,
      lname: lname,
      address: address,
      unit: unit,
      city: city,
      stateInitial: stateInitial,
      is_insured: is_insured,
      insurance_name: insurance_name,
      insurancePrivateSecondary: insurancePrivateSecondary,
      zip: zip,
      email: email,
      phone: phone,
      clientIP: clientIP,
      jornayaID: jornayaID,
      createdAt: Timestamp.now(),
      addedOn: `${moment().format("ddd, ll")} `,
    })
      .then(async (classRef) => {
        //("User Collection ref is", classRef)
        console.log("Added Client in Firestore Medicare", classRef);
        
        const updateDbState = await updateDoc(databaseState, {
          medicareClients: FieldValue.increment(1),
        });
        console.log(updateDbState);
      })

      .catch((err) => {
        //("Error Adding Client to Medicare collection:", err)
        return false;
      });
  }

  async function addAutoClient(summaryData) {
    //(
    //   "Recieved this data for posting to Auto collection :",
    //   summaryData
    // )

    return await addDoc(collection(db, "autoClients"), {
      clientIP: summaryData.clientIP,
      jornayaID: summaryData.jornayaID,
      homeOwner: summaryData.HomeOwner,
      address: summaryData.Address,
      city: summaryData.City,
      stateInitial: summaryData.StateInitial,
      zip: summaryData.Zip,
      email: summaryData.Email,
      is_army: summaryData.is_army,
      phone: summaryData.Phone,
      secondDriverAdded: summaryData.secondDriverAdded,
      secondCarAdded: summaryData.secondCarAdded,
      firstDriver: summaryData.Driver1,
      secondDriver: summaryData.Driver2,
      firstVehicle: summaryData.Vehicle1,
      secondVehicle: summaryData.Vehicle2,
      insured: summaryData.Insured,
      insuranceName: summaryData.InsuranceName,
      insuranceTime: summaryData.InsuranceTime,
      createdAt: Timestamp.now(),
      addedOn:`${moment().format('ddd, ll')} `,
    })
      .then(async (classRef) => {
        //("User Collection ref is", classRef)
        // //("Added Client in Firestore Auto", classRef);
      })

      .catch((err) => {
        //("Error Adding Client to Auto collection:", err)
        return false;
      });
  }
  async function postContactUs(contactData) {
    //("Recieved this data for posting to Conatct :", contactData)

    return await addDoc(collection(db, "contactUs"), {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      message: contactData.message,
      createdAt: Timestamp.now(),
      addedOn: `${moment().format("ddd, ll")} `,
    })
      .then(async (contactRef) => {
        //("Conatct Collection ref is", contactRef)
        //("Added Client in Firestore Auto", contactRef)
      })

      .catch((err) => {
        //("Error Adding Message to Contact collection:", err)
        return false;
      });
  }
  async function addLifeClient(
    DOB,
    gender,
    name,
    lname,
    fname,
    address,
    unit,
    city,
    stateInitial,
    zip,
    email,
    phone,
    height,
    weight,
    is_tobacco,
    is_health_condition,
    health_condition,
    coverage_time,
    coverage_amount,
    is_married,
    clientIP,
    jornayaID,
    is_insured,
    insurance_name
  ) {
    //(
    //   "Recieved this data for posting to Life collection :",
    //   DOB,
    //   gender,
    //   name,
    //   fname,
    //   lname,
    //   address,
    //   unit,
    //   city,
    //   stateInitial,
    //   zip,
    //   email,
    //   phone,
    //   height,
    //   weight,
    //   is_tobacco,
    //   is_health_condition,
    //   health_condition,
    //   coverage_time,
    //   coverage_amount,
    //   is_married,
    //   clientIP,
    //   jornayaID,
    //   is_insured,
    //   insurance_name
    // )
    return await addDoc(collection(db, "lifeClients"), {
      dob: DOB,
      gender: gender,
      fname: fname,
      lname: lname,
      address: address,
      city: city,
      stateInitial: stateInitial,
      zip: zip,
      email: email,
      phone: phone,
      height: height,
      weight: weight,
      is_tobacco: is_tobacco,
      is_health_condition: is_health_condition,
      health_condition: health_condition,
      coverage_time: coverage_time,
      coverage_amount: coverage_amount,
      is_married: is_married,
      clientIP: clientIP,
      jornayaID: jornayaID,
      is_insured: is_insured,
      insurance_name: insurance_name,
      createdAt: Timestamp.now(),
      addedOn: `${moment().format("ddd, ll")} `,
    })
      .then(async (classRef) => {
        //("User Collection ref is", classRef)
        //("Added Client in Firestore Life", classRef)
      })

      .catch((err) => {
        //("Error Adding Client to Life collection:", err)
        return false;
      });
  }
  // function setAdminAuthObj(authObj){
  //   dispatch({
  //     type:SET_ADMIN_OBJ,
  //     payload:authObj
  //   })
  // }
  async function adminLogin(email, password) {
    const userCollectionRef = collection(db, "users");
    //("Collection ref", userCollectionRef);
    //("In admin login function context")
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        //(userCredential.user.uid);
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        //(userDoc);
        if (userDoc.exists()) {
          //(userDoc.data());
          dispatch({
            type: ADMIN_LOGIN,
            payload: userDoc.data(),
          });
          //("Returing true");
          return [true, userDoc.data()];
        } else {
          //("Returing false");

          return false;
        }
        // return getDoc(userCollectionRef, userCredential.user.uid)
        //   .then((snapShot) => {
        //     //(snapShot.data());
        //     dispatch({
        //       type: ADMIN_LOGIN,
        //       payload: user,
        //     });
        //   })
        //   .then(() => {
        //     //("Returing true");
        //     return true;
        //   })
        //   .catch((err) => {
        //     //("Returing false");
        //     //(err);
        //     return err;
        //   });
      })

      .catch((error) => {
        // //(
        //   "This error occured while admin signin,",
        //   errorCode,
        //   errorMessage
        // );
        return error;
      });
  }
  function setAdminObj(accessType) {
    dispatch({
      type: SET_ADMIN_OBJ,
      payload: accessType,
    });
  }
  async function resetPassword(newPass) {
    const email = auth.currentUser.email;
    //("Email of current logged in user is,", email)
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        //("Reset email sent")
        return true;
      })
      .catch((err) => {
        //("Error while sending mail")
        return false;
      });
  }

  async function adminLogout() {
    //("In admin logout function context")
    return signOut(auth)
      .then(() => {
        //("signout successful")
        dispatch({
          type: ADMIN_LOGOUT,
        });
        // Sign-out successful.
      })
      .then(() => {
        //("returning true from context");
        return true;
      })
      .catch((error) => {
        //("returning false from context");
        return false;
        // An error happened.
      });
  }
  function setAdminAccess(access) {
    dispatch({
      type: SET_ADMIN_ACCESS,
      payload: access,
    });
  }
  async function sendOptOut(summaryData) {
    //(
    //   "Recieved this data for posting to Auto collection :",
    //   summaryData
    // )

    return await addDoc(collection(db, "optOut"), {
      address: summaryData.address,
      city: summaryData.city,
      state: summaryData.state,
      zip: summaryData.zip,
      email: summaryData.email,
      phone: summaryData.phone,
      fName: summaryData.fName,
      lName: summaryData.lName,

      prefferedContact: summaryData.prefferedContact,
      access: summaryData.access,
      optOut: summaryData.optOut,
      authAgent: summaryData.authAgent,
      createdAt: Timestamp.now(),
      addedOn: `${moment().format("ddd, ll")} `,
    })
      .then(async (classRef) => {
        //("User Collection ref is", classRef)

        //("Added Client in Firestore Optout", classRef)
        return true;
      })

      .catch((err) => {
        //("Error Adding Client to Firestore Optout:", err)
        return false;
      });
  }

  const value = {
    activeModule: state.activeModule,
    step: state.step,
    // clientIP: state.clientIP,
    // jornayaID: state.jornayaID,
    readyToPost: state.readyToPost,
    getStarted: state.getStarted,
    isEditing: state.isEditing,
    adminAccess: state.adminAccess,
    adminObj: state.adminObj,

    adminLogin,
    adminLogout,
    setActiveModule,
    nextStep,
    // setClientIP,
    // setJornayaID,
    addMedicareClient,
    addLifeClient,
    addAutoClient,
    setReadyToPost,
    clearAppStates,
    prevStep,
    setTotalSteps,
    sendOptOut,
    setGetStarted,
    setIsEditing,
    postContactUs,
    setAdminAccess,
    resetPassword,
    setAdminObj,
    historyStack: state.historyStack,
    totalSteps: state.totalSteps,
    // runServices,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
