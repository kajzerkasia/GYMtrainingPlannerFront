import React, {useEffect, useState} from "react";
import {RuleEntity, Status} from 'types';
import {GoBack} from "../GoBack/GoBack";
import {RulesForm} from "./RulesForm";
import {TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";
import {ConfirmationModal} from "../ConfirmationModal/ConfirmationModal";
import {InformationModal} from "../InformationModal/InformationModal";
import {Link} from "react-router-dom";
import './RulesTable.css';
import {apiUrl} from "../../config/api";

export const RulesTable = () => {

    const [rulesList, setRulesList] = useState<RuleEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeleteRule, setConfirmDeleteRule] = useState<boolean>(false);
    const [ruleToDeleteId, setRuleToDeleteId] = useState(null);
    const [informationModalIsOpen, setInformationModalIsOpen] = useState<boolean>(false);

    const text = 'Czy na pewno chcesz usunąć tę zasadę progresji?'

    const textInformation = 'Należy podać treść zasady progresji!'

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`${apiUrl}/api/add-rule/rules`, {
            method: 'GET'
        }).then(res => res.json())
            .then((rules) => {
                setRulesList(rules)
            })

        return () => {
            try {
                abortController.abort()
            } catch {}
        };
    }, [])

    const closeModal = () => {
        setInformationModalIsOpen(false);
    };

    const addRule = async (values: RuleEntity) => {
        const res = await fetch(`${apiUrl}/api/add-rule/rules`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        const data = await res.json();
        setRulesList(list => [...list, data]);
    };

    const editRule = async (values: RuleEntity) => {
        setIsEdited(false);

        const res = await fetch(`${apiUrl}/api/add-rule/rules/${values.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            throw new Error('Wystąpił błąd podczas próby zaktualizowania zasady.');
        }

        setIsEdited(true);

        return await res.json();

    };

    const handleUpdateRule = (updatedRule: RuleEntity) => {
        setRulesList((rulesList) =>
            rulesList.map((rule) =>
                rule.id === updatedRule.id ? updatedRule : rule
            )
        );
    };

    const handleDeleteRule = async (partId: any) => {
        setConfirmDeleteRule(true);
        setRuleToDeleteId(partId);
    };

    const handleConfirmDelete = async () => {
        const res = await fetch(
            `${apiUrl}/api/add-rule/rules/${ruleToDeleteId}`,
            { method: "DELETE" }
        );
        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Wystąpił błąd: ${error.message}`);
            return;
        }
        setRulesList((setRulesList) =>
            setRulesList.filter((rule) => rule.id !== ruleToDeleteId)
        );
        setConfirmDeleteRule(false);
    };

    const handleCancelDelete = () => {
        setConfirmDeleteRule(false);
        setRuleToDeleteId(null);
    };

    return (
        <div className="rules-wrapper">
            <GoBack to="/plans" text="Gym Training Planner"/>
            <table className="rules-table">
                <thead>
                <tr className="tr-add">
                    <td colSpan={3} className="gradient-bgc-tr">
                        <h1 className="h1-rules">Zasady progresji</h1>
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
                        <td className="td-rule">
                            <Link to="/instruction"><TbQuestionMark/></Link>
                        </td>
                    </IconContext.Provider>
                    <RulesForm
                        initialValues={{
                            rule: '',
                        }}
                        onSubmit={async (values, reset) => {
                            if (values.rule) {
                                await addRule(values);
                                reset();
                            } else {
                                setInformationModalIsOpen(true);
                            }
                        }}
                        actionType={Status.Add}
                    />
                </tr>

                {rulesList.map((rule) => (
                    <tr key={`${rule.id}`}>
                        <td className="td-rule">
                            <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
                                <button onClick={() => handleDeleteRule(rule.id)}><TbX/></button>
                            </IconContext.Provider>
                        </td>
                        <RulesForm
                            initialValues={rule}
                            onSubmit={async (values) => {
                                if (values.rule) {
                                    await editRule(values);
                                    await handleUpdateRule(values);
                                } else {
                                    setInformationModalIsOpen(true);
                                    values.rule = rule.rule;
                                }
                            }}
                            actionType={Status.Save}
                            isEdited={isEdited}
                        />
                    </tr>
                ))}
                </tbody>
            </table>
            <GoBack to="/plans" text="Powrót do strony głównej"></GoBack>
            <ConfirmationModal
                isOpen={confirmDeleteRule}
                onRequestClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={text}
            />
            <InformationModal
                isOpen={informationModalIsOpen}
                onRequestClose={closeModal}
                onConfirm={closeModal}
                onCancel={closeModal}
                text={textInformation}
            />
        </div>
    )
}
