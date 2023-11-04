import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/AllInvoices";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className=" d-flex flex-column align-items-center justify-content-center p-5 w-100">
      <Provider store={store}>
        <Container>
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/invoice/:invoiceNumber" element={<InvoiceForm />} />
          </Routes>
        </Container>
      </Provider>
    </div>
  );
};

export default App;
