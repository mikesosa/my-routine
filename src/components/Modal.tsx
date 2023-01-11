/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { classNames } from "../utils/classNames";

interface IModalProps {
  children: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  transparent?: boolean;
  showExitButton?: boolean;
  footerButtons?: JSX.Element[] | undefined;
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-7xl mx-3",
  "2xl": "max-w-[80vw]",
};
export default function Modal({
  children,
  open,
  setOpen,
  size = "sm",
  transparent = false,
  showExitButton = false,
  footerButtons,
}: IModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={classNames("relative", transparent ? "z-40" : "z-30")}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classNames(
              "fixed inset-0",
              transparent
                ? "bg-black bg-opacity-90"
                : "bg-gray-500 bg-opacity-75 transition-opacity"
            )}
          />
        </Transition.Child>

        <div
          className={classNames(
            "fixed inset-0 overflow-y-auto",
            transparent ? "z-30" : "z-10"
          )}
        >
          <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  "relative rounded-lg pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:w-full",
                  sizes[size],
                  transparent ? "bg-transparent" : "bg-white shadow-xl ",
                  "max-h-[80vh] mx-auto min-h-[10vh]",
                  footerButtons ? "pb-16" : ""
                )}
              >
                {showExitButton && (
                  <div
                    className="absolute top-0 hidden right-0 pt-4 pr-4 sm:block cursor-pointer "
                    onClick={() => setOpen(false)}
                  >
                    <button
                      type="button"
                      className="text-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                {children}
                {footerButtons && (
                  <div className="fixed bottom-0 w-full flex justify-end items-center py-4 px-8 bg-white">
                    {footerButtons.map((button, index) => (
                      <div key={index}>{button}</div>
                    ))}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
