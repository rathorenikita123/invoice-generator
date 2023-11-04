import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Invoice = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <h1>Invoice not found</h1>
        <Link to={`/`}>
          <Button variant="primary" size="xl">
            Visit Invoice List
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Invoice;