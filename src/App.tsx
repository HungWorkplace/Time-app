import { useSelector } from "react-redux";
import Section from "./features/sections/Section";
import SectionTaskProvider from "./contexts/combine-section-task";

function App() {
  const { partOfDays } = useSelector((state) => state.taskList);

  const renderedSection = partOfDays.map((part) => (
    <SectionTaskProvider key={part.id} part={part}>
      <Section />
    </SectionTaskProvider>
  ));

  return (
    <div className="mx-auto max-w-[784px] px-5 text-sm text-[#2a2e34]">
      <div className="mt-20">
        <div className="px-5">{renderedSection}</div>
      </div>
    </div>
  );
}

export default App;
