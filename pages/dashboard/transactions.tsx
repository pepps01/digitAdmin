import { memo, useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import TransactionTable from "src/components/tables/TransactionTable";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  fetchPaystackTransactions,
  fetchWalletTransactions,
  getMyTransactions,
  getPaystackTransactions,
  getWalletTransactions,
} from "src/redux/store/features/transaction-slice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import { MyTransactionValue } from "src/utils/boxValues";
import { uiActions } from "src/redux/store/ui-slice";

const Transaction = () => {
  const {
    walletTransactions,
    paystackTransactions,
    success,
    message,
    loading,
    error,
  } = useAppSelector(state => state.transaction);
  const { token } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
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
      dispatch(getMyTransactions(token));
      setTimeout(() => {
        dispatch(clearError());
      }, 10000);
    }
    if (success) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      dispatch(fetchPaystackTransactions(token));
      dispatch(fetchWalletTransactions(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);

  useEffect(() => {
    dispatch(getWalletTransactions(token));
    dispatch(getPaystackTransactions(token));
  }, [dispatch, token]);

  return (
    <ParentContainer>
      <div>
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
              {MyTransactionValue.map(value => (
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
            <TransactionTable data={walletTransactions} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TransactionTable data={paystackTransactions} />
          </TabPanel>
        </Box>
      </div>
    </ParentContainer>
  );
};
export default memo(Transaction);
