import React, {useEffect, useState} from 'react';
import {PlanEntity, Status} from 'types';
import {TbQuestionMark, TbX, TbHeartbeat, TbDotsVertical, TbUserCircle, TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config/api";
import './PlansList.css';
import {PlansListForm} from "./PlansListForm";
import {MoonLoader} from "react-spinners";
import {isDemoEnabled} from "../hooks/env";
import {ReusableModal} from "../ReusableModal/ReusableModal";
import {DemoSign} from "../DemoSign/DemoSign";

export const PlansList = () => {

    const [plansList, setPlansList] = useState<PlanEntity[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [confirmDeletePlan, setConfirmDeletePlan] = useState<boolean>(false);
    const [planToDeleteId, setPlanToDeleteId] = useState(null);
    const [informationModalIsOpen, setInformationModalIsOpen] = useState<boolean>(false);
    const [demoModalIsOpen, setDemoModalIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    const text = 'Czy na pewno chcesz usunąć ten plan? Spowoduje to także usunięcie wszystkich części planu przypisanych do tego planu';

    const demoText = 'To jest wersja demo aplikacji "Gym Training Planner". Nie można w niej dodawać, edytować ani usuwać wybranych elementów.'

    const textInformation = 'Należy podać nazwę planu!'

    useEffect(() => {
        const abortController = new AbortController();

        fetch(`${apiUrl}/api/add-plan/list`, {
            method: 'GET',
            signal: abortController.signal
        }).then(res => res.json())
            .then((plans) => {
                setPlansList(plans);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Wystąpił błąd podczas próby pobrania danych o planach treningowych:", error);
                setIsLoading(false);
            });

        return () => {
            try {
                abortController.abort()
            } catch {
            }
        };
    }, [])

    const closeModal = () => {
        setInformationModalIsOpen(false);
    };

    const closeDemoModal = () => {
        setDemoModalIsOpen(false);
    };

    const addPlan = async (values: PlanEntity) => {
        if (isDemoEnabled()) {
            setDemoModalIsOpen(true); // Otwórz demoModal, jeśli demo jest włączone
        } else if (values.name) {
            const res = await fetch(`${apiUrl}/api/add-plan/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            setPlansList(list => [...list, data]);
        } else {
            setInformationModalIsOpen(true); // Otwórz informationModal, jeśli brakuje nazwy planu
        }
    };

    const editPlan = async (values: PlanEntity, reset: () => void) => {

        setIsEdited(false);

        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            reset();
        } else if (values.name) {

        const res = await fetch(`${apiUrl}/api/add-plan/list/${values.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            throw new Error('Wystąpił błąd podczas próby zaktualizowania nazwy planu.');
        }

        setIsEdited(true);

        return await res.json();

        } else {
            setInformationModalIsOpen(true);
            reset();
        }
    };

    const handleUpdatePlan = (updatedPlan: PlanEntity) => {
        setPlansList((plansList) =>
            plansList.map((plan) =>
                plan.id === updatedPlan.id ? updatedPlan : plan
            )
        );
    };

    const handleDeletePlan = async (planId: any) => {
        if (isDemoEnabled()) {
            setDemoModalIsOpen(true);
            setPlanToDeleteId(planId);
        } else {
            setConfirmDeletePlan(true);
            setPlanToDeleteId(planId);
        }
    };

    const handleConfirmDelete = async () => {
        if (isDemoEnabled()) {
            closeDemoModal();
        } else {
            const res = await fetch(
                `${apiUrl}/api/add-plan/list/${planToDeleteId}`,
                {method: "DELETE"}
            );
            if ([400, 500].includes(res.status)) {
                const error = await res.json();
                alert(`Wystąpił błąd: ${error.message}`);
                return;
            }
            setPlansList((plansList) =>
                plansList.filter((plan) => plan.id !== planToDeleteId)
            );
            setConfirmDeletePlan(false);
            setPlanToDeleteId(null);
        }
    };

    const handleCancelDelete = () => {
        setConfirmDeletePlan(false);
        setPlanToDeleteId(null);
    };

    if (isLoading || !plansList) {
        return (
            <div className="spinner_container">
                <div className="div_loading">Ładowanie planów treningowych...</div>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870" />
            </div>
        );
    }

    return (
        <>
        <div className="parts-wrapper">
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>

            <div className="main-plan">
                <DemoSign/>
                <table className="main-table">

                    <thead>
                    <tr className="tr-add">
                        <td className="training-plans" align="center" colSpan={4}>
                            <h1 className="h1-plan">Plany treningowe</h1>
                        </td>
                        <td>
                            <IconContext.Provider value={{className: 'react-icons'}}>
                                <TbUserCircle/>
                            </IconContext.Provider>
                        </td>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td className="question-td">
                            <IconContext.Provider value={{className: 'react-icons'}}>
                                <Link to="/instruction"><TbQuestionMark/></Link>
                            </IconContext.Provider>
                        </td>
                        <PlansListForm
                            initialValues={{
                                name: '',
                            }}
                            onSubmit={async (values, reset) => {
                                await addPlan(values);
                                reset();
                            }}
                            actionType={Status.Add}
                        />
                    </tr>

                    {plansList.map((plan) => (
                        <tr key={`${plan.id}`}>
                            <td>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <button onClick={() => handleDeletePlan(plan.id)}><TbX/></button>
                                </IconContext.Provider>
                            </td>
                            <PlansListForm
                                initialValues={plan}
                                onSubmit={async (values, reset) => {
                                        await editPlan(values, reset);
                                        await handleUpdatePlan(values);
                                }}
                                actionType={Status.Save}
                                isEdited={isEdited}
                            />
                            <td className="dots" colSpan={1}>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <Link to={`/plans/${plan.slug}`}><TbDotsVertical/></Link>
                                </IconContext.Provider>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <ReusableModal
                isOpen={confirmDeletePlan}
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
            {demoModalIsOpen && (
                <ReusableModal
                    isOpen={demoModalIsOpen}
                    onRequestClose={closeDemoModal}
                    onConfirm={closeDemoModal}
                    text={demoText}
                    icon={TbAlertTriangle}
                    confirmText="OK"
                />
            )}
        </div>
        </>
    )
}

// TODO: Zrobić resztę komponentów podobnie - pod demo, pomyśleć o refactorze wszystkich podobnych komponentów (Table), zmienić kolor tabeli na taki jak był