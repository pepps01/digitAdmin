import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MySettingsValue } from "../../src/utils/boxValues";
import { useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";

const Setting = () => {
  const [selected, setSelected] = useState(1);
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <ParentContainer>
      <div>
        {" "}
        <Box
          sx={{ width: "100%" }}
          style={{
            background: "white",
            height: "100vh",
            maxWidth: "100vw",
            overflow: "auto",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "rgba(75,0,129, .2)" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              style={{ background: "white" }}
              // classes={{ flexContainer: classes.flexContainer }}
            >
              {MySettingsValue.map(value => (
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
          <TabPanel value={value} index={0}></TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </Box>
      </div>
    </ParentContainer>
  );
};
export default Setting;
