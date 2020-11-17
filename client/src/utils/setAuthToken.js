import axios from "axios";
const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;

// set and delete authorization header for axios requests depends 
// on user logged in or out