import { Provider } from "react-redux";
import SignUp from "src/components/signupPage";
import store from "src/redux/store";
const Home = () => {
  return (
    <Provider store={store}>
      {" "}
      <SignUp />;
    </Provider>
  );
};

export default Home;
