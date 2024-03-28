import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const buyerId = getCookie('buyerId');
    if (buyerId){
      agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [setBasket])

  const [darkmode, setDarkMode] = useState(false);
  const paletteType = darkmode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkmode)
  }

  if (loading) return <LoadingComponent message="Initialising App"/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkmode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
  </ThemeProvider>
  );
}

export default App;
