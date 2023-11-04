import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, addItem } from "../redux/reducer/invoiceReducer";
import { useParams } from "react-router-dom";

const InvoiceItem = () => {
  const { invoiceNumber: invoiceId } = useParams();
  const dispatch = useDispatch();
  const { productItems, currency } = useSelector(
    (state) => state.invoiceList[invoiceId - 1]
  );
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {productItems.length !== 0 &&
            productItems.map((item) => {
              return (
                <ItemRow
                  invoiceId={invoiceId}
                  item={item}
                  key={item.id}
                  currency={currency}
                />
              );
            })}
        </tbody>
      </Table>
      <Button
        className="fw-bold"
        onClick={() => {
          dispatch(addItem({ invoiceId: invoiceId - 1 }));
        }}
      >
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = ({ item, currency, invoiceId }) => {
  const dispatch = useDispatch();
  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableField
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: item.name,
            id: item.id,
          }}
        />
        <EditableField
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: item.price,
            id: item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={() =>
            dispatch(deleteItem({ id: item.id, invoiceId: invoiceId - 1 }))
          }
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
