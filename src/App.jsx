import { Routes, Route } from "react-router";
import { useState } from "react";
import "./App.css";
import { Home, Dashboard, Legal } from "@/pages";
import { Header, FormContainer, LoginForm, Footer } from "@/components";
import Test from "./pages/Test/Test";

function App() {
  const [serviceData, setServiceData] = useState(null);

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test" element={<Test />} />
          <Route path="/mentions-legales" element={<Legal />} />
        </Routes>
      </section>

      <Footer url={serviceData?.url} />
    </div>
  );
}

export default App;
