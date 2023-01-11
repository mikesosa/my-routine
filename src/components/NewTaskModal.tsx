import Input from "./Input";
import Modal from "./Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "../utils/createTaskSchema";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function NewTaskModal({ open, setOpen }: Props) {
  const {
    register,
    reset,
    watch,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTaskSchema),
    // defaultValues: {
    //   //   sku: operationData.id,
    //   client_type: "",
    //   dni: "",
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   phone: "",
    //   region: "",
    //   commune: "",
    //   street: "",
    //   streetNumber: "",
    //   unit: "",
    //   tower: "",
    //   floor: "",
    //   isBroker: false,
    //   brokerName: "",
    //   brokerDni: "",
    //   brokerEmail: "",
    //   brokerPhone: "",
    //   hasMortgageDebt: false,
    //   bankName: "",
    // },
  });

  return (
    <Modal open={open} setOpen={setOpen} size="xl">
      <main className="px-4 overflow-auto overflow-x-hidden">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <Input
                label="Title"
                type="text"
                autoComplete="off"
                errors={errors}
                {...register("name")}
              />
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <Input
                label="Description"
                type="text"
                autoComplete="off"
                errors={errors}
                {...register("description")}
              />
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <Input
                label="Time"
                type="number"
                autoComplete="off"
                errors={errors}
                {...register("startTime")}
              />
            </div>
          </div>
        </div>
      </main>
    </Modal>
  );
}
