import {
  DndContext,
  DragOverlay,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import * as taskBarrel from "./";
import { useState } from "react";
import { createPortal } from "react-dom";
import { taskListActions } from "@/store/slices/taskListSlice";
import { useDispatch } from "react-redux";
import useSectionTaskContext from "@/hooks/useSectionTaskContext";

export function TaskList() {
  const {
    sectionTasks: tasks,
    part: { taskIds, id: partId },
  } = useSectionTaskContext();
  const [activeTask, setActiveTask] = useState(null);
  const dispatch = useDispatch();

  // if using Mouse, leave the Pointer
  const sensors = useSensors(
    // useSensor(PointerSensor, {
    //   // Require the mouse to move by 10 pixels before activating
    //   activationConstraint: {
    //     distance: 10,
    //   },
    // }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    // press within 250ms to fire event
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 500,
      },
    }),
  );

  const handleDragStart = (event) => {
    const data = event.active.data.current.task;

    setActiveTask(data);
  };

  const handleDragEnd = (event) => {
    setActiveTask(null);

    const { active, over } = event;

    // If Drag and drop outside DndContext, these code following arise error
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = taskIds.findIndex((taskId) => taskId === active.id);
      const newIndex = taskIds.findIndex((taskId) => taskId === over.id);

      const newOrder = arrayMove(taskIds, oldIndex, newIndex);

      dispatch(taskListActions.setTaskIds({ id: partId, taskIds: newOrder }));
    }
  };

  const renderedTaskList = tasks.map((task) => (
    <taskBarrel.Task key={task.id} task={task} />
  ));

  // SortableContext needs ["id1", "id2",...] that are primary data type. Not use [{id: "1"}, {id: "2"}...]
  // Author of Dnd kit recommended
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="flex flex-col">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {renderedTaskList}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeTask && <task1.Task isOverlay task={activeTask} />}
          </DragOverlay>,
          document.body,
        )}
      </div>
    </DndContext>
  );
}
