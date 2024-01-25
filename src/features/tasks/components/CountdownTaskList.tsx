import { STATUS } from "@/utils/constains";
import Task from "./Task";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useSectionTaskContext from "@/contexts/useSectionTaskContext";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { taskListActions } from "@/store/slices/taskListSlice";
import GroupDroppable from "./GroupDroppable";

// const DUMMY = {
//   runningTask: {
//     id: "0",
//     partOfDayId: ["part-1"],
//     title: "Exercise",
//     duration: 1 * 5 * 1000,
//     elapsedTime: 0,
//     percent: {
//       value: 0,
//       allDay: false,
//     },
//     mode: "minute",
//     status: STATUS.NOT_STARTED,
//   },
// }

const divideGroupJSX = (title: string) => {
  return (
    <div className="relative mb-4 h-8 border-b-2 border-dashed">
      <span className="absolute bottom-0 left-1/2 inline-block -translate-x-1/2 translate-y-1/2 bg-white px-2 font-medium">
        {title}
      </span>
    </div>
  );
};

function CountdownTaskList() {
  const {
    sectionTasks,
    part: { id: partId, taskIds },
  } = useSectionTaskContext();
  const [activeTask, setActiveTask] = useState(null);

  const dispatch = useDispatch();

  const sensors = useSensors(
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

  const nextTask = sectionTasks.find(
    (task) => task.status === STATUS.NOT_STARTED,
  );

  const notStartedTasks = sectionTasks.filter(
    (task) => task.status === STATUS.NOT_STARTED && task.id !== nextTask?.id,
  );

  const doneTasks = sectionTasks.filter((task) => task.status === STATUS.DONE);

  // Extract code
  const dropToGroup = (agrs: { groupId: string; activeId: string }) => {
    const { groupId, activeId } = agrs;

    const status = {
      "group-queue": STATUS.NOT_STARTED,
      "group-done": STATUS.DONE,
    };

    dispatch(
      taskListActions.setTaskStatus({
        id: activeId,
        status: status[groupId],
      }),
    );
  };

  // Events
  const handleDragStart = (event) => {
    const data = event.active.data.current;

    setActiveTask(data);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!active || !over) return;

    if (active.id === over.id) return;

    if (over.data.current.type === "group") return;

    const {
      data: { current: activeData },
    } = active;
    const {
      data: { current: overData },
    } = over;

    const oldIndex = taskIds.findIndex((taskId) => taskId === active.id);
    const newIndex = taskIds.findIndex((taskId) => taskId === over.id);

    const newOrder = arrayMove(taskIds, oldIndex, newIndex);

    dispatch(taskListActions.setTaskIds({ id: partId, taskIds: newOrder }));

    if (activeData.status === overData.status) return;

    dispatch(
      taskListActions.setTaskStatus({
        id: activeData.id,
        status: overData.status,
      }),
    );
  };

  const handleDragEnd = (event) => {
    setActiveTask(null);

    const { active, over } = event;

    // If Drag and drop outside DndContext, these code following arise error
    if (!over) return;

    if (active.id !== over.id) {
      // const oldIndex = tasks.findIndex((task) => task.id === active.id);
      // const newIndex = tasks.findIndex((task) => task.id === over.id);
      // const newTasks = arrayMove(tasks, oldIndex, newIndex);
      // dispatch(taskListActions.setTasks(newTasks));
    }
  };

  const renderedTasks = (tasks) => ({
    JSX: tasks?.map((task) => <Task key={task.id} task={task} />) || [],
    ids: tasks?.map((task) => task.id) || [],
  });

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // Fig bug: big item collides with small item. And bug: place item in other group
      // closestCorners: when move over one of the over item's border
      collisionDetection={closestCorners}
    >
      {nextTask && <Task task={nextTask} />}
      <SortableContext
        items={renderedTasks(notStartedTasks).ids}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {divideGroupJSX("Queue")}
          {renderedTasks(notStartedTasks).JSX}
        </div>
      </SortableContext>
      <SortableContext items={doneTasks?.map((task) => task.id) || []}>
        <GroupDroppable title="Done" tasks={doneTasks} />
      </SortableContext>

      {createPortal(
        <DragOverlay>
          {activeTask && <Task isOverlay task={activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}

export default CountdownTaskList;
