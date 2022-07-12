import { ReactElement } from "react";
import Task, { TaskProps } from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";

export interface TaskListProps {
  loading: boolean;
  tasks: Array<TaskProps["task"]>;
  onPinTask: TaskProps["onPinTask"];
  onArchiveTask: TaskProps["onArchiveTask"];
}

const TaskList = ({
  loading,
  tasks,
  onPinTask,
  onArchiveTask,
}: TaskListProps): ReactElement => {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const tasksFromStore = useSelector((state: any) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter(
        (t: TaskProps["task"]) => t.state === "TASK_PINNED"
      ),
      ...state.taskbox.tasks.filter(
        (t: TaskProps["task"]) => t.state !== "TASK_PINNED"
      ),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    );
    return filteredTasks;
  });

  const { status } = useSelector((state: any) => state.taskbox);

  const dispatch = useDispatch();

  const pinTask = (value: any) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
  };
  const archiveTask = (value: any) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasksFromStore.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {tasksFromStore.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task) => archiveTask(task)}
        />
      ))}
    </div>
  );
};

export default TaskList;
