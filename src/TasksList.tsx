import { useEffect } from "react";
import TaskItem from "./TaskItem";

export type Task = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
};

type Props = {
  tasks: Task[];
};

export default function TasksList({ tasks }: Props) {
  const executeScroll = () => {
    const element = document.getElementById("active-task-task");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    executeScroll();
  }, []);

  return (
    <ul className="divide-y divide-gray-200 border-b border-gray-200">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </ul>
  );
}
