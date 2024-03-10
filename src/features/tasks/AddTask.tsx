import { useState } from "react";
import * as mode from "../modes";
import { Plus } from "@phosphor-icons/react";
import useModeContext from "@/hooks/useModeContext";
import { cva } from "class-variance-authority";

export function AddTask({ variant }) {
  const [activeAddBox, setActiveAddBox] = useState(false);
  const { inputContentRef: inputRef, addTask } = useModeContext();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      addTask();
      inputRef.current.focus();
    }
  };

  const handleClickPlaceholder = () => {
    setActiveAddBox(true);
    inputRef.current.focus();
  };

  const handleChange = (event) => {
    inputRef.current.value = event.target.value;
  };

  const placeholderVariants = cva(
    "absolute group inset-0 flex cursor-pointer items-center gap-3 bg-white px-2 py-2",
    {
      variants: {
        variant: {
          default: "hover:bg-[#f7f8f9] text-[#8c95a2]",
          lite: "text-gray-300 text-xs",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

  const plusVariant = cva("w-4 h-4 mx-0.5 flex justify-center items-center", {
    variants: {
      variant: {
        default: "",
        lite: "rounded-full group-hover:bg-[#8c95a2] group-hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });

  const placeholderAddTaskJSX = (
    <div
      onClick={handleClickPlaceholder}
      className={placeholderVariants({ variant })}
    >
      <span className={plusVariant({ variant })}>
        <Plus size={13} weight="bold" style={{ display: "inline-block" }} />
      </span>
      <span>Add Task</span>
    </div>
  );

  return (
    <div className="relative w-full ">
      <div className="flex h-10 items-center justify-between  px-2 pl-10">
        {/* warning: input must have ID */}
        <input
          id="add-task"
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          type="text"
          placeholder="Task Name"
          className="flex-1 text-sm font-medium outline-none placeholder:font-light placeholder:text-gray-400"
        />
        <div className="flex flex-1 justify-between gap-3">
          <mode.TaskMode />
        </div>
      </div>

      {!activeAddBox && placeholderAddTaskJSX}
    </div>
  );
}
