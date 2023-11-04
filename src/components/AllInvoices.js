import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { BiTrash } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import InvoiceModal from "./InvoiceModal";
import { addInvoice, duplicateInvoice } from "../redux/reducer/invoiceReducer";
import { useState } from "react";
import { updateField, deleteInvoice } from "../redux/reducer/invoiceReducer";

const AllInvoices = () => {
  const { invoiceList } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [localInvoiceId, setLocalInvoiceId] = useState(1);

  if (invoiceList.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center w-100">
        <Container>
          <h1>No Invoice is Found</h1>
          <Button
            variant="primary"
            size="xl"
            onClick={() => dispatch(addInvoice())}
          >
            Create Invoice
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <div className="d-flex flex-column align-items-center justify-content-center w-100">
        <h1>Invoice Generator</h1>
        <h3>Invoice List</h3>
      </div>

      <Container className="invoiceList-container d-flex flex-wrap justify-content-center">
        {invoiceList &&
          invoiceList.length !== 0 &&
          invoiceList.map((invoice, index) => (
            <Card
              key={invoice.invoiceNumber}
              className="m-2"
              style={{ width: "25rem" }}
            >
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {invoice.billTo !== "" ? invoice.billTo : "Bill To"}
                  <IoMdAddCircle
                    onClick={() => {
                      dispatch(
                        duplicateInvoice({
                          ...invoice,
                          invoiceNumber: invoiceList.length + 1,
                        })
                      );
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Card.Title>
                <Card.Text>
                  {invoice.billFrom !== "" ? invoice.billFrom : "Bill From"}
                </Card.Text>
                <Card.Text>
                  Due Date:{" "}
                  {invoice.dateOfIssue !== "" ? invoice.dateOfIssue : ""}
                </Card.Text>
                <Card.Text>
                  {invoice.total !== "" ? (
                    <>
                      <span className="fw-bold">Total:</span>
                      <span className="fw-bold">
                        {invoice.currency}
                        {invoice.total || 0}
                      </span>
                    </>
                  ) : (
                    "No total found"
                  )}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Link to={`/invoice/${invoice.invoiceNumber}`}>
                    <Button variant="primary" size="sm">
                      Edit Invoice
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      dispatch(
                        updateField({
                          name: "isOpen",
                          value: true,
                          invoiceId: invoice.invoiceNumber - 1,
                        })
                      );
                      setLocalInvoiceId(invoice.invoiceNumber);
                    }}
                    style={{
                      marginLeft: "10px",
                    }}
                    variant="outline-success"
                    size="sm"
                  >
                    View Invoice
                  </Button>
                  <BiTrash
                    onClick={() => {
                      dispatch(
                        deleteInvoice({
                          index,
                        })
                      );
                    }}
                    style={{
                      height: "34px",
                      width: "34px",
                      padding: "7.5px",
                      marginLeft: "10px",
                    }}
                    className="text-white mt-1 btn btn-danger"
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
      </Container>
      <InvoiceModal invoiceId={localInvoiceId} />
    </div>
  );
};

export default AllInvoices;
