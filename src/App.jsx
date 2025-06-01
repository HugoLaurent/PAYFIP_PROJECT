import { Routes, Route } from "react-router";
import { useState } from "react";
import "./App.css";
import { Home } from "@/pages";
import { Header, FormContainer, LoginForm, Footer } from "@/components";

function App() {
  const [serviceData, setServiceData] = useState(null);
  console.log("Service Data:", serviceData);

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header serviceData={serviceData} />
      <section style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/:orgName"
            element={<FormContainer setServiceData={setServiceData} />}
          />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </section>
      <Footer url={serviceData?.url} />
    </div>
  );
}

export default App;
