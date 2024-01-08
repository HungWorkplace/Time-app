import Section from "./features/sections/Section";

function App() {
  const partOfDays = useSelector((state) => state.taskList);
  return (
    <div className="max-w-[720px] px-5 mx-auto text-[#2a2e34]">
      <Section />
    </div>
  );
}

export default App;
