import { ConfirmModal } from "../components";

export default {
    title: 'Confirm modal component',
    component: ConfirmModal,
    tags: ['autodocs'],
};

export const Primary = {
    args: {
        open: true,
        title: "Some title",
        url: "some url",
        onClose: () => {}
    }
};
