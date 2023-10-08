"use client";
import React, { useRef, useState } from "react";
import { checkValidData } from "@utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "@utils/redux/userSlice";
import { PHOTO_AVATAR } from "@utils/constants";

const Login = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();

    try {
      let message = checkValidData(
        isSignIn,
        name.current ? name.current.value : false,
        email.current.value,
        password.current.value
      );
      if (message) throw new Error(message);
      if (!isSignIn) {
        // sign up login
        const signUpResponse = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const addUserName = await updateProfile(auth.currentUser, {
          displayName: name.current.value,
          photoURL: PHOTO_AVATAR,
        });
        const {
          uid,
          email: emailUser,
          displayName,
          photoURL,
        } = auth.currentUser;
        dispatch(addUser({ uid, email: emailUser, displayName, photoURL }));
        // navigate("/browse");
      } else {
        // sign in logic
        const signInResponse = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        // const {
        //   uid,
        //   email: emailUser,
        //   displayName,
        //   photoURL,
        // } = auth.currentUser;
        // dispatch(addUser({ uid, email: emailUser, displayName, photoURL }));
        // navigate("/browse");
      }
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_medium.jpg')]">
      {/* <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="logo"
        />
      </div> */}
      {/* <form className="absolute w-4/12  p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 "
        />

        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <button type="submit" className="p-4 my-6 bg-red-700 w-full rounded-lg">
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignIn
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In now."}
        </p>
      </form> */}

      <form className="w-2/3 md:w-1/3 p-5 sm:p-12 bg-black mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 text-xs sm:text-sm"
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 text-xs sm:text-sm"
          ref={email}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 text-xs sm:text-sm"
          ref={password}
        />
        <button
          type="submit"
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        {errorMessage && (
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        )}
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignIn
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
