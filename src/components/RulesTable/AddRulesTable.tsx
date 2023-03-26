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
            throw new Error('Wystąpił błąd podczas próby zaktualizowania ćwiczenia.');
        }

        const data = await res.json();
        console.log(data);

        // const updateExercise = exercisesList.map((exercise) => exercise.id === values.id ? values : exercise);
        //
        // console.log(updateExercise);

    };

    const handleUpdateRule = async (updatedRule: RuleEntity) => {
        const updateRule = rulesList.map((rule) => rule.id === updatedRule.id ? updatedRule : rule);
        setRulesList(updateRule);
    }

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
                                await handleUpdateRule(values);
                                await editRule(values);
                            }}
                        />
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}