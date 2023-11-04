import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { editItem, calculateTotal } from "../redux/reducer/invoiceReducer";
import { useParams } from "react-router-dom";

const EditableField = ({ cellData }) => {
  const { invoiceNumber: invoiceId } = useParams();
  const dispatch = useDispatch();
  return (
    <InputGroup className="my-1 flex-nowrap">
      {cellData.leading != null && (
        <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2">
          <span
            className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
            style={{ width: "20px", height: "20px" }}
          >
            {cellData.leading}
          </span>
        </InputGroup.Text>
      )}
      <Form.Control
        className={cellData?.textAlign}
        type={cellData?.type}
        placeholder={cellData?.placeholder}
        min={cellData?.min}
        name={cellData?.name}
        id={cellData?.id}
        value={cellData?.value}
        step={cellData?.step}
        presicion={cellData?.presicion}
        aria-label={cellData?.name}
        onChange={(e) => {
          dispatch(
            editItem({
              id: cellData.id,
              name: e.target.name,
              value: e.target.value,
              invoiceId: invoiceId - 1,
            })
          );
          dispatch(calculateTotal({invoiceId: invoiceId - 1}));
        }}
        required
      />
    </InputGroup>
  );
};

export default EditableField;