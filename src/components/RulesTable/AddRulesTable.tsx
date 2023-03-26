import React, {useEffect, useState} from "react";
import {RuleEntity} from 'types';
import {Logo} from "../Logo/Logo";
import {RulesForm} from "./RulesForm";

export const AddRulesTable = () => {

    const [rulesList, setRulesList] = useState<RuleEntity[]>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/add-rule/rules`, {
            method: 'GET'
        }).then(res => res.json())
            .then((rules) => {
                setRulesList(rules)
            })
    }, [])

    const saveRule = async (values: RuleEntity) => {
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

    return (
        <>
            <Logo to="/instruction" text="Jak to działa?"/>
            <table>
                <thead>
                <tr>
                    <th>
                        Zasada
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <RulesForm
                        initialValues={{
                            rule: '',
                        }}
                        onSubmit={async (values, reset) => {
                            await saveRule(values);
                            reset();
                        }}
                    />
                </tr>

                {rulesList.map((rule, idx) => (
                    <tr key={`row-${idx}`}>
                        <RulesForm
                            initialValues={rule}
                            onSubmit={async (values) => {
                                await editRule(values);
                                await handleUpdateRule(values);
                            }}
                        />
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}