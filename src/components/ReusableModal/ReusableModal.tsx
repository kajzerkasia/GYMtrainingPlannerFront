import React from "react";
import Modal from "react-modal";
import { IconType } from "react-icons";
import { IconContext } from "react-icons";
import "./ReusableModal.css";

Modal.setAppElement("#root");

export type ReusableModalProps = {
    isOpen: boolean;
    onRequestClose: () => void | Promise<void>;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void | Promise<void>;
    text: string;
    icon: IconType;
    confirmText?: string;
    cancelText?: string;
};

export const ReusableModal = ({
                           isOpen,
                           onRequestClose,
                           onConfirm,
                           onCancel,
                           text,
                           icon: IconComponent,
                           confirmText,
                           cancelText,
                       }: ReusableModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="reusable-modal"
            contentLabel="Example Modal"
            closeTimeoutMS={1200}
        >
            <h2>{text}</h2>
            <IconContext.Provider value={{ className: "icon-modal" }}>
                <IconComponent />
            </IconContext.Provider>
            <div className="modal-buttons">
                {onConfirm && (
                    <button className="btn-confirm" onClick={onConfirm}>
                        {confirmText}
                    </button>
                )}
                {onCancel && (
                    <button className="btn-decline" onClick={onCancel}>
                        {cancelText}
                    </button>
                )}
            </div>
        </Modal>
    );
};
