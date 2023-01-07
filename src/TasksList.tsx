import { useEffect } from "react";
import RadialProgressIndicator from "./components/RadialProgressIndicator";
import { classNames } from "./utils/classNames";

type Task = {
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

  const createDateTime = (time: string) => {
    const date = new Date();
    const [hours, minutes] = time.split(":");
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date;
  };

  function diffMinutes(dt2: Date, dt1: Date) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  const isTaskActive = (task: Task) => {
    const currentDate = new Date();
    const diff = diffMinutes(currentDate, createDateTime(task.startTime));
    return diff >= 0 && diff <= 60;
  };

  const getPercentage = (task: Task) => {
    const currentDate = new Date();
    const startDate = createDateTime(task.startTime);
    const diff1 = diffMinutes(currentDate, startDate);
    const percentage = (diff1 / 60) * 100;
    return Math.round(percentage);
  };

  return (
    <ul className="divide-y divide-gray-200 border-b border-gray-200">
      {tasks.map((task, index) => (
        <li
          id={isTaskActive(task) ? "active-task" : ""}
          key={index}
          className={classNames(
            isTaskActive(task) ? "hover:bg-gray-50" : " bg-gray-300",
            "relative py-5 pl-4 pr-6 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6 cursor-pointer"
          )}
        >
          <div className="flex items-center justify-between space-x-4">
            {/* Repo name and link */}
            <div className="min-w-0 space-y-3">
              <div className="flex items-center space-x-3">
                <span
                  className={classNames(
                    isTaskActive(task) ? "bg-green-100" : "bg-gray-100",
                    "h-4 w-4 rounded-full flex items-center justify-center"
                  )}
                  aria-hidden="true"
                >
                  <span
                    className={classNames(
                      isTaskActive(task) ? "bg-green-400" : "bg-gray-400",
                      "h-2 w-2 rounded-full"
                    )}
                  />
                </span>

                <h2 className="text-sm font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {task.name}{" "}
                  <span className="sr-only">
                    {isTaskActive(task) ? "Running" : "Not running"}
                  </span>
                </h2>
              </div>
              <div className="group relative flex items-center space-x-2.5">
                <div>
                  <RadialProgressIndicator
                    percentage={isTaskActive(task) ? getPercentage(task) : 100}
                  />
                </div>
                <span className="truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                  {task.description}
                </span>
              </div>
            </div>
            <div className="font-medium flex-shrink-0 text-sm">
              {task.startTime}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
