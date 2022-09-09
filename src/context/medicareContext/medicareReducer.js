import {
  SET_ADDRESS,
  SET_EMAIL,
  SET_PHONE,
  SET_NAME,
  SET_DOB,
  SET_GENDER,
  SET_JORNAYA_MEDICARE,
  SET_CLIENT_MEDICARE,
  SET_IS_INSURED,
  SET_INSURANCE_NAME,
  SET_INSURANCE_PS,
} from "./medicareActions"

export const medicareReducer = (state, action) => {
  //("Action recieved in Medicare reducer is ", action)
  switch (action.type) {
    default:
      return state

    case SET_IS_INSURED: {
      return {
        ...state,
        is_insured: action.payload,
      }
    }
    case SET_INSURANCE_NAME: {
      return {
        ...state,
        insurance_name: action.payload,
      }
    }
    case SET_INSURANCE_PS: {
      return {
        ...state,
        insurancePrivateSecondary: action.payload,
      }
    }

    case SET_NAME:
      return {
        ...state,
        name: action.payload.fname + " " + action.payload.lname,
        fname: action.payload.fname,
        lname: action.payload.lname,
      }
    case SET_JORNAYA_MEDICARE:
      return {
        ...state,
        jornayaID: action.payload,
      }
    case SET_CLIENT_MEDICARE:
      return {
        ...state,
        clientIP: action.payload,
      }
    case SET_DOB:
      return {
        ...state,
        DOB: action.payload,
      }
    case SET_GENDER:
      return {
        ...state,
        gender: action.payload,
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
  }
}
