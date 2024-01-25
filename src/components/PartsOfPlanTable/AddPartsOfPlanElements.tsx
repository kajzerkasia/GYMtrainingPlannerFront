import React from 'react';
import {IconContext} from "react-icons";
import {Link, useParams} from "react-router-dom";
import {TbAlertTriangle, TbQuestionMark, TbStairsUp} from "react-icons/tb";
import {PartsOfPlanForm} from "./PartsOfPlanForm";
import {Status} from 'types';
import {useDispatch} from "react-redux";
import {sendPartsOfPlanData} from "../../store/actions/parts-of-plan/sending/sending-action";
import {UseModal} from "../../hooks/useModal";
import UseModals from "../../hooks/useModals";
import Modal from "../Modal/Modal";
import {textInformation} from "../../constants/partsOfPlanTableTexts";

const AddPartsOfPlanElements = () => {

    const dispatch = useDispatch();

    const {setDemoModalIsOpen, setInformationModalIsOpen} = UseModal();

    const params = useParams();

    const {
        isValidationModalOpen,
        openValidationModal,
        closeValidationModal,
    } = UseModals();

    return (
        <tr>
            <Modal
                open={isValidationModalOpen}
                onClose={closeValidationModal}
                onCancel={closeValidationModal}
                modalText={textInformation}
                cancelText="Rozumiem"
                icon={TbAlertTriangle}
            />
            <td className="question-td">
                <IconContext.Provider value={{className: 'react-icons'}}>
                    <Link to="/instruction"><TbQuestionMark/></Link>
                </IconContext.Provider>
            </td>
            <PartsOfPlanForm
                initialValues={{
                    name: '',
                }}
                onSubmit={async (values, reset) => {
                    if (values.name === '') {
                        openValidationModal();
                    } else {
                        dispatch(sendPartsOfPlanData(values, setDemoModalIsOpen, setInformationModalIsOpen, params) as any);
                        reset();
                    }
                }}
                actionType={Status.Add}
            />
            <td className="td-progression-rules">
                <IconContext.Provider value={{className: 'react-icons-progression'}}>
                    <Link to={`/rules/${params.slug}`}><TbStairsUp/></Link>
                </IconContext.Provider>
            </td>
        </tr>
    );
};

export default AddPartsOfPlanElements;