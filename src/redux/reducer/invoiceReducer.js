import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

const invoiceListSlice = createSlice({
  name: "invoiceList",
  initialState: initialState,
  reducers: {
    deleteInvoice: (state, action) => {
      state.splice(action.payload.index, 1);
    },
    addInvoice: (state) => {
      state.push({
        productItems: [],
        isOpen: false,
        currency: "$",
        currentDate: "",
        invoiceNumber: state.length + 1,
        dateOfIssue: "",
        billTo: "",
        billToEmail: "",
        billToAddress: "",
        billFrom: "",
        billFromEmail: "",
        billFromAddress: "",
        notes: "",
        total: "0.00",
        subTotal: "0.00",
        taxRate: "",
        taxAmount: "0.00",
        discountRate: "",
        discountAmount: "0.00",
      });
    },
    duplicateInvoice: (state, action) => {
      state.push(action.payload);
    },
    updateField: (state, action) => {
      const { name, value, invoiceId } = action.payload;
      state[invoiceId][name] = value;
    },
    addItem: (state, action) => {
      const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(
        36
      );
      const { invoiceId } = action.payload;
      state[invoiceId].productItems.push({
        id,
        name: "",
        price: "1.00",
        description: "",
        quantity: 1,
      });
    },
    deleteItem: (state, action) => {
      const index = state.productItems.indexOf(action.payload.id);
      state[action.payload.invoiceId].productItems.splice(index, 1);
    },
    editItem: (state, action) => {
      state[action.payload.invoiceId].productItems = state[
        action.payload.invoiceId
      ].productItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, [action.payload.name]: action.payload.value }
          : item
      );
    },
    calculateTotal: (state, action) => {
      const subTotal = state[action.payload.invoiceId].productItems
        .reduce((total, item) => {
          return total + parseFloat(item.price) * parseInt(item.quantity);
        }, 0)
        .toFixed(2);

      const taxAmount = (
        parseFloat(subTotal) *
        (state[action.payload.invoiceId].taxRate / 100)
      ).toFixed(2);
      const discountAmount = (
        parseFloat(subTotal) *
        (state[action.payload.invoiceId].discountRate / 100)
      ).toFixed(2);

      const total = (
        parseFloat(subTotal) -
        discountAmount +
        parseFloat(taxAmount)
      ).toFixed(2);

      return [
        ...state.slice(0, action.payload.invoiceId),
        {
          ...state[action.payload.invoiceId],
          subTotal,
          taxAmount,
          discountAmount,
          total,
        },
        ...state.slice(action.payload.invoiceId + 1),
      ];
    },
  },
});

export const {
  addInvoice,
  duplicateInvoice,
  updateField,
  addItem,
  deleteItem,
  editItem,
  calculateTotal,
  deleteInvoice,
} = invoiceListSlice.actions;
export default invoiceListSlice.reducer;
