import axios from "axios"

export const baseURL = "http://localhost:5001/fullstack-app-may-23-rea-63df4/us-central1/app"

export const validateUserJWTToken =async (token) =>
{
  try{
    const res = await axios.get(`${baseURL}/api/user/jwtVerification`, {
      headers :{Authorization : "Bearer " + token}
    })
    return res.data.data
  } catch (err) {
    return null
  }
}
