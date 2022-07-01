import { ReactElement } from "react";

export interface TaskProps {
  task: { id: string; title: string; state: string };
  onArchiveTask: () => void;
  onPinTask: () => void;
}

const Task = ({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}: TaskProps): ReactElement => {
  return (
    <div className="list-item">
      <label htmlFor="title" aria-label={title}>
        <input type="text" value={title} readOnly={true} name="title" />
      </label>
    </div>
  );
};

export default Task;
