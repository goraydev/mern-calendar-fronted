import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openOrCloseModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const onClickBtnCreate = () => {
    //limpiamos el activeEvent
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#10B981",
      user: {
        _id: "123",
        name: "Gerson",
      },
    });
    openOrCloseModal();
  };

  return (
    <button
      className="absolute right-10 bottom-10 z-10 inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
      onClick={onClickBtnCreate}
    >
      <span>Create new event</span>
    </button>
  );
};
