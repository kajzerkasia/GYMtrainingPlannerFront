import {useRef, useEffect, HTMLAttributes, PropsWithChildren} from 'react';
import { createPortal } from 'react-dom';

interface Props extends HTMLAttributes<HTMLDialogElement>, PropsWithChildren {
    open: boolean;
    onClose: () => void;
}

function Modal({ open, children, onClose }: Props) {
    const dialog = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (open && dialog.current) {
            dialog.current.showModal();
        } else if (dialog.current) {
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        <dialog className="modal" ref={dialog} onClose={onClose}>
            {open ? children : null}
        </dialog>,
        document.getElementById('modal') ?? document.body
    );
}

export default Modal;

