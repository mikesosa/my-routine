import { Menu } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import TasksList from "./TasksList";

const tasks = [
  {
    name: "Coffee, water, read news",
    description: "Get ready for the day. Try to read the news.",
    startTime: "06:00",
    endTime: "06:45",
  },
];

function App() {
  return (
    <div className="w-96 min-h-screen border sshadow-sm">
      <div className="bg-white lg:min-w-0 lg:flex-1">
        <div className="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
          <div className="flex items-center">
            <h1 className="flex-1 text-lg font-medium">My Routine</h1>
            <Menu as="div" className="relative">
              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <PlusCircleIcon
                  className="mr-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Add task
              </Menu.Button>
            </Menu>
          </div>
        </div>
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
