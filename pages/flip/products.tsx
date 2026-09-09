import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import { uiActions } from "../../src/redux/store/ui-slice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MyProductValue } from "../../src/utils/boxValues";
import ProductCategory from "src/components/ProductCategory";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  fetchProduct,
  getMyproduct,
} from "src/redux/store/features/product-slice";
import { getMyproductCategories } from "src/redux/store/features/product-category-slice";
import ProductTable from "src/components/tables/ProductTable";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error, message, success } = useAppSelector(
    (state: any) => state.product
  );
  const { token } = useAppSelector((state: any) => state.auth);
  const [selected, setSelected] = useState(1);
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (error.length > 0) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
          backgroundColor: "red",
        })
      );
      setTimeout(() => {
        dispatch(clearError());
      }, 10000);
    }
    if (success) {
      console.log(success);
      dispatch(uiActions.closeModal());
      dispatch(uiActions.closedrawer());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      dispatch(fetchProduct(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);
  useEffect(() => {
    dispatch(getMyproductCategories(token));
    dispatch(getMyproduct(token));
  }, [dispatch, token]);
  return (
    <ParentContainer>
      <div className=" h-screen">
        <Box
          sx={{ width: "100%" }}
          style={{ background: "white", height: "100vh" }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              style={{ background: "#edf2f7" }}
              // classes={{ flexContainer: classes.flexContainer }}
            >
              {MyProductValue.map((value: any) => (
                <Tab
                  label={value.label}
                  {...a11yProps(value.id)}
                  key={value.id}
                  style={{
                    backgroundColor:
                      selected === value.id ? "white" : "transparent",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "12px",
                    lineHeight: "136.52%",
                    textAlign: "center",
                    color: "rgba(132, 135, 163, 1)",
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    setSelected(value.id);
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <ProductTable data={products} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProductCategory />
          </TabPanel>
        </Box>
      </div>
    </ParentContainer>
  );
};
export default Products;
