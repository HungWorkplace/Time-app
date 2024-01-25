function RunningTask() {
  return (
    <div className="flex h-10 items-center gap-3 border-b border-black pl-8">
      <div className="ml-1 h-1.5 w-1.5 rounded-full bg-black"></div>
      <p className="font-medium">Waiting for start time...</p>
    </div>
  );
}

export default RunningTask;
