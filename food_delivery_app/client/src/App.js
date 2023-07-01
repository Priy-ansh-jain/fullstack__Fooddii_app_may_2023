import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./containers";
import { Login } from "./containers";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { validateUserJWTToken } from "./api";
import { motion } from "framer-motion";
import { setUserDetails } from "./context/actions/userActions";
import { fadeInOut } from "./animations";
import { MainLoader } from "./components";
import { Alert } from "./components";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert =useSelector(state => state.alert)

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 30);
    });
  }, [firebaseAuth, dispatch]);

  return (
    // 'text-red-500 w-screen min-h-screen h-auto flex flex-col items-center justify-center'
    <div className="">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-stone-100 bacground-blur-md flex items-center justify-center text-blue-800 w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />}></Route>
        <Route path="/Login" element={<Login />}></Route>
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
