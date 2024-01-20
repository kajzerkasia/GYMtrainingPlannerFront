import React, {useRef, useEffect, HTMLAttributes, PropsWithChildren} from 'react';
import {createPortal} from 'react-dom';
import './Modal.css';
import {IconContext, IconType} from "react-icons";

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
        <dialog className="modal" ref={dialog} onClose={onClose}>
            {open ? (
                <div className="modal-container">
                    {children}
                    {modalText && (
                        <h1 className="modal-h1">{modalText}</h1>
                    )}
                    {IconComponent && (
                        <IconContext.Provider value={{className: "icon-modal"}}>
                            <IconComponent/>
                        </IconContext.Provider>
                    )}
                    <div>
                        {onConfirm && (
                            <button className="btn-confirm" onClick={handleConfirm}>
                                {confirmText || 'Confirm'}
                            </button>
                        )}
                        {onCancel && (
                            <button className="btn-decline" onClick={handleCancel}>
                                {cancelText || 'Cancel'}
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

