import { useDispatch, useSelector } from "react-redux"
import { onClickModal, onOpenModal } from "../store/ui/uiSlice";
export const useUiStore = () => {

    const dispatch = useDispatch();
    const { modal } = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenModal());
    }

    const openOrCloseModal = () => {
        dispatch(onClickModal());
    }

    return {
        modal,
        openDateModal,
        openOrCloseModal,
    }
}
