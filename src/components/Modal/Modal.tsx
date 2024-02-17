import React, {useRef, useEffect, HTMLAttributes, PropsWithChildren} from 'react';
import {createPortal} from 'react-dom';
import {IconContext, IconType} from "react-icons";
import classes from './Modal.module.css';

interface Props extends HTMLAttributes<HTMLDialogElement>, PropsWithChildren {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void | Promise<void>;
    confirmText?: string;
    cancelText?: string;
    modalText?: string;
    icon?: IconType;
}

function Modal({
                   open,
                   children,
                   onClose,
                   onConfirm,
                   onCancel,
                   confirmText,
                   cancelText,
                   modalText,
                   icon: IconComponent,
               }: Props) {
    const dialog = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (open && dialog.current) {
            dialog.current.showModal();
        } else if (dialog.current) {
            dialog.current.close();
        }
    }, [open]);

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
            onClose();
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
            onClose();
        }
    };

    return createPortal(
        <dialog
            className={classes.modal}
            ref={dialog}
            onClose={onClose}
        >
            {open ? (
                <div className={classes.div_modal_container}>
                    {children}
                    {modalText && (
                        <h1 className={classes.modal_h1}>{modalText}</h1>
                    )}
                    {IconComponent && (
                        <IconContext.Provider value={{className: `${classes.modal_icon}`}}>
                            <IconComponent/>
                        </IconContext.Provider>
                    )}
                    <div className={classes.actions}>
                        {onCancel && (
                            <button onClick={handleCancel}>
                                {cancelText || 'Cancel'}
                            </button>
                        )}
                        {onConfirm && (
                            <button onClick={handleConfirm}>
                                {confirmText || 'Confirm'}
                            </button>
                        )}
                    </div>
                </div>
            ) : null}
        </dialog>,
        document.getElementById('modal') ?? document.body
    );
}

export default Modal;

