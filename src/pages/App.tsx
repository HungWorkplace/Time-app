import axios from "axios";
import { useSelector } from "react-redux";
import Section from "../features/sections/Section";
import SectionTaskProvider from "../contexts/combine-section-task";

function App() {
  const { partOfDays } = useSelector((state) => state.taskList);

  const renderedSection = partOfDays.map((part) => (
    <SectionTaskProvider key={part.id} part={part}>
      <Section />
    </SectionTaskProvider>
  ));

  // const handleGG = () => {
  //   window.open(
  //     "http://localhost:8000/auth/google",
  //     "_blank",
  //     "width=500,height=600",
  //   );

  //   // close popup login
  //   window.close();
  // };

  return (
    <div className="container mx-auto px-5 text-sm text-[#2a2e34]">
      <div className="mt-20">
        <div className="px-5">{renderedSection}</div>
      </div>
    </div>
  );
}

export default App;

export const loader = async () => {
  // const user = await axios.get("http://localhost:8000/api/v1/users/me", {
  //   withCredentials: true,
  // });
  // console.log(user);
  return "";
};
