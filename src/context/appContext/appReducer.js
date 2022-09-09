import {
  NEXT_STEP,
  SET_MODULE_AUTO,
  SET_MODULE_LIFE,
  SET_MODULE_MEDICARE,
  SET_MODULE_HOMEPAGE,
  SET_MODULE_ADMIN_PANEL,
  SET_READY_TO_POST,
  CLEAR_APP_STATES,
  PREV_STEP,
  SET_TOTAL_STEPS,
  SET_GET_STARTED,
  SET_IS_EDITING,
  ADMIN_LOGIN,
  SET_ADMIN_ACCESS,
  ADMIN_LOGOUT,
  SET_ADMIN_OBJ,
} from "./appActions";
import { allSteps } from "../../util/allSteps";

export const appReducer = (state, action) => {
  //("Action recieved in APP reducer is ", action)
  switch (action.type) {
    default:
      return state;

    // case SET_CLIENT_IP:
    //   return {
    //     ...state,
    //     clientIP: action.payload,
    //     step: null,
    //   }
    case ADMIN_LOGIN:
      //("In case admin login")
      return {
        ...state,
        adminObj: action.payload,
        adminAccess: true,
      };
    case ADMIN_LOGOUT:
      return {
        ...state,
        // adminObj: null,
        adminAccess: false,
      };
    case SET_ADMIN_ACCESS:
      return {
        ...state,
        adminAccess: action.payload,
      };
    case SET_ADMIN_OBJ: {
      return {
        ...state,
        adminObj: action.payload,
      };
    }
    case CLEAR_APP_STATES:
      return {
        ...state,
        user: [],
        activeModule: SET_MODULE_HOMEPAGE,
        step: null,
        historyStack: [],
        // clientIP: null,
        // jornayaID: null,
        readyToPost: false,
        adminAccess: false,
        adminObj: null,
      };
    case SET_IS_EDITING:
      return {
        ...state,
        isEditing: action.payload,
      };

    case SET_GET_STARTED:
      return {
        ...state,
        getStarted: action.payload,
      };
    case SET_TOTAL_STEPS:
      return {
        ...state,
        totalSteps: state.totalSteps + action.payload,
      };
    case SET_READY_TO_POST:
      return {
        ...state,
        readyToPost: action.payload,
      };
    // case SET_JORNAYA_ID:
    //   return {
    //     ...state,
    //     jornayaID: action.payload,
    //     step: null,
    //   }

    case SET_MODULE_HOMEPAGE:
      return {
        ...state,
        activeModule: action.type,
        user: [],
        step: null,
        historyStack: [],
        readyToPost: false,
      };
    case SET_MODULE_ADMIN_PANEL:
      return {
        ...state,
        activeModule: action.type,
      };
    case SET_MODULE_AUTO:
      return {
        ...state,
        activeModule: action.type,
        step: allSteps.yearStep,
        historyStack: [...state.historyStack, allSteps.yearStep],
        user: [],
        readyToPost: false,
        totalSteps: 18,
      };
    case SET_MODULE_LIFE:
      return {
        ...state,
        activeModule: action.type,
        step: allSteps.dobStep,
        historyStack: [...state.historyStack, allSteps.dobStep],
        user: [],
        readyToPost: false,
        totalSteps: 15,
      };
    case SET_MODULE_MEDICARE:
      return {
        ...state,
        activeModule: action.type,
        step: allSteps.dobStep,
        historyStack: [...state.historyStack, allSteps.dobStep],
        user: [],
        readyToPost: false,
        totalSteps: 9,
      };
    case NEXT_STEP:
      return {
        ...state,
        step: action.payload,
        historyStack: [...state.historyStack, action.payload],
      };
    case PREV_STEP:
      //("Removing history last element")
      state.historyStack.pop();
      return {
        ...state,
        step: action.payload,
        // historyStack: [...state.historyStack,],
      };
  }
};
