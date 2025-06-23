import { Routes, Route, useNavigate } from "react-router";
import { useState } from "react";
import "./App.css";
import {
  Home,
  Dashboard,
  Legal,
  Page404,
  Error500,
  PreDashboard,
} from "@/pages";
import {
  Header,
  FormContainer,
  LoginForm,
  Footer,
  TicketConfirmation,
} from "@/components";
import Test from "./pages/Test/Test";

function App() {
  const Navigate = useNavigate();
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
          <Route path="/dashboard" element={<PreDashboard />} />
          <Route path="/dashboard/:serviceId" element={<Dashboard />} />
          <Route path="/test" element={<Test />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/feedback" element={<TicketConfirmation />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </section>

      <Footer url={serviceData?.url} />
    </div>
  );
}

export default App;
