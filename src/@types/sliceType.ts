interface State {
  users: any[];
  products: any[];
  productCategory: any[];
}

export type sliceType = {
  name: string;
  initialState: {
    users: any[];
    products: any[];
    productCategory: any[];
  };
  actions: { addUsers: any; addProductCategory: any; addProducts: any };
  reducer: any;
};
