import { createContext, useContext, useRef, useState } from "react";

const Context = createContext({});
const AppContextProvider = ({ children }: any) => {
  let userData = useRef();
  let apiurl = "https://tehc-backend.onrender.com/api";
  let appointmentdata = useRef();
  // const [appointmentdata, setAppointmentdata] = useState<any>();
  const [alertMSG, setAlertMSG] = useState<string>("");
  const [alertColor, setAlertColor] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        userData,
        apiurl,
        appointmentdata,
        alertMSG,
        setAlertMSG,
        alertColor,
        setAlertColor,
        toastVisible,
        setToastVisible,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContextProvider;
export const useAppContext = () => useContext(Context);
