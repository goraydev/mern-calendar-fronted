import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDeletEvent = () => {
  const { deleteEvent } = useCalendarStore();
  const { openOrCloseModal } = useUiStore();

  const onClickDelete = () => {
    deleteEvent();
    openOrCloseModal();
  };

  return (
    <button
      type="button"
      className="my-6 inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-red-500 hover:bg-red-600 focus:bg-red-700 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300 disabled:shadow-none"
      onClick={onClickDelete}
    >
      <span>Delete event</span>
    </button>
  );
};
