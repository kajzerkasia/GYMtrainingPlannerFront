import React from 'react';
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {TbQuestionMark, TbStairsUp} from "react-icons/tb";
import {PartsOfPlanForm} from "./PartsOfPlanForm";
import {Status} from 'types';
import {PartOfPlanEntity} from 'types';

interface AddPartsOfPlanElementsProps {
    addPartOfPlan: (values: PartOfPlanEntity) => void;
    params: Record<string, string | undefined>;
}

const AddPartsOfPlanElements = ({addPartOfPlan, params}: AddPartsOfPlanElementsProps) => {
    return (
        <tr>
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
                    addPartOfPlan(values);
                    reset();
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