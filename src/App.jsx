import { Routes, Route } from "react-router";
import { useState } from "react";
import "./App.css";
import { Home } from "@/pages";
import { Header, FormContainer, IconButton } from "@/components";
import { Footer } from "./components";

function App() {
  const [serviceData, setServiceData] = useState(null);
  console.log("Service Data:", serviceData);

  return (
    <>
      <Header serviceData={serviceData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:orgName"
          element={<FormContainer setServiceData={setServiceData} />}
        />
        <Route path="/:orgName/gestion" element={<p>Coucou</p>} />
      </Routes>
      <Footer url={serviceData?.url} />
    </>
  );
}

export default App;
