import React, { useEffect, useState } from 'react'
import { LogBack } from "../assets"
import { InputLogin } from '../components'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { motion } from "framer-motion"
import { buttonClick } from '../animations'
import { FcGoogle } from "react-icons/fc"


// To Get Authentication information
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "../config/firebase.config"
import { validateUserJWTToken } from '../api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../context/actions/userActions'





const Login = () => {
  const [userEmail, setUserEmail] = useState("")
  const [isSignUp, setisSignUp] = useState(false)
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirm_Password] = useState("")

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const navigate = new useNavigate()
  const dispatch = useDispatch

  const user = useSelector((state) => state.user)
  const alertInfo = useSelector((state) => state.alert)
  const alertWarning = useSelector((state) => state.alert)

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true })
    }
  }, )


  const LoginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then(Token => {
            validateUserJWTToken(Token).then(data => {

              dispatch(setUserDetails(data))
            })
            navigate("/", { replace: true })
          })
        }
      })
    })
  }
  const signUpWithEmailPassword = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      dispatch(alertInfo("Required Fields should not be empty"))
    } else {
      if (password === confirm_password) {
        setUserEmail("")
        setConfirm_Password("")
        setPassword("")
        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCrede) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then(Token => {
                validateUserJWTToken(Token).then(data => {

                  dispatch(setUserDetails(data))
                })
                navigate("/", { replace: true })
              })
            }
          })
        })
        console.log("equal")
      } else {
        dispatch(alertWarning("Password does not match"))

      }
    }
  }
  const signInWithEmailPassword = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password);
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((Token) => {
            validateUserJWTToken(Token).then((data) => {

              dispatch(setUserDetails(data))
            });
            navigate("/", { replace: true });
          });
        }
      });
    } else {
      dispatch(alertWarning("Password does not match"))
    }
  }





  return (
    <div className='w-screen h-screen relative overflow-hidden flex bg-cover'>
      <img src={LogBack} className='w-full h-md:h-full object-cover ' alt="BackGround" />
      <div className="absolute inset-0 flex">
        <div className=" flex flex-col items-center bg-gradient-to-r from-transparent to-rose-100 backdrop-blur-md md-w-[60%] md:-w-508 h-full z-10 p-4 px-16 py-12
      rounded-lg shadow-md ">

          <div className='flex items-center jsutify-start gap-4 w-full'>

            <p className='p-4 cursor-pointer font-semibold text-rose-200 lg:text-xl hover:text-orange-500'> T_A_S_T_Y </p>
          </div>
          <p className='text-2xl font-semibold text-gray-200  mt-12  px '>Welcome Back</p>
          <p className='text-stone-900 text-sm -mt-1 '>{isSignUp ? "Sign Up" : "Sign In"} with following</p>
          <div className='w-full flex flex-col items-center justify-center gap-2 mt-5'>


            <InputLogin placeHolder={"Email Here"}
              icon={<FaEnvelope className='ml-1 ' />}
              inputState={userEmail}
              inputStateFunc={setUserEmail}
              type="email"
              isSignUp={isSignUp} />



            <InputLogin placeHolder={"Password Here"}
              icon={<FaLock className='ml-1' />}
              inputState={password}
              inputStateFunc={setPassword}
              type="password"
              isSignUp={isSignUp}
            />

            {isSignUp && (
              <InputLogin placeHolder={"Confirm Password Here"}
                icon={<FaLock className='ml-1' />}
                inputState={confirm_password}
                inputStateFunc={setConfirm_Password}
                type="password"
                isSignUp={isSignUp} />
            )}
            {!isSignUp ? (
              <p className='p-4 text-sm -ml-3 text-stone-300'>Dosen't have an account : <motion.button {...buttonClick}
                className=' text-rose-900 underline cursor-pointer bg-transparent font-semibold'
                onClick={() => setisSignUp(true)}  >
                Create One
              </motion.button>
              </p>
            ) : (

              <p className='p-4  -ml-3 text-stone-200'> Already have an account : <motion.button {...buttonClick}
                className=' text-red-900 underline cursor-pointer         bg-transparent'
                onClick={() => setisSignUp(false)} >
                Sign-in Here
              </motion.button>
              </p>

            )}
            {/* {} */}

            {isSignUp ? (
              <motion.button {...buttonClick}
                className='w-full py-1 rounded-md bg-orange-300 cursor-pointer text-stone-200 text-xl captialize hover:bg-orange-500 transition-all duration-150'
                onClick={signUpWithEmailPassword}
              >
                Sign Up
              </motion.button>
            ) : (
              <motion.button {...buttonClick} className='w-full py-1 rounded-md bg-orange-300 cursor-pointer text-zinc-500 text-xl captialize hover:bg-orange-500 transition-all duration-150 font-medium'
                onClick={signInWithEmailPassword}>
                Sign in
              </motion.button>
            )}

          </div>
          <div className='flex items-center justify-between gap-16
       '>
            <div className='w-full h-[1px] rounded-md mt-6 bg-rose-900 '></div>
            <p className='mt-5 text-rose-900 font-medium  '> OR </p>
            <div className='w-full h-[1px] rounded-md mt-6 bg-rose-800 '></div>

          </div>
          <motion.div {...buttonClick}
            className='flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-2xl mt-4 '
            onClick={LoginWithGoogle}>
            <FcGoogle className="text-xl -ml-7 mr-2" />
            <p className='capatalize text-sm text-stone-800 '>Google Sign In</p>

          </motion.div>

        </div>
      </div>





    </div >
  )
}

export default Login
