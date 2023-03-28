import React, {useEffect, useState} from "react";
import {RuleEntity, Status} from 'types';
import {Logo} from "../Logo/Logo";
import {RulesForm} from "./RulesForm";
import {TbQuestionMark, TbX} from "react-icons/tb";
import {IconContext} from "react-icons";

export const RulesTable = () => {

    const [rulesList, setRulesList] = useState<RuleEntity[]>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/add-rule/rules`, {
            method: 'GET'
        }).then(res => res.json())
            .then((rules) => {
                setRulesList(rules)
            })
    }, [])

    const addRule = async (values: RuleEntity) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-rule/rules`, {
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

        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-rule/rules/${values.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            throw new Error('Wystąpił błąd podczas próby zaktualizowania zasady.');
        }

        return await res.json();

    };

    const handleUpdateRule = (updatedRule: RuleEntity) => {
        setRulesList((rulesList) =>
            rulesList.map((rule) =>
                rule.id === updatedRule.id ? updatedRule : rule
            )
        );
    };

    const deleteRule = async (values: RuleEntity) => {

        if (!window.confirm(`Czy na pewno chcesz usunąć zasadę?`)) {
            return;
        }
        const res = await fetch(`${process.env.REACT_APP_API_URL}/add-rule/rules/${values.id}`, {
            method: 'DELETE',
        });
        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Wystąpił błąd: ${error.message}`);
            return;
        } else {
            const data = await res.json();
            setRulesList(
                rulesList => rulesList.filter(rule => rule.id !== data.id)
            )
        }
    };

    return (
        <>
            <table className="rules-table">
                <thead>
                <tr>
                    <td colSpan={3} className="gradient-bgc-tr">
                        <h1 className="h1-rules">Zasady progresji</h1>
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
                        <td>
                            <Logo to="/instruction" text={<TbQuestionMark/>}/>
                        </td>
                    </IconContext.Provider>
                    <RulesForm
                        initialValues={{
                            rule: '',
                        }}
                        onSubmit={async (values, reset) => {
                            await addRule(values);
                            reset();
                        }}
                        actionType={Status.Add}
                    />
                </tr>

                {rulesList.map((rule, idx) => (
                    <tr key={`row-${idx}`}>
                        <td>
                            <IconContext.Provider value={{ className: 'react-icons-smaller' }}>
                                <button onClick={() => deleteRule(rule)}><TbX/></button>
                            </IconContext.Provider>
                        </td>
                        <RulesForm
                            initialValues={rule}
                            onSubmit={async (values) => {
                                await editRule(values);
                                await handleUpdateRule(values);
                            }}
                            actionType={Status.Save}
                        />
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}