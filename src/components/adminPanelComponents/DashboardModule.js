import React, { useEffect, useState } from 'react'
import axios from "axios";
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
	startAt,
	limit,
	Timestamp,
} from '@firebase/firestore'
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import {
	Typography,
	Container,
	Grid,
	TextField,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	ToggleButton,
	ToggleButtonGroup,
	FormGroup,
	Checkbox,
	FormControlLabel,
	// checked,
	// handleChange,
} from '@mui/material'
import { db } from '../../firebaseConfig/firebase'
import moment from 'moment'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { async } from '@firebase/util'
import { uniqBy } from 'lodash'
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey("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");
// const msg = {
//   to: "saifs252525@gmail.com",
//   from: "advanceinsonline@gmail.com", // Use the email address or domain you verified above
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// //ES6
// sgMail.send(msg).then(
//   () => {},
//   (error) => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// );
const styles = {
	gridContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	generalContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	summaryContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	summaryTitleContainer: {
		width: '20%',
	},
	summaryDataContainer: {
		width: '80%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	generalBtn: {
		width: '100%',
		height: '100%',
		maxHeight: 70,
		padding: '15px 0px',
		fontSize: { lg: 22, md: 18, sm: 18, xs: 15 },
		fontWeight: 'bold',
		color: 'white',
	},
	// generalBtnText: {
	//   fontSize: { lg: 22, md: 18, sm: 18, xs: 15 },
	//   fontWeight: "bold",
	//   color: "white",
	// },
	generalSingleBtn: {
		width: '100%',
		maxWidth: 400,
		height: '100%',
		maxHeight: 70,
		padding: '15px 0px',
		marginTop: 5,
		fontSize: { lg: 22, md: 18, sm: 18, xs: 15 },
		fontWeight: 'bold',
	},
	headerStyle: {
		fontSize: { lg: 48, md: 48, sm: 30, xs: 26 },
		fontWeight: 'bold',
		textAlign: 'center ',
		marginBottom: '25px',
		marginTop: '25px',
		color: '#000e31',
	},
	searchdiv: {
		width: '100%',
		height: 65,
		backgroundColor: 'grey',
		marginBottom: '20px',
		boxShadow: 10,
	},
	subHeadingStyle: {
		fontSize: 30,

		textAlign: 'center ',
	},
}
const DashboardModule = () => {
	const [vendorArray, setVendorArray] = useState([])
	const [lifeArray, setLifeArray] = useState([])
	const [medicareArray, setMedicareArray] = useState([])
	const [autoArray, setAutoArray] = useState([])
	const [dateSelected, setDateSelected] = useState()
	const [lifeChecked, setLifeChecked] = useState(true)
	const [medicareChecked, setMedicareChecked] = useState(false)
	const [autoChecked, setAutoChecked] = useState(false)
	const [ApiSelected, setApiSelected] = useState('')
	const [error, setError] = useState('')
	const [open, setOpen] = React.useState(false)
	const [errors, setErrors] = useState('')
	const [urls, setUrls] = useState([])
const [select,setSelection] = useState('')

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	useEffect(async () => {
		const lifeObject = await getDocs(collection(db, 'lifeClients'))
		const autoObject = await getDocs(collection(db, 'autoClients'))
		const medicareObject = await getDocs(collection(db, 'medicareClients'))
		let lifeLocalArray = [],
			autoLocalArray = [],
			medicareLocalArray = []

		if (!lifeObject.empty) {
			//("Clients Found!")

			lifeObject.forEach((doc) => {
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
				lifeLocalArray.push(clientObj)
			})
			setLifeArray(lifeLocalArray)
		} else {
			//("There are no Clients yet!")
		}
		// const emptyArray = [];

		// const vendors = await getDocs(collection(db, "vendorApi"));
		// vendors.forEach((doc) => {
		//   let obj = {
		//     name: doc.data().name,
		//     url: doc.data().url,
		//   };

		//   emptyArray.push(obj);
		// });

		// //function to post data from server using fetch with application/json and cors enabled

		// for (let v = 0; v <= emptyArray.length; v++) {
		//   let resp = await postData(emptyArray[v]?.url, [{ Munem: 1 }]);

		//   if (!typeof resp === "object") {
		//     resp
		//       .then((n) => n.json())
		//       .then((resp) => {
		//         resp = resp;
		//         // console.log(resp );
		//       })
		//       .catch((n) => {
		//         console.error(n);
		//       });
		//   }
		//   console.log(resp);
		// }
	}, [])


	async function sendData(){
		console.log(ApiSelected)

		// if (lifeChecked) {
		// 	let resp = await postData(item, lifeArray)
		// 	console.log({ resp })

		// 	if (!typeof resp === 'object') {
		// 		resp
		// 			.then((n) => n.json())
		// 			.then((resp) => {
		// 				resp = resp
		// 				// console.log(resp );
		// 			})
		// 			.catch((n) => {
		// 				console.error(n)
		// 				setErrors(JSON.stringify(n))
		// 				handleClickOpen()
		// 			})
		// 			.finally(() => {
		// 				setUrls([])
		// 			})
		// 	}
		// 	if (resp.status === 404) {
		// 		setErrors(resp.statusText)
		// 		handleClickOpen()
		// 		setUrls([])
		// 	}
		// }

		// if (autoChecked) {
		// 	let resp = await postData(url, autoArray)

		// 	if (!typeof resp === 'object') {
		// 		resp
		// 			.then((n) => n.json())
		// 			.then((resp) => {
		// 				resp = resp
		// 				// console.log(resp );
		// 			})
		// 			.catch((n) => {
		// 				console.error(n)
		// 				setErrors(JSON.stringify(n))
		// 				handleClickOpen()
		// 			})
		// 			.finally(() => {
		// 				setUrls([])
		// 			})
		// 	}
		// 	if (resp.status === 404) {
		// 		setErrors(resp.statusText)
		// 		handleClickOpen()
		// 		setUrls([])
		// 	}
		// }

		if (medicareChecked) {

			let resp = await postData(ApiSelected, select[0])
return
			if (!typeof resp === 'object') {
				resp
					.then((n) => n.json())
					.then((resp) => {
						resp = resp
						// console.log(resp );
					})
					.catch((n) => {
						console.error(n)
						setErrors(JSON.stringify(n))
						handleClickOpen()
					})
					.finally(() => {
						setUrls([])
					})
			}
			if (resp.status === 404) {
				setErrors(resp.statusText)
				handleClickOpen()
				setUrls([])
			}
		}



	} 


	// async function sendData() {
	// 	const url = ApiSelected
	// 	//  for (let v = 0; v <= emptyArray.length; v++) {
	// 	if (urls.length === 0) {
	// 		return setError('Enter a url')
	// 	}
	// 	console.log(urls, lifeChecked)
	// 	urls.forEach(async (item) => {
		// 	if (lifeChecked) {
		// 		let resp = await postData(item, lifeArray)
		// 		console.log({ resp })

		// 		if (!typeof resp === 'object') {
		// 			resp
		// 				.then((n) => n.json())
		// 				.then((resp) => {
		// 					resp = resp
		// 					// console.log(resp );
		// 				})
		// 				.catch((n) => {
		// 					console.error(n)
		// 					setErrors(JSON.stringify(n))
		// 					handleClickOpen()
		// 				})
		// 				.finally(() => {
		// 					setUrls([])
		// 				})
		// 		}
		// 		if (resp.status === 404) {
		// 			setErrors(resp.statusText)
		// 			handleClickOpen()
		// 			setUrls([])
		// 		}
		// 	}

		// 	if (autoChecked) {
		// 		let resp = await postData(url, autoArray)

		// 		if (!typeof resp === 'object') {
		// 			resp
		// 				.then((n) => n.json())
		// 				.then((resp) => {
		// 					resp = resp
		// 					// console.log(resp );
		// 				})
		// 				.catch((n) => {
		// 					console.error(n)
		// 					setErrors(JSON.stringify(n))
		// 					handleClickOpen()
		// 				})
		// 				.finally(() => {
		// 					setUrls([])
		// 				})
		// 		}
		// 		if (resp.status === 404) {
		// 			setErrors(resp.statusText)
		// 			handleClickOpen()
		// 			setUrls([])
		// 		}
		// 	}

		// 	if (medicareChecked) {
		// 		let resp = await postData(url, medicareArray)

		// 		if (!typeof resp === 'object') {
		// 			resp
		// 				.then((n) => n.json())
		// 				.then((resp) => {
		// 					resp = resp
		// 					// console.log(resp );
		// 				})
		// 				.catch((n) => {
		// 					console.error(n)
		// 					setErrors(JSON.stringify(n))
		// 					handleClickOpen()
		// 				})
		// 				.finally(() => {
		// 					setUrls([])
		// 				})
		// 		}
		// 		if (resp.status === 404) {
		// 			setErrors(resp.statusText)
		// 			handleClickOpen()
		// 			setUrls([])
		// 		}
		// 	}
		// })

		// // }
	// }

	useEffect(async () => {
		if (lifeChecked && dateSelected) {
			const q = query(
				collection(db, 'lifeClients'),
				where('addedOn', '==', `${moment(dateSelected).format('ddd, ll')} `)
			)
			// onSnapshot(collection(db, "autoClients"), (snapshot) => {
        let uniqLife =[]
			const clientLifeArr = []
			const querySnapshot = await getDocs(q)
			if (querySnapshot.empty) {
				console.log('Empty')
			}
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
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
				clientLifeArr.push(clientObj)
        uniqLife = uniqBy(clientLifeArr, function(o){
          return o?.jid || o?.ip;
      });
			})
			setLifeArray(uniqLife)
		}
		if (medicareChecked && dateSelected) {
      let uniqMed =[]
			const q = query(
				collection(db, 'medicareClients'),
				where('addedOn', '==', `${moment(dateSelected).format('ddd, ll')} `)
			)
			// onSnapshot(collection(db, "autoClients"), (snapshot) => {

			const clientMedicareArr = []
			const querySnapshot = await getDocs(q)
			if (querySnapshot.empty) {
				console.log('Empty')
			}
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				const clientObj = {
					id: doc.id,
					fname: doc.data().fname,
					lname: doc.data().lname,
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
					createdAt:
						new Date(doc.data().createdAt.seconds * 1000).toLocaleString('en-US', { timeZone: 'US/Central' }) +
						'\tUS/Central Timezone',
					sourceUrl: 'https://advancedinsonline.com/medicare',
				}
				clientMedicareArr.push(clientObj)
        uniqMed = uniqBy(clientMedicareArr, function(o){
          return o?.jid || o?.ip;
      });
			})
			setMedicareArray(uniqMed)
		}
		if (autoChecked && dateSelected) {
      let uniqAuto = [];
			const q = query(
				collection(db, 'autoClients'),
				where('addedOn', '==', `${moment(dateSelected).format('ddd, ll')} `)
			)
			// onSnapshot(collection(db, "autoClients"), (snapshot) => {

			const clientAutoArr = []
			const querySnapshot = await getDocs(q)
			if (querySnapshot.empty) {
				console.log('Empty')
			}
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				const clientObj = {
					id: doc.id,
					secondDriver: doc.data().secondDriverAdded ? 'Yes' : 'No',
					secondCar: doc.data().secondCarAdded ? 'Yes' : 'No',
					fcmake: doc.data().firstVehicle.Make == null ? 'N/A' : doc.data().firstVehicle.Make,
					fcmodel: doc.data().firstVehicle.Model == null ? 'N/A' : doc.data().firstVehicle.Model,
					fcyear: doc.data().firstVehicle.Year == null ? 'N/A' : doc.data().firstVehicle.Year,

					scmake: doc.data().secondVehicle.Make == null ? 'N/A' : doc.data().secondVehicle.Make,
					scmodel: doc.data().secondVehicle.Model == null ? 'N/A' : doc.data().secondVehicle.Model,
					scyear: doc.data().secondVehicle.Year == null ? 'N/A' : doc.data().secondVehicle.Year,
					insured: doc.data().insured,
					insuranceName: doc.data().insuranceName == null ? 'N/A' : doc.data().insuranceName,
					insuranceTime: doc.data().insuranceTime == null ? 'N/A' : doc.data().insuranceName,

					fdfname: doc.data().firstDriver.Fname == null ? 'N/A' : doc.data().firstDriver.Fname,
					fdlname: doc.data().firstDriver.Lname == null ? 'N/A' : doc.data().firstDriver.Lname,
					fdaccident: doc.data().firstDriver.AtFaultAccident == null ? 'N/A' : doc.data().firstDriver.AtFaultAccident,
					fddob: doc.data().firstDriver.DOB == null ? 'N/A' : doc.data().firstDriver.DOB,
					fdgender: doc.data().firstDriver.Gender == null ? 'N/A' : doc.data().firstDriver.Gender,
					fdmarried: doc.data().firstDriver.Married == null ? 'N/A' : doc.data().firstDriver.Married,
					fddui: doc.data().firstDriver.DUI == null ? 'N/A' : doc.data().firstDriver.DUI,
					sdfname: doc.data().secondDriver.Fname == null ? 'N/A' : doc.data().secondDriver.Fname,
					sdlname: doc.data().secondDriver.Lname == null ? 'N/A' : doc.data().secondDriver.Lname,
					sdaccident: doc.data().secondDriver.AtFaultAccident == null ? 'N/A' : doc.data().secondDriver.AtFaultAccident,
					sddob: doc.data().secondDriver.DOB == null ? 'N/A' : doc.data().secondDriver.DOB,
					sdgender: doc.data().secondDriver.Gender == null ? 'N/A' : doc.data().secondDriver.Gender,
					sdmarried: doc.data().secondDriver.Married == null ? 'N/A' : doc.data().secondDriver.Married,
					sddui: doc.data().secondDriver.DUI == null ? 'N/A' : doc.data().secondDriver.DUI,

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
					createdAt:
						new Date(doc.data().createdAt.seconds * 1000).toLocaleString('en-US', { timeZone: 'US/Central' }) +
						'\tUS/Central Timezone',
					sourceUrl: 'https://advancedinsonline.com/auto-insurance',
				}
				clientAutoArr.push(clientObj)
        uniqAuto = uniqBy(clientAutoArr, function(o){
          return o?.jid || o?.ip;
      });
			})
			setAutoArray(uniqAuto)
		}
	}, [dateSelected, lifeChecked, autoChecked, medicareChecked])

	useEffect(() => {
		const q = query(collection(db, 'autoClients'), orderBy('createdAt', 'desc'), limit(100))
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
				if (change.type === 'added') {
					const clientObj = {
						id: change.doc.id,
						secondDriver: change.doc.data().secondDriverAdded ? 'Yes' : 'No',
						secondCar: change.doc.data().secondCarAdded ? 'Yes' : 'No',
						fcmake: change.doc.data().firstVehicle.Make == null ? 'N/A' : change.doc.data().firstVehicle.Make,
						fcmodel: change.doc.data().firstVehicle.Model == null ? 'N/A' : change.doc.data().firstVehicle.Model,
						fcyear: change.doc.data().firstVehicle.Year == null ? 'N/A' : change.doc.data().firstVehicle.Year,

						scmake: change.doc.data().secondVehicle.Make == null ? 'N/A' : change.doc.data().secondVehicle.Make,
						scmodel: change.doc.data().secondVehicle.Model == null ? 'N/A' : change.doc.data().secondVehicle.Model,
						scyear: change.doc.data().secondVehicle.Year == null ? 'N/A' : change.doc.data().secondVehicle.Year,
						insured: change.doc.data().insured,
						insuranceName: change.doc.data().insuranceName == null ? 'N/A' : change.doc.data().insuranceName,
						insuranceTime: change.doc.data().insuranceTime == null ? 'N/A' : change.doc.data().insuranceName,

						fdfname: change.doc.data().firstDriver.Fname == null ? 'N/A' : change.doc.data().firstDriver.Fname,
						fdlname: change.doc.data().firstDriver.Lname == null ? 'N/A' : change.doc.data().firstDriver.Lname,
						fdaccident:
							change.doc.data().firstDriver.AtFaultAccident == null
								? 'N/A'
								: change.doc.data().firstDriver.AtFaultAccident,
						fddob: change.doc.data().firstDriver.DOB == null ? 'N/A' : change.doc.data().firstDriver.DOB,
						fdgender: change.doc.data().firstDriver.Gender == null ? 'N/A' : change.doc.data().firstDriver.Gender,
						fdmarried: change.doc.data().firstDriver.Married == null ? 'N/A' : change.doc.data().firstDriver.Married,
						fddui: change.doc.data().firstDriver.DUI == null ? 'N/A' : change.doc.data().firstDriver.DUI,
						sdfname: change.doc.data().secondDriver.Fname == null ? 'N/A' : change.doc.data().secondDriver.Fname,
						sdlname: change.doc.data().secondDriver.Lname == null ? 'N/A' : change.doc.data().secondDriver.Lname,
						sdaccident:
							change.doc.data().secondDriver.AtFaultAccident == null
								? 'N/A'
								: change.doc.data().secondDriver.AtFaultAccident,
						sddob: change.doc.data().secondDriver.DOB == null ? 'N/A' : change.doc.data().secondDriver.DOB,
						sdgender: change.doc.data().secondDriver.Gender == null ? 'N/A' : change.doc.data().secondDriver.Gender,
						sdmarried: change.doc.data().secondDriver.Married == null ? 'N/A' : change.doc.data().secondDriver.Married,
						sddui: change.doc.data().secondDriver.DUI == null ? 'N/A' : change.doc.data().secondDriver.DUI,

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
							new Date(change.doc.data().createdAt.seconds * 1000).toLocaleString('en-US', { timeZone: 'US/Central' }) +
							'\tUS/Central Timezone',
						sourceUrl: 'https://advancedinsonline.com/auto-insurance',
					}
					//  console.log(clientObj,"Client Auto Object");
					setAutoArray((oldArray) => [...oldArray, clientObj])
				}
			})
		})
	}, [])

	useEffect(() => {
		// loadDataFromDB()
		const q = query(collection(db, 'medicareClients'), orderBy('createdAt', 'desc'), limit(100))
		// onSnapshot(collection(db, "autoClients"), (snapshot) => {
		onSnapshot(q, (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === 'added') {
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
							new Date(change.doc.data().createdAt.seconds * 1000).toLocaleString('en-US', { timeZone: 'US/Central' }) +
							'\tUS/Central Timezone',
						sourceUrl: 'https://advancedinsonline.com/medicare',
					}
					setMedicareArray((oldArray) => [...oldArray, clientObj])
				}
			})
		})
	}, [])

	const columns = [
		
		{ field: 'id', headerName: 'ID', width: 200 },
		{ field: 'fname', headerName: 'First Name', width: 150 },
		{ field: 'lname', headerName: 'Last Name', width: 150 },
		{ field: 'gender', headerName: 'Gender', width: 150 },
		{ field: 'hasCondition', headerName: 'Has Condition', width: 150 },

		{ field: 'coverageAmount', headerName: 'Coverage Amount', width: 150 },
		{ field: 'coverageTime', headerName: 'Coverage Time', width: 150 },
		{ field: 'isMarried', headerName: 'Married', width: 150 },
		{ field: 'isTobacco', headerName: 'Tobbaco Usage', width: 150 },
		{ field: 'height', headerName: 'Height', width: 150 },
		{ field: 'weight', headerName: 'Weight', width: 150 },
		{ field: 'phone', headerName: 'Phone', width: 150 },
		{ field: 'address', headerName: 'Address', width: 300 },
		{ field: 'dob', headerName: 'DOB', width: 150 },
		{ field: 'si', headerName: 'State', width: 150 },
		{ field: 'city', headerName: 'City', width: 150 },
		{ field: 'zip', headerName: 'ZIP', width: 150 },
		{ field: 'email', headerName: 'Email', width: 250 },
		{ field: 'ip', headerName: 'IP Address', width: 150 },
		{ field: 'jid', headerName: 'Jornaya ID', width: 300 },
		{ field: 'createdAt', headerName: 'Creation TS', minWidth: 300 },
		{ field: 'sourceUrl', headerName: 'Source Url', minWidth: 300 },

	]

	//function to post data to server using fetch with application/json and cors enabled
	let postData = function (endppoint, data) {
		console.log(data)
// 		var myHeaders = new Headers();
// myHeaders.append("Cookie", "AWSALB=2RMcPx/frIrsMf03cR8NHAI4uKX/PZIyQeNbsA4zNv/vCIXd5WPvZ7A0ajbTUSMhRftBPN9CQHU5bbrP6b5JPqFA3+95dujRqSa4jCJU1d/wBWyUX9bUJPEmLX9o; PHPSESSID=37qu0e8pccjvg8s1vbvrl18gi1");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };
// const address = `address1=${data.address}`;
// const phone = `phone=${data.phone}`;
// const dobD = `dob_day=${data.dob}`;
// const dobM= `dob_month=${data.dob}`;
// const dobY =``;
// const subaff = ``;
// const UniversalLeadID =``;
// const state =``;
// const audience_id
// fetch(`http://www.winning.today/posting/bid-ping?api_key=d0ab445b569d2095f3fab336aa993209&dob_day=${data.dob}&dob_month=
// ${data.dob}&dob_year=${data.dob}&subaff=${data}&
// audience_id=${data}&test=test&email=${
// 	data.email}&UniversalLeadID
// 	=${data?.jid}&state=${data.address}&postal_code=${data.address}&zip=${data?.zip}`, requestOptions)
//   .then(response => response.text())
//   .then(result => {
// 	var myHeaders = new Headers();
// 	myHeaders.append("Cookie", "AWSALB=T3XUKQH8gtXSM9XqsRTevJUk9XzLxkfZixnXBudImFzn7dACPvd7TgKGKMOr7MTpT3ck5OVA5HzseHyTCdp+qhIrSbm4k5A/xQrBEmsmuCL9RWKvqi9NdQ4JToed; PHPSESSID=37qu0e8pccjvg8s1vbvrl18gi1");
	
// 	var requestOptions = {
// 	  method: 'GET',
// 	  headers: myHeaders,
// 	  redirect: 'follow'
// 	};
	
// 	fetch("http://www.winning.today/posting/post-jv-signup?api_key=d0ab445b569d2095f3fab336aa993209&address1=usa&phone=15417543013&dob_day=11&dob_month=1&dob_year=1954&subaff=12&audience_id=300178&email=rajanosha1@gmail.com&UniversalLeadID=XKZB4C45-5XCR-2Q3S-WMLG-7KFROS1PMKZQ\n&state=us&postal_code=12321&zip=46000&ping_id=126&firstname=raja&lastname=nosha", requestOptions)
// 	  .then(response => response.text())
// 	  .then(result => console.log(result))
// 	  .catch(error => console.log('error', error));
//   }
	
	
// 	)
//   .catch(error => console.log('error', error));


	}
	//  fetch(endppoint + "api_key=d0ab445b569d2095f3fab336aa993209"
	// 	+'	email'+
	// 		'zip '
	// 	+	'state'
	// 	+'	dob_day'
	// 	+	'dob_month'
	// 	+	'dob_year'
	// 	+	 "please enter your sub id"
	// 	+	'audience_id': 
	// 	+	'test':'true', {
	// 		method: 'GET',
	// 		body: JSON.stringify(data),
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Access-Control-Allow-Origin': '*',
	// 		},
	// 	})
	// }
	//function to post data from server using fetch with application/json and cors enabled
	// let postDataForm = function (endppoint, data) {
	//   return fetch(endppoint, {
	//       method: "POST",
	//       body: data,
	//       headers: {
	//           "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
	//       }
	//   });
