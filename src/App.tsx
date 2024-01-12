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
    <div className="mx-auto max-w-[720px] px-5 text-sm text-[#2a2e34]">
      <header className="w-full bg-gray-400 px-4 py-2 text-base font-semibold text-white">
        TIME
      </header>
      <div className="mt-5">{renderedSection}</div>
    </div>
  );
}

export default App;
