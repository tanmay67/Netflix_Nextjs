"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "@utils/firebase";
import { addUser, removeUser } from "@utils/redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

const OutletComp = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(pathname);
    setLoading(true);
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setLoading(true);

        console.log(user);
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));

        if (window.location.pathname === "/") {
          router.replace("/browse/");
          setTimeout(() => {
            setLoading(false);
          }, 4000);
        } else {
          setLoading(false);
        }

        // ...
      } else {
        // User is signed out
        // ...
        setLoading(true);
        router.replace("/");
        console.log("no user is there");

        dispatch(removeUser());

        setLoading(false);
      }
    });
    // unsubscribe when component unmounts
    // because listeners will be created each and every time header is called
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <section className="w-screen h-screen overflow-auto">
      {loading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://blog.motionisland.com/wp-content/uploads/2022/03/Loading_1.gif"
            alt="loading"
          />
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export default OutletComp;
