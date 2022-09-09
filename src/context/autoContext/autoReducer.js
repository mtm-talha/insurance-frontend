import {
  SET_CAR1_YEAR,
  SET_CAR1_MAKE,
  SET_CAR1_MODEL,
  SET_CAR2_MAKE,
  SET_CAR2_MODEL,
  SET_CAR2_YEAR,
  SET_IS_INSURED,
  SET_IS_ARMY,
  SET_INSURANCE_NAME,
  SET_INSURANCE_TIME,
  SET_IS_HOME_OWNER,
  SET_DRIVER1_NAME,
  SET_DRIVER2_NAME,
  SET_DRIVER1_DOB,
  SET_DRIVER2_DOB,
  SET_DRIVER1_GENDER,
  SET_DRIVER2_GENDER,
  SET_DRIVER1_MARRIED,
  SET_DRIVER2_MARRIED,
  SET_DRIVER1_ACCIDENT,
  SET_DRIVER2_ACCIDENT,
  SET_DRIVER1_DRUNK,
  SET_DRIVER2_DRUNK,
  SET_ADDRESS,
  SET_EMAIL,
  SET_PHONE,
  SET_SECOND_CAR_ADDED,
  SET_SECOND_DRIVER_ADDED,
  SET_JORNAYA_AUTO,
  SET_CLIENT_AUTO,
} from "./autoActions"

export const autoReducer = (state, action) => {
  //("Action recieved in AUTO reducer is ", action)
  switch (action.type) {
    default:
      return state

    case SET_JORNAYA_AUTO:
      return {
        ...state,
        jornayaID: action.payload,
      }
    case SET_CLIENT_AUTO:
      return {
        ...state,
        clientIP: action.payload,
      }

    case SET_CAR1_YEAR:
      return {
        ...state,
        car1_year: action.payload,
      }
    case SET_CAR2_YEAR:
      return {
        ...state,
        car2_year: action.payload,
      }

    case SET_CAR1_MAKE:
      return {
        ...state,
        car1_make: action.payload,
      }
    case SET_CAR2_MAKE:
      return {
        ...state,
        car2_make: action.payload,
      }
    case SET_CAR1_MODEL:
      return {
        ...state,
        car1_model: action.payload,
      }
    case SET_CAR2_MODEL:
      return {
        ...state,
        car2_model: action.payload,
      }
    case SET_IS_INSURED:
      return {
        ...state,
        is_insured: action.payload,
      }
    case SET_INSURANCE_NAME:
      return {
        ...state,
        insurance_name: action.payload,
      }
    case SET_INSURANCE_TIME:
      return {
        ...state,
        insurance_time: action.payload,
      }
    case SET_IS_HOME_OWNER:
      return {
        ...state,
        is_homeOwner: action.payload,
      }
    case SET_DRIVER1_DOB:
      return {
        ...state,
        driver1_DOB: action.payload,
      }
    case SET_DRIVER2_DOB:
      return {
        ...state,
        driver2_DOB: action.payload,
      }
    case SET_DRIVER1_GENDER:
      return {
        ...state,
        driver1_gender: action.payload,
      }
    case SET_DRIVER2_GENDER:
      return {
        ...state,
        driver2_gender: action.payload,
      }
    case SET_DRIVER1_MARRIED:
      return {
        ...state,
        driver1_married: action.payload,
      }
    case SET_DRIVER2_MARRIED:
      return {
        ...state,
        driver2_married: action.payload,
      }
    case SET_DRIVER1_ACCIDENT:
      return {
        ...state,
        driver1_accident: action.payload,
      }
    case SET_DRIVER2_ACCIDENT:
      return {
        ...state,
        driver2_accident: action.payload,
      }
    case SET_DRIVER1_DRUNK:
      return {
        ...state,
        driver1_drunk: action.payload,
      }
    case SET_DRIVER2_DRUNK:
      return {
        ...state,
        driver2_drunk: action.payload,
      }
    case SET_DRIVER1_NAME:
      return {
        ...state,
        driver1_fname: action.payload.fname,
        driver1_lname: action.payload.lname,
        driver1_name: action.payload.fname + " " + action.payload.lname,
      }
    case SET_DRIVER2_NAME:
      return {
        ...state,
        driver2_fname: action.payload.fname,
        driver2_lname: action.payload.lname,
        driver2_name: action.payload.fname + " " + action.payload.lname,
      }
    case SET_IS_ARMY:
      return {
        ...state,
        is_army: action.payload,
      }
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload.address,
        stateInitial: action.payload.stateInitial,
        zip: action.payload.zip,
        city: action.payload.city,
        unit: action.payload.unit,
      }
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case SET_PHONE:
      return {
        ...state,
        phone: action.payload,
      }
    case SET_SECOND_CAR_ADDED:
      return {
        ...state,
        secondCarAdded: action.payload,
      }
    case SET_SECOND_DRIVER_ADDED:
      return {
        ...state,
        secondDriverAdded: action.payload,
      }
  }
}
