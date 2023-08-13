import React, {useEffect, useState} from "react";
import {RuleEntity, Status} from 'types';
import {RulesForm} from "./RulesForm";
import {TbAlertTriangle, TbHeartbeat, TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Link, useParams} from "react-router-dom";
import './RulesTable.css';
import {apiUrl} from "../../config/api";
import {MoonLoader} from "react-spinners";
import {ReusableModal} from "../ReusableModal/ReusableModal";

export const RulesTable = () => {

    const [rulesList, setRulesList] = useState<RuleEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeleteRule, setConfirmDeleteRule] = useState<boolean>(false);
    const [ruleToDeleteId, setRuleToDeleteId] = useState(null);
    const [informationModalIsOpen, setInformationModalIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [planName, setPlanName] = useState("");

    const text = 'Czy na pewno chcesz usunąć tę zasadę progresji?'

    const textInformation = 'Należy podać treść zasady progresji!'

    const params = useParams();

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`${apiUrl}/api/add-plan/list?slug=${params.slug}`, {
            method: 'GET',
        })
            .then(r => r.json())
            .then((plan) => {

                if (!plan || plan.length === 0) {
                    console.log('Brak planu.')
                } else {
                    setPlanName(plan[0].name);
                    return fetch(`${apiUrl}/api/add-rule/rules?planId=${plan[0].id}`, {
                        method: 'GET',

                    }).then(res => res.json())
                        .then((rules) => {
                            if (!rules) {
                                return Promise.reject('Brak zasad dla wybranego planu.')
                            } else {
                                setRulesList(rules);
                                setIsLoading(false);
                            }
                        })
                        .catch((error) => {
                            console.error("Wystąpił błąd podczas pobierania danych o zasadach progresji.", error);
                            setIsLoading(false);
                        });
                }
            })

        return () => {
            try {
                abortController.abort()
            } catch {
            }
        };

    }, [params.slug])

    const closeModal = () => {
        setInformationModalIsOpen(false);
    };

    const addRule = async (values: RuleEntity) => {
        fetch(`${apiUrl}/api/add-plan/list?slug=${params.slug}`, {
            method: 'GET',
        })
            .then(r => r.json())
            .then(async (plan) => {
                if (!plan || plan.length === 0) {
                    console.log('Brak planu.')
                } else {

                    const res = await fetch(`${apiUrl}/api/add-rule/rules?planId=${plan[0].id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({...values, planId: plan[0].id}),
                    })

                    const data = await res.json();

                    setRulesList(list => [...list, data]);

                }
            })
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

    if (isLoading || !rulesList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie zasad progresji...</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870" />
            </div>
        );
    }

    return (
        <div className="rules-wrapper">
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>
            <div className="inner-container">
                <h2>{planName}</h2>
            </div>
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
            <button className="btn-back-exercises" onClick={() => window.history.back()}>
                Powrót
            </button>
            <ReusableModal
                isOpen={confirmDeleteRule}
                onRequestClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                text={text}
                icon={TbAlertTriangle}
                confirmText="Tak"
                cancelText="Nie"
            />
            <ReusableModal
                isOpen={informationModalIsOpen}
                onRequestClose={closeModal}
                onConfirm={closeModal}
                text={textInformation}
                icon={TbAlertTriangle}
                confirmText="Rozumiem"
            />
        </div>
    )
}