// 	Medicare Audience ID: 300178
// Final Expense Audience ID: 300179
	// }
	// //function to post data to server using fetch with application/x-www-form-urlencoded and cors enabled

	// //example usage

	// Sanjeev Aassori R12:53 AM
	// resp.then(n => n.json()).then(resp => {
	//    console.log(resp);
	//   }).catch(n => {
	//       console.error(n);
	//   });
	// uzf-iams-phx

	//example usage
	//

	//function to post data to server using fetch with application/x-www-form-urlencoded and cors enabled
	// let postDataForm =  (endppoint, data) => {
	//   return await fetch(endppoint, {
	//  ≥     method: "POST",
	//       body: data,
	//       headers: {
	//           "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
	//       }
	//   });
	// }

	const handleRowSelection = (e) => {
		
	setSelection(medicareArray.filter(({id})=> e == id))
		// setSelection(e);
	  }
	  

	const MedicareColumns = [
		{
			field: 'action',
			headerName: '',
			minWidth: 180,
			sortable: false,
			hideable:false,
			filterable:false,
			disableClickEventBubbling: true,
			renderCell: (params) => {
				const onClick = async(e) => {
					console.log("send button ID value",params.id)
					console.log("send button selected row",params.row)
					e.stopPropagation(); // don't select this row after clicking
					const quadTagValue=`http://o1.stage.qnsr.com/cgi/r?;n=420;c=1000642;s=3907;x=7936;f=201510051136240;u=j;z=TIMESTAMP;`
					const data={
						"action": "ping",
						"data": {
							"drivers": [
								{
									"driverId": 1,
									"postalCode": "91106",
									"city": "Pasadena",
									"state": "CA",
									"country": "US",
									"county": "LOS ANGELES",
									"birthDate": "19901108",
									"gender": "Male",
									"maritalStatus": "No",
									"education": "Other",
									"occupation": "Other",
									"timeAtCurrentResidence": "2",
									"residenceType": "Renter",
									"doesRequireSR22": "N",
									"licenseStatus": "Valid",
									"matureDriverCourse": "N",
									"licenseSuspension": "No",
									"driverIsGoodStudent": "N",
									"relationshipToApplicant": "OthrNonRelative",
									"licenseState": "CA",
									"ageFirstLicensed": "16",
									"yearsLicensedFor": 15
								}
							],
							"vehicles": [
								{
									"vehicleId": 1,
									"vehicleYear": 2018,
									"vehicleMake": "HONDA",
									"vehicleModel": "ACCORD EX",
									"vehicleSubModel": "EX 4dr SEDAN (4cyl)",
									"vehiclePrimaryUse": "ToFromWork",
									"ownedLeasedOrFinanced": "Owned",
									"dailyMileage": "20",
									"annualMileage": "12000",
									"oneWayMileage": "10",
									"daysDrivenPerWeek": "5",
									"garagingState": "CA",
									"garagingCity": "Pasadena",
									"garagingZip": "91106",
									"garagingStreetAddress": "49 MARION AVE APT 17",
									"antiTheftDevice": "AudibleAlarm",
									"antiLockBrakes": "Y",
									"vehicleParkedAt": "PrivateGarage",
									"vin": "1HGCV1F4XJXXXXXXX"
								}
							],
							"driverVehicleUsages": [
								{
									"driverVehicleUsageId": 1,
									"vehicleId": 1,
									"driverId": 1,
									"vehicleUsage": "Primary",
									"vehicleUsageBackEnd": "P"
								}
							],
							"priorPolicyInfo": {
								"insuredTimeframe": "FiveYearsorMore",
								"insuranceCarrier": "GEICO",
								"expirationDate": "20220726"
							},
							"policyInfo": {
								"policyStartDate": "20220910"
							},
							"policyCoverage": {
								"ownHome": "No",
								"coveragesUMBIPD": "50-100-50",
								"coveragesBIPD": "50-100-50"
							},
							"incidents": {},
							"currentlyInsured": "Yes",
							"creditRating": "Do not know",
							"applicant": {
								"driverId": 1,
								"postalCode": "91106",
								"city": "Pasadena",
								"state": "CA",
								"country": "US",
								"county": "LOS ANGELES",
								"birthDate": "19901108",
								"gender": "Male",
								"maritalStatus": "No",
								"education": "Other",
								"occupation": "Other",
								"timeAtCurrentResidence": "2",
								"residenceType": "Renter",
								"doesRequireSR22": "N",
								"licenseStatus": "Valid",
								"matureDriverCourse": "N",
								"licenseSuspension": "No",
								"driverIsGoodStudent": "N",
								"relationshipToApplicant": "OthrNonRelative",
								"licenseState": "CA",
								"ageFirstLicensed": "16",
								"yearsLicensedFor": 15
							}
						},
						"metaData": {
							"ipAddress": "174.193.140.65",
							"userAgent": "Mozilla/5.0 (Windows NT 6.3, WOW64, Trident/7.0, rv:11.0) like Gecko",
							"consentLanguage": "By submitting your quote request, you represent that you are at least 18 and agree to our Privacy Policy and Terms of Use. You also authorize us and/or its marketing partners to contact you for marketing/telemarketing purposes at the number and address provided above, including your wireless number if provided, using live operators, automated telephone dialing systems, pre-recorded messages, text messages and/or emails. You are not required to consent as a condition of purchasing goods or services and may revoke consent at anytime.",
							"homePhoneConsent": "Yes",
							"trustedFormToken": "a19684bfad1caecab0bdbdb6895dd20a57f56026"
						}
					}
					
					try {
						const medicarePingResult=await axios.post(`https://lilac-gopher-veil.cyclic.app/medicare`, data)
						console.log("medicarePingResult",medicarePingResult.data)
					} catch (error) {
						console.log("error",error)
					}
				};
		
			return <Button   
				variant="contained"
				color="primary"
				size="small"
				style={{ marginLeft: 16 }}
				onClick={onClick}>Send Data to API</Button>;
			},
		},
		{ field: 'id', headerName: 'ID', width: 200 },
		{ field: 'fname', headerName: 'First Name', width: 150, editable: true },
		{ field: 'lname', headerName: 'Last Name', width: 150, editable: true },
		{ field: 'gender', headerName: 'Gender', width: 150, editable: true },
		{ field: 'phone', headerName: 'Phone', width: 150, editable: true },
		{ field: 'address', headerName: 'Address', width: 300, editable: true },
		{ field: 'dob', headerName: 'DOB', width: 150, editable: true },
		{ field: 'si', headerName: 'State', width: 150, editable: true },
		{ field: 'city', headerName: 'City', width: 150, editable: true },
		{ field: 'zip', headerName: 'ZIP', width: 150, editable: true },
		{ field: 'email', headerName: 'Email', width: 250, editable: true },
		{ field: 'ip', headerName: 'IP Address', width: 150, editable: true },
		{ field: 'jid', headerName: 'Jornaya ID', width: 300, editable: true },
		{ field: 'createdAt', headerName: 'Creation TS', minWidth: 300 },
		{ field: 'sourceUrl', headerName: 'Source Url', minWidth: 300 },
	]

	const AutoColumns = [
		{
			field: 'action',
			headerName: '',
			minWidth: 180,
			sortable: false,
			hideable:false,
			filterable:false,
			disableClickEventBubbling: true,
			renderCell: (params) => {
				const onClick = (e) => {
				console.log("send button ID value",params.id)
				console.log("send button selected row",params.row)
				e.stopPropagation(); // don't select this row after clicking

			  };
		
			return <Button   
				variant="contained"
				color="primary"
				size="small"
				style={{ marginLeft: 16 }}
				onClick={onClick}>Send Data to API</Button>;
			},
		},
		{ field: 'id', headerName: 'ID', minWidth: 150 },
		{ field: 'fdfname', headerName: 'FD First Name', minWidth: 150 },
		{ field: 'fdlname', headerName: 'FD Last Name', minWidth: 150 },
		{ field: 'fdaccident', headerName: 'FD Accident', minWidth: 150 },
		{ field: 'fddob', headerName: 'FD DOB', minWidth: 150 },
		{ field: 'fdgender', headerName: 'FD Gender', minWidth: 150 },
		{ field: 'fdmarried', headerName: 'FD Married', minWidth: 150 },
		{ field: 'fddui', headerName: 'FD DUI', minWidth: 150 },
		{ field: 'fcmake', headerName: 'FC Make', minWidth: 150 },
		{ field: 'fcmodel', headerName: 'FC Model', minWidth: 150 },
		{ field: 'fcyear', headerName: 'FC Year', minWidth: 150 },
		{ field: 'secondDriver', headerName: 'Second Driver Added', minWidth: 150 },
		{ field: 'sdfname', headerName: 'SD First Name', minWidth: 150 },
		{ field: 'sdlname', headerName: 'SD Last Name', minWidth: 150 },
		{ field: 'sdaccident', headerName: 'SD Accident', minWidth: 150 },
		{ field: 'sddob', headerName: 'SD DOB', minWidth: 150 },
		{ field: 'sdgender', headerName: 'SD Gender', minWidth: 150 },
		{ field: 'sdmarried', headerName: 'SD Married', minWidth: 150 },
		{ field: 'sddui', headerName: 'SD DUI', minWidth: 150 },
		{ field: 'secondCar', headerName: 'Second Car Added', minWidth: 150 },
		{ field: 'scmake', headerName: 'SC Make', minWidth: 150 },
		{ field: 'scmodel', headerName: 'SC Model', minWidth: 150 },
		{ field: 'scyear', headerName: 'SC Year', minWidth: 150 },
		{ field: 'insured', headerName: 'Prev. Insured', minWidth: 150 },
		{
			field: 'insuranceName',
			headerName: 'Prev. Insurance Name',
			minWidth: 150,
		},
		{
			field: 'insuranceTime',
			headerName: 'Time with prev. Insurance',
			minWidth: 150,
		},
		{ field: 'phone', headerName: 'Phone', minWidth: 150 },
		{ field: 'address', headerName: 'Address', minWidth: 150 },
		{ field: 'si', headerName: 'State', minWidth: 150 },
		{ field: 'city', headerName: 'City', minWidth: 150 },
		{ field: 'zip', headerName: 'ZIP', minWidth: 150 },
		{ field: 'email', headerName: 'Email', minWidth: 150 },
		{ field: 'ip', headerName: 'IP Address', minWidth: 150 },
		{ field: 'jid', headerName: 'Jornaya ID', minWidth: 320 },
		{ field: 'createdAt', headerName: 'Creation TS', minWidth: 300 },
		{ field: 'sourceUrl', headerName: 'Source Url', minWidth: 300 },
	]

	// useEffect(() => {
	//   if (dateSelected && lifeChecked) {
	//   lifeArray.map((item) => console.log(moment(item.createdAt).format("DD MM YYYY"), "\nJamal\n", moment(dateSelected).format("DD MM YYYY")));
	//     const filteredArray = lifeArray.filter((item) => moment(item.createdAt).format("DD MM YYYY") == moment(dateSelected).format("DD MM YYYY"));
	//    console.log(filteredArray,"Filtered Array");
	//     setLifeArray(filteredArray);
	//   }
	//   if (dateSelected && autoChecked) {
	//     const filteredArray = autoArray.filter((item) => moment(item.createdAt).format("DD MM YYYY") == moment(dateSelected).format("DD MM YYYY"));
	//     setAutoArray(filteredArray);
	//   }
	//   if (dateSelected && medicareChecked) {
	//     const filteredArray = medicareArray.filter((item) => moment(item.createdAt).format("DD MM YYYY") == moment(dateSelected).format("DD MM YYYY"));
	//     setMedicareArray(filteredArray);
	//   }
	// }, [dateSelected, lifeChecked, autoChecked, medicareChecked]);

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Some thing went Wrong</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">{errors}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						ok
					</Button>
				</DialogActions>
			</Dialog>
			<h1> Dashboard Module </h1>
			<div>
				<h6> Send Data </h6>

				<Box>
					<div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								margin: '25px 0px',
								width: '100%',
							}}
						>
							<TextField
								inputProps={{
									style: {},
									underline: {
										'&&&:before': {
											borderBottom: 'none',
										},
										'&&:after': {
											borderBottom: 'none',
										},
									},
								}}
								style={{ marginBottom: 15, width: '500px' }}
								id="outlined-basic"
								label="Enter Url"
								variant="outlined"
								value={ApiSelected}
								onChange={(e) => {
									setError('')
									setApiSelected(e.target.value)
								}}
							/>
							{/* <Button
								sx={{
									height: 50,
									padding: '15px 0px',
									fontWeight: 'bold',
									marginLeft: 5,
									width: 100,
								}}
								variant="contained"
								onClick={() => {
									setUrls([...urls, ApiSelected])
									setApiSelected('')
								}}
							>
								Add Urls
							

							</Button> */}
							<Button
								sx={{
									height: 50,
									padding: '15px 0px',
									fontWeight: 'bold',
									marginLeft: 5,
									width: 100,
								}}
								variant="contained"
								onClick={sendData}
							>
								Submit
							</Button>
						</div>
						<p style={{ color: 'red' }}>{error && error}</p>
					</div>
				</Box>

				
			</div>
			{/* {
					urls.map((item)=>
					<>
					   <div>{item}</div>
					   </>
				   )
			   
			} */}
			{/* <a href="mailto:abc@example.com?subject = Feedback&body = Message">Send Feedback</a> */}
			<div style={{ flexDirection: 'row', flex: 1 }}>
				<div style={{ width: '100%' }}>
					<Checkbox
						checked={lifeChecked}
						defaultChecked
						onChange={(event) => {
							setLifeChecked(event.target.checked)
							setMedicareChecked(false)
							setAutoChecked(false)
						}}
						inputProps={{ 'aria-label': 'controlled' }}
					/>
					Life
					<Checkbox
						checked={medicareChecked}
						onChange={(event) => {
							setLifeChecked(false)
							setMedicareChecked(event.target.checked)
							setAutoChecked(false)
						}}
						inputProps={{ 'aria-label': 'controlled' }}
					/>
					Medicare
					<Checkbox
						checked={autoChecked}
						onChange={(event) => {
							setLifeChecked(false)
							setMedicareChecked(false)
							setAutoChecked(event.target.checked)
						}}
						inputProps={{ 'aria-label': 'controlled' }}
					/>
					Auto
				</div>

				<div style={{ width: '20%', paddingTop: 10 }}>
					<Container>
						<Box sx={styles.searchdiv}>
							<TextField
								InputProps={{ disableUnderline: true }}
								// inputMode="numeric"
								type={'date'}
								onChange={(event) => setDateSelected(event.target.value)}
								sx={{
									// height: "100%",

									'& .MuiInputBase-input': {
										// height: "100%",

										border: 'none',
										outline: 'none',
									},
									'& .MuiFilledInput-input': {
										// height: "100%",
										backgroundColor: 'white',
										border: 'none',
										outline: 'none',
									},
									// "&&&:before": {
									//   borderBottom: "none",
									//   outline: "none",
									// },
									// "&&:after": {
									//   borderBottom: "none",
									//   outline: "none",
									// },
								}}
								id="filled-basic"
								label=""
								variant="filled"
							/>
						</Box>
					</Container>
				</div>
			</div>
			
			{lifeChecked &&
				(lifeArray.length > 0 && lifeChecked ? (
					<div style={{ height: 650, width: '100%' }}>
						<DataGrid rows={lifeArray} columns={columns} components={{ Toolbar: GridToolbar }}   checkboxSelection={()=>handleRowSelection()} />
				</div>
				) : (
					<h3>No Record Found</h3>
				))}
			{medicareChecked &&
				(medicareArray.length > 0 && medicareChecked ? (
					<div style={{ height: 650, width: '100%' }}>
						<DataGrid rows={medicareArray} columns={MedicareColumns} components={{ Toolbar: GridToolbar }} onSelectionModelChange={handleRowSelection} checkboxSelection={true}/>
					</div>
				) : (
					<h3>No Record Found</h3>
				))}
			{autoChecked &&
				(autoArray.length > 0 && autoChecked ? (
					<div style={{ height: 650, width: '100%' }}>
						<DataGrid rows={autoArray} columns={AutoColumns} components={{ Toolbar: GridToolbar }}  checkboxSelection={handleRowSelection}/>
					</div>
				) : (
					<h3>No Record Found</h3>
				))}
		</div>
	)
}

export default DashboardModule
