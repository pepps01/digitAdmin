import { uiActions } from "../../redux/store/ui-slice";
import { NumericFormat } from "react-number-format";

import { useEffect, useState } from "react";
import MultipleInput from "../MultipleInput";
import useHTTPPost from "src/Hooks/use-httppost";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { negotiable, productLevel } from "../../utils/analytics";
import DrawerWrapper from "../DrawerWrapper";
import {
  clearError,
  clearMessage,
  createjob,
  fetchJob,
  updatejob,
} from "src/redux/store/features/job-slice";
import { jobApi } from "../api";
import useHTTPGet from "src/Hooks/use-httpget";

const AddJob = ({ id, title }: any) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const dispatch = useAppDispatch();
  const request = useHTTPGet();
  const { success, loading, error, message } = useAppSelector(
    (state: any) => state.job
  );
  const [items, setItems] = useState<any[]>([{ title: "", value: "" }]);
  const send = useHTTPPost();

  const [datas, setData] = useState({
    headline: "",
    description: "",
    duration: "",
    scope: "",
    negotiate: "",
    budget: null,
    level: "",
  });

  const inputChange = (e: any) => {
    setData({ ...datas, [e.target.name]: e.target.value });
  };

  let handleChange = (index: any, e: any) => {
    let newItems = [...items];

    if (e?.target?.name.startsWith("title")) {
      newItems[index].title = e.target?.value;
    } else if (e?.target?.name.startsWith("value")) {
      newItems[index].value = e?.target?.value;
    }
    setItems(newItems);
  };

  let addFormFields = () => {
    setItems([...items, { title: "", value: "" }]);
  };
  let removeFormFields = (i: any) => {
    let newItems = [...items];
    newItems.splice(i, 1);
    setItems(newItems);
  };

  const payload = {
    headline: datas.headline,
    experience_level: datas.level,
    job_scope: datas.scope,
    budget: datas.budget,
    job_duration: datas.duration,
    is_budget_negotiable: datas.negotiate,
    skills_needed: JSON.stringify(items),
    description: datas.description,
  };

  const updateJobPosting = async () => {
    dispatch(updatejob({ payload, id }));
  };
  const createJobPosting = async () => {
    const data = {
      payload,
      userID: id,
    };
    dispatch(createjob(data));
  };
  const submitFormHandler = (e: any) => {
    e.preventDefault();
    if (title === "Update Job Posting") {
      updateJobPosting();
    } else {
      createJobPosting();
    }
  };

  useEffect(() => {
    if (title === "Update Job Posting") {
      const getJobDetail = () => {
        const url = `${jobApi}/single-job/${id}`;

        const dataFunction = (res: any) => {
          console.log(res);
          setData({
            ...datas,
            headline: res.data.data.headline,
            description: res.data.data.description,
            duration: res.data.data.jobDuration,
            scope: res.data.data.jobScope,
            negotiate: res.data.data.isBudgetNegotiable === "true" ? "1" : "0",
            budget: res.data.data.budget,
            level: res.data.data.experienceLevel,
          });
          setItems(res.data.data.skillsNeeded);
        };
        request({ url, accessToken }, dataFunction);
      };
      getJobDetail();
    }
  }, [accessToken]);

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
      dispatch(uiActions.closedrawer());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      dispatch(fetchJob(accessToken));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);

  return (
    <DrawerWrapper title={title}>
      <form
        className="w-full h-full flex flex-col"
        onSubmit={submitFormHandler}
      >
        <div className="mt-[10px]">
          <label
            htmlFor="headline"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Headline
          </label>
          <input
            type="text"
            name="headline"
            value={datas.headline || ""}
            id="headline"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Headline "
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="level"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Experience Level
          </label>

          <select
            name="level"
            value={datas.level || ""}
            id="level"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder=" Experience Level"
          >
            {productLevel?.map((item: any) => (
              <option
                value={item.name}
                key={item.id}
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-[10px]">
          <label
            htmlFor="duration"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Duration
          </label>
          <input
            type="text"
            name="duration"
            value={datas.duration || ""}
            id="duration"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="duration"
          />
        </div>

        <div className=" mt-[10px]">
          <label
            htmlFor="scope"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Job Scope
          </label>

          <input
            type="text"
            name="scope"
            value={datas.scope}
            id="scope"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Job Scope"
          />
        </div>
        <div className=" mt-[30px]">
          <label
            htmlFor="description"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            value={datas.description || ""}
            id="description"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder="Description"
          />
        </div>

        <div className=" mt-[30px]">
          <label
            htmlFor="price"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Amount
          </label>
          <NumericFormat
            name="budget"
            value={datas.budget || ""}
            allowNegative={false}
            thousandSeparator={true}
            required
            prefix={"₦"}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            onValueChange={(values: any, sourceInfo: any) => {
              const { formattedValue, value } = values;
              const { event, source } = sourceInfo;

              setData({ ...datas, budget: value });
            }}
          />
        </div>

        <div className=" mt-[30px]">
          <label
            htmlFor="negotiate"
            className=" text-[10px] text-[#1D2939] bg-white"
          >
            Negotiable
          </label>

          <select
            name="negotiate"
            value={datas.negotiate}
            id="negotiate"
            onChange={inputChange}
            className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
            placeholder=" Negotiatiable"
          >
            {negotiable?.map((item: any) => (
              <option
                value={item.id}
                key={item.id}
                className=" text-[10px] text-[#1D2939] bg-white"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" text-base text-[#1D2939] bg-white mt-3">
          Skills Needed
        </div>

        {items?.map((element, index) => (
          <MultipleInput
            index={index}
            key={index}
            element={element}
            handleChange={handleChange}
            removeFormFields={removeFormFields}
          />
        ))}
        <div>
          <div onClick={addFormFields} className="text-xs text-gray-600">
            &plus; Add Items
          </div>
        </div>

        <button
          className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center w-[200px] mx-auto mt-3"
          type="submit"
        >
          {title === "Update Job Posting"
            ? "Update Job Posting"
            : "Create Job Posting"}
        </button>
      </form>
    </DrawerWrapper>
  );
};
export default AddJob;
