/*global chrome*/
import RadialProgressIndicator from "./components/RadialProgressIndicator";
import useAudio from "./hooks/useAudio";
import { Task } from "./TasksList";
import { classNames } from "./utils/classNames";

type Props = {
  task: Task;
};

function diffMinutes(dt2: Date, dt1: Date) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.round(diff);
}

const createDateTime = (time: string) => {
  const date = new Date();
  const [hours, minutes] = time.split(":");
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  return date;
};

const isTaskActive = (task: Task) => {
  const currentDate = new Date();
  const diff = diffMinutes(currentDate, createDateTime(task.startTime));
  const res = diff >= 0 && diff <= 60;
  return res;
};

const getPercentage = (task: Task) => {
  const currentDate = new Date();
  const startDate = createDateTime(task.startTime);
  const diff1 = diffMinutes(currentDate, startDate);
  const percentage = (diff1 / 60) * 100;
  return Math.round(percentage);
};

export default function TaskItem({ task }: Props) {
  const [toggle] = useAudio(
    "https://upload.wikimedia.org/wikipedia/commons/5/55/En-us-house-noun.ogg"
  );
  const isActive = isTaskActive(task);

  const checkPlaySound = () => {
    // console.log("checkPlaySound", isActive);
    // const currentDate = new Date();
    // const startDate = createDateTime(task.startTime);
    // const diff = diffMinutes(currentDate, startDate);
    // if (!diff && isActive) {
    // toggle();
    // }
  };

  // useEffect(() => {
  //   if (isActive) {
  //     const timer = setInterval(() => {
  //       checkPlaySound();
  //     }, 3000);
  //     return () => clearInterval(timer);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleClick = () => {
    chrome.runtime.sendMessage({
      action: "updateIcon",
      value: false,
    });
  };

  return (
    <li
      id={isActive ? "active-task" : ""}
      className={classNames(
        isActive ? "hover:bg-gray-50" : " bg-gray-300",
        "relative py-5 pl-4 pr-6 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6 cursor-pointer"
      )}
    >
      <div className="flex items-center justify-between space-x-4">
        {/* Repo name and link */}
        <div className="min-w-0 space-y-3">
          <div className="flex items-center space-x-3">
            <span
              className={classNames(
                isActive ? "bg-green-100" : "bg-gray-100",
                "h-4 w-4 rounded-full flex items-center justify-center"
              )}
              aria-hidden="true"
            >
              <span
                className={classNames(
                  isActive ? "bg-green-400" : "bg-gray-400",
                  "h-2 w-2 rounded-full"
                )}
              />
            </span>

            <h2 className="text-sm font-medium">
              <span className="absolute inset-0" aria-hidden="true" />
              {task.name}{" "}
              <span className="sr-only">
                {isActive ? "Running" : "Not running"}
              </span>
            </h2>
          </div>
          <div className="group relative flex items-center space-x-2.5">
            <div>
              <RadialProgressIndicator
                percentage={isActive ? getPercentage(task) : 100}
              />
            </div>
            <span className="truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
              {task.description}
            </span>
            <button onClick={handleClick}>console.error</button>;
          </div>
        </div>
        <div className="font-medium flex-shrink-0 text-sm">
          {task.startTime}
        </div>
      </div>
    </li>
  );
}
