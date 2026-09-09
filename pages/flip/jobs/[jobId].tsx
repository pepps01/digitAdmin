import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MyJobValue } from "../../../src/utils/boxValues";
import { useEffect, useState } from "react";
import { uiActions } from "../../../src/redux/store/ui-slice";
import ParentContainer from "src/components/ParentContainer";
import axios from "axios";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import ProposalTable from "src/components/tables/ProposalTable";
import { GetStaticProps } from "next/types";
import { clearError, clearMessage } from "src/redux/store/features/job-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import JobList from "src/components/JobList";
import { jobApi, proposalApi } from "src/components/api";

const OneMerchant = (props: any) => {
  const { jobs, loading, error, message, success } = useAppSelector(
    state => state.job
  );
  const dispatch = useAppDispatch();
  const [job, setJob] = useState<any>();
  const [proposal, setProposal] = useState<any>();

  const fetchAJob = async (id: any) => {
    console.log(id);
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const res: any = await axios.get(`${jobApi}/single-job/${id}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          authsource: "user",
        },
      });
      console.log(res?.data.data);
      setJob(res?.data.data);
    } catch (error: any) {}
  };
  const fetchProposal = async (id: any) => {
    console.log(id);
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const res: any = await axios.get(
        `${proposalApi}/proposals-for-job/${id}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            authsource: "user",
          },
        }
      );
      console.log(res?.data.data);
      setProposal(res?.data.data);
    } catch (error: any) {}
  };

  const [selected, setSelected] = useState(1);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetchAJob(props.jobId);
    fetchProposal(props.jobId);
  }, [props.jobId]);
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
      dispatch(uiActions.closeModal());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      fetchAJob(props.jobId);
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, props.jobId]);
  return (
    <ParentContainer>
      <div>
        <JobList job={job} />
        <div className="flex  items-center bg-lightPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] md:flex-row justify-between relative z-1 text-white">
          <div className="flex flex-col justify-between w-full md:w-[350px] gap-3">
            <div className="flex flex-col">
              <div className="text-xs mb-1 text-text font-bold">Headline</div>
              <div className="text-sm">{job?.headline}</div>
            </div>
            <div className="flex flex-col ">
              <div className="text-xs mb-1 text-text font-bold"> Duration</div>
              <div className="text-sm">{job?.duration}</div>
            </div>

            <div className="flex flex-col ">
              <div className="text-xs mb-1 text-text font-bold">Job Scope</div>
              <div className="text-sm">{job?.jobScope} </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full md:w-[350px] gap-3">
            <div className="flex flex-col ">
              <div className="text-xs mb-1 text-text font-bold">
                Experience Level
              </div>
              <div className="text-sm">{job?.experienceLevel}</div>
            </div>
            <div className="flex flex-col ">
              <div className="text-xs mb-1 text-text font-bold">
                Date Posted
              </div>
              <div className="text-sm">{job?.datePosted}</div>
            </div>
            <div className="flex flex-col ">
              <div className="text-xs mb-1 text-text font-bold">Budget</div>
              <div className="text-sm">₦ {job?.budget}</div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full md:w-[350px] gap-3">
            <div className="text-xs mb-1 text-text font-bold">Description</div>
            <div className="text-sm">{job?.description}</div>
          </div>
        </div>
        <div className="mt-[30px]">
          {" "}
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
                {MyJobValue.map(value => (
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
              {job?.skillsNeeded?.length !== 0 ? (
                <div className=" mt-5 w-full">
                  <div className="text-darkPurple text-lg text-center">
                    Skills Needed
                  </div>
                  <div className="flex justify-between mt-5 w-full">
                    {job?.skillsNeeded?.map((item: any, index: any) => (
                      <div className="mt-5" key={index}>
                        <div className="text-xs text-text mb-5">
                          {item?.title}
                        </div>
                        <div className="text-base">{item?.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ProposalTable data={proposal} />
            </TabPanel>
          </Box>
        </div>
      </div>
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const jobId = context.params.jobId;
  return {
    props: {
      jobId,
    },
  };
};
export default OneMerchant;
