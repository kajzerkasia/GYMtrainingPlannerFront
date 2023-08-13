import {useState} from "react";
import {RuleEntity} from 'types';

export const useRulesTableLogic = () => {

    const [rulesList, setRulesList] = useState<RuleEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeleteRule, setConfirmDeleteRule] = useState<boolean>(false);
    const [ruleToDeleteId, setRuleToDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [planName, setPlanName] = useState("");

    return {
        rulesList,
        isEdited,
        confirmDeleteRule,
        ruleToDeleteId,
        isLoading,
        planName,
        setRulesList,
        setIsEdited,
        setConfirmDeleteRule,
        setRuleToDeleteId,
        setIsLoading,
        setPlanName,
    }
};

