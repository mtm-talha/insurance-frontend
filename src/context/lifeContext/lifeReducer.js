import {
  SET_ADDRESS,
  SET_EMAIL,
  SET_PHONE,
  SET_DOB,
  SET_GENDER,
  SET_NAME,
  SET_MARRIED,
  SET_HEIGHT,
  SET_WEIGHT,
  SET_TOBACCO,
  SET_IS_HEALTH_CONDITION,
  SET_HEALTH_CONDITION,
  SET_COVERAGE_TIME,
  SET_COVERAGE_AMOUNT,
  SET_JORNAYA_LIFE,
  SET_CLIENT_LIFE,
  SET_IS_INSURED,
  SET_INSURANCE_NAME,
} from "./lifeActions"

export const lifeReducer = (state, action) => {
  //("Action recieved in Life reducer is ", action)
  switch (action.type) {
    default:
      return state

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

    case SET_NAME:
      return {
        ...state,
        name: action.payload.fname + " " + action.payload.lname,
        fname: action.payload.fname,
        lname: action.payload.lname,
      }
    case SET_JORNAYA_LIFE:
      return {
        ...state,
        jornayaID: action.payload,
      }
    case SET_CLIENT_LIFE:
      return {
        ...state,
        clientIP: action.payload,
      }
    case SET_DOB:
      return {
        ...state,
        DOB: action.payload,
      }
    case SET_MARRIED:
      return {
        ...state,
        is_married: action.payload,
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
    case SET_HEIGHT:
      return {
        ...state,
        height: action.payload,
      }
    case SET_WEIGHT:
      return {
        ...state,
        weight: action.payload,
      }
    case SET_TOBACCO:
      return {
        ...state,
        is_tobacco: action.payload,
      }
    case SET_IS_HEALTH_CONDITION:
      return {
        ...state,
        is_health_condition: action.payload,
      }
    case SET_HEALTH_CONDITION:
      return {
        ...state,
        health_condition: action.payload,
      }
    case SET_COVERAGE_TIME:
      return {
        ...state,
        coverage_time: action.payload,
      }
    case SET_COVERAGE_AMOUNT:
      return {
        ...state,
        coverage_amount: action.payload,
      }
  }
}
