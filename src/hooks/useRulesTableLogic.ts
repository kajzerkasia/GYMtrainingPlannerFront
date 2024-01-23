import {useEffect, useState} from "react";
import {RuleEntity} from 'types';
import {apiUrl} from "../config/api";
import {isDemoEnabled} from "../helpers/env";
import {UseModal} from "./useModal";
import {useParams} from "react-router-dom";

export const useRulesTableLogic = () => {

    const [rulesList, setRulesList] = useState<RuleEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeleteRule, setConfirmDeleteRule] = useState<boolean>(false);
    const [ruleToDeleteId, setRuleToDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [planName, setPlanName] = useState("");

    const params = useParams();

    const {
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
        setInformationModalIsOpen,
        setDemoModalIsOpen,
        closeDemoModal,
    } = UseModal();

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

    const addRule = async (values: RuleEntity) => {

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
        } else if (values.rule) {


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
        } else {
            setInformationModalIsOpen(true);
        }
    };

    const editRule = async (values: RuleEntity, reset: () => void) => {

        setIsEdited(false);

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            reset();
        } else if (values.rule) {

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
        } else {
            setInformationModalIsOpen(true);
            reset();
        }
    };

    const handleUpdateRule = (updatedRule: RuleEntity) => {
        setRulesList((rulesList) =>
            rulesList.map((rule) =>
                rule.id === updatedRule.id ? updatedRule : rule
            )
        );
    };

    const handleDeleteRule = async (ruleId: any) => {

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            setRuleToDeleteId(ruleId);
        } else {
            setConfirmDeleteRule(true);
            setRuleToDeleteId(ruleId);
        }
    };

    const handleConfirmDelete = async () => {

        if (isDemoEnabled()) {
            closeDemoModal();
        } else {
            const res = await fetch(
                `${apiUrl}/api/add-rule/rules/${ruleToDeleteId}`,
                {method: "DELETE"}
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
        }
    };

    const handleCancelDelete = () => {
        setConfirmDeleteRule(false);
        setRuleToDeleteId(null);
    };

    return {
        rulesList,
        isEdited,
        confirmDeleteRule,
        ruleToDeleteId,
        isLoading,
        planName,
        informationModalIsOpen,
        demoModalIsOpen,
        closeModal,
        closeDemoModal,
        setRulesList,
        setIsEdited,
        setConfirmDeleteRule,
        setRuleToDeleteId,
        setIsLoading,
        setPlanName,
        addRule,
        editRule,
        handleUpdateRule,
        handleDeleteRule,
        handleConfirmDelete,
        handleCancelDelete,
    }
};

