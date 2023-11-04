import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "../redux/reducer/invoiceReducer";
import { updateField } from "../redux/reducer/invoiceReducer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const InvoiceForm = () => {
  const { invoiceNumber: invoiceId } = useParams();
  const {
    currency,
    invoiceNumber,
    dateOfIssue,
    billTo,
    billToEmail,
    billToAddress,
    billFrom,
    billFromEmail,
    billFromAddress,
    notes,
    total,
    subTotal,
    taxRate,
    taxAmount,
    discountRate,
    discountAmount,
  } = useSelector((state) => state.invoiceList[invoiceId - 1]);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateField({ name: "isOpen", value: true, invoiceId: invoiceId - 1 })
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name={"dateOfIssue"}
                    onChange={(event) => {
                      const { name, value } = event.target;
                      dispatch(
                        updateField({ name, value, invoiceId: invoiceId - 1 })
                      );
                    }}
                    style={{
                      maxWidth: "150px",
                    }}
                    required="required"
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  name={"invoiceNumber"}
                  onChange={(event) => {
                    const { name, value } = event.target;
                    dispatch(
                      updateField({ name, value, invoiceId: invoiceId - 1 })
                    );
                  }}
                  min="1"
                  style={{
                    maxWidth: "70px",
                  }}
                  required="required"
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice to?"}
                  rows={3}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={(event) => {
                    const { name, value } = event.target;
                    dispatch(
                      updateField({ name, value, invoiceId: invoiceId - 1 })
                    );
                  }}
                  autoComplete="name"
                  required="required"
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={(event) => {
                    const { name, value } = event.target;
                    dispatch(
                      updateField({ name, value, invoiceId: invoiceId - 1 })
                    );
                  }}
                  autoComplete="email"
                  required="required"
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => {
                    const { name, value } = event.target;
                    dispatch(
                      updateField({ name, value, invoiceId: invoiceId - 1 })
                    );
                  }}
                  required="required"
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice from?"}
                  rows={3}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={(event) => {
                    const { name, value } = event.target;
                    dispatch(
                      updateField({ name, value, invoiceId: invoiceId - 1 })
                    );
                  }}
                  autoComplete="name"
                  required="required"
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={(event) => {
                    const { name, value } = event.target;
                    dispatch(
                      updateField({ name, value, invoiceId: invoiceId - 1 })
                    );
                  }}
                  autoComplete="email"
                  required="required"
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => {
                    const { name, value } = event.target;
                    dispatch(
                      updateField({ name, value, invoiceId: invoiceId - 1 })
                    );
                  }}
                  required="required"
                />
              </Col>
            </Row>
            <InvoiceItem />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {currency}
                    {subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({discountRate || 0}%)</span>
                    {currency}
                    {discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small ">({taxRate || 0}%)</span>
                    {currency}
                    {taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{
                    fontSize: "1.125rem",
                  }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={notes}
              onChange={(event) => {
                const { name, value } = event.target;
                dispatch(
                  updateField({ name, value, invoiceId: invoiceId - 1 })
                );
              }}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="outline-primary"
                type="submit"
                className="d-block w-100"
                style={{
                  marginBottom: "10px",
                }}
              >
                All Invoice
              </Button>
            </Link>

            <Button variant="primary" type="submit" className="d-block w-100">
              Save Invoice
            </Button>
            <InvoiceModal invoiceId={invoiceId} />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(event) =>
                  dispatch(
                    updateField({
                      name: "currency",
                      value: event.target.value,
                    })
                  )
                }
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={(event) => {
                    const { name, value } = event.target;
                    dispatch(
                      updateField({ name, value, invoiceId: invoiceId - 1 })
                    );
                    dispatch(calculateTotal({ invoiceId: invoiceId - 1 }));
                  }}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={discountRate}
                  onChange={(event) => {
                    const { name, value } = event.target;
                    dispatch(
                      updateField({ name, value, invoiceId: invoiceId - 1 })
                    );
                    dispatch(calculateTotal({ invoiceId: invoiceId - 1 }));
                  }}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
