// why axios might not be the best solution, 
// https://blog.logrocket.com/axios-or-fetch-api/
// https://stackoverflow.com/a/50326744
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});