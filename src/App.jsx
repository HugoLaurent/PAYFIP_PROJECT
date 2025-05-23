import { Routes, Route } from "react-router";
import { useState } from "react";
import "./App.css";
import { Home } from "@/pages";
import { Header, FormContainer } from "@/components";

function App() {
  const [serviceData, setServiceData] = useState(null);

  return (
    <>
      <Header serviceData={serviceData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:orgName"
          element={<FormContainer setServiceData={setServiceData} />}
        />
      </Routes>
    </>
  );
}

export default App;
