import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";
import { useState } from "react";
import { createPortal } from "react-dom";
import { taskListActions } from "@/store/slices/taskListSlice";
import { useDispatch } from "react-redux";
import useSectionTaskContext from "@/contexts/useSectionTaskContext";

function TaskList() {
  const tasks = useSectionTaskContext().sectionTasks;
  const [activeTask, setActiveTask] = useState(null);
  const dispatch = useDispatch();

  const handleDragStart = (event) => {
    const data = event.active.data.current;

    setActiveTask(data);
  };

  const handleDragEnd = (event) => {
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      const newTasks = arrayMove(tasks, oldIndex, newIndex);

      dispatch(taskListActions.setTasks(newTasks));
    }
  };

  const renderedTaskList = tasks.map((task) => (
    <Task key={task.id} task={task} />
  ));

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {renderedTaskList}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeTask && <Task isOverlay task={activeTask} />}
          </DragOverlay>,
          document.body,
        )}
      </div>
    </DndContext>
  );
}

export default TaskList;
