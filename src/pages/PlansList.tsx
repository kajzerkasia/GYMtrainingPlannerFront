import React, {Suspense, useCallback, useEffect} from 'react';
import {Status} from 'types';
import {TbQuestionMark, TbX, TbDotsVertical, TbUserCircle, TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Await, defer, json, Link, useLoaderData} from "react-router-dom";
import './PlansList.css';
import {PlansListForm} from "../components/PlansList/PlansListForm";
import {DemoSign} from "../components/DemoSign/DemoSign";
import {demoText} from "../constants/demoText";
import {text, textInformation} from "../constants/plansListTexts";
import {usePlansListLogic} from "../hooks/usePlansListLogic";
import Modal from "../components/Modal/Modal";
import {apiUrl} from "../config/api";
import {PlanEntity} from 'types';

export type Method = 'POST' | 'PUT';

export const PlansList = () => {
    const data = useLoaderData() as { plans: PlanEntity[] };
    const list = data.plans;

    const {
        isEdited,
        confirmDeletePlan,
        informationModalIsOpen,
        demoModalIsOpen,
        setPlansList,
        closeModal,
        closeDemoModal,
        handleDeletePlan,
        handleConfirmDelete,
        handleCancelDelete,
    } = usePlansListLogic();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resolvedPlans = await list;
                if (resolvedPlans && Array.isArray(resolvedPlans)) {
                    setPlansList(resolvedPlans);
                } else {
                    console.error("Nieprawidłowe dane o planach:", resolvedPlans);
                }
            } catch (error) {
                console.error("Błąd podczas ustawiania danych:", error);
            }
        };

        fetchData();
    }, [setPlansList, list]);



    const addOrEditPlan = useCallback(async (values: PlanEntity, reset: () => void, method: Method) => {
        try {
            const newPlan = await action({
                request: {
                    formData: async () => {
                        const formData = new FormData();
                        formData.append('name', values.name);
                        return formData;
                    },
                    method: method,
                },
                planId: values.id,
            });

            setPlansList(currentList => {
                if (method === 'POST') {
                    reset();
                    return [...currentList, newPlan];
                } else {
                    return currentList.map(plan => (plan.id === newPlan.id ? newPlan : plan));
                }
            });
        } catch (error) {
            console.error("Wystąpił błąd w trakcie aktualizowania listy planów:", error);
        }
    }, [setPlansList]);

    return (
        <>
            <div className="parts-wrapper">
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
                                method="POST"
                                initialValues={{
                                    name: '',
                                }}
                                onSubmit={async (values, reset) => {
                                    await addOrEditPlan(values, reset, 'POST')
                                }}
                                actionType={Status.Add}
                            />
                        </tr>

                        <Suspense fallback={(
                            <tr>
                            <td className="suspense">Loading...</td>
                            </tr>
                        )}>
                            <Await resolve={list}>
                                {(loadedPlans) =>
                                    <>
                                        {loadedPlans && loadedPlans.map((plan: PlanEntity) => (
                                            <tr key={`${plan.id}`}>
                                                <td>
                                                    <IconContext.Provider value={{className: 'react-icons'}}>
                                                        <button onClick={() => handleDeletePlan(plan.id)}><TbX/></button>
                                                    </IconContext.Provider>
                                                </td>

                                                <PlansListForm
                                                    method="PUT"
                                                    initialValues={plan}
                                                    onSubmit={async (values, reset) => {
                                                        await addOrEditPlan(values, reset, 'PUT');
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
                                    </>
                                }
                            </Await>
                        </Suspense>
                        </tbody>
                    </table>
                </div>
                <Modal
                    open={confirmDeletePlan}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    modalText={text}
                    confirmText="Tak"
                    cancelText="Nie"
                    icon={TbAlertTriangle}
                />
                <Modal
                    open={informationModalIsOpen}
                    onClose={closeModal}
                    onConfirm={closeModal}
                    modalText={textInformation}
                    confirmText="Rozumiem"
                    icon={TbAlertTriangle}
                />
                <Modal
                    open={demoModalIsOpen}
                    onClose={closeDemoModal}
                    onConfirm={closeDemoModal}
                    modalText={demoText}
                    confirmText="OK"
                    icon={TbAlertTriangle}
                />
            </div>
        </>
    )
}

const loadPlans = async (): Promise<PlanEntity[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/add-plan/list`);

        if (!response.ok) {
            throw new Error('Nie udało się pobrać danych o planach treningowych');
        }

        const resData = await response.json();
        return resData;
    } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        throw error;
    }
}

export async function loader() {
    return defer({
        plans: loadPlans()
    })
}

interface RequestData {
    method: string;
    formData: () => Promise<FormData>;
}

interface ActionProps {
    planId?: string | undefined;
    request: RequestData;
}

export async function action({request, planId}: ActionProps) {
    const method = request.method;
    const data = await request.formData();

    const plansData = {
        name: data.get('name')
    };

    let url = `${apiUrl}/api/add-plan/list`;

    if (method === 'PUT') {
        url = `${apiUrl}/api/add-plan/list/${planId}`;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plansData)
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        console.error("Błąd podczas wysyłania zapytania", response);
        throw json({message: 'Nie można zaktualizować listy planów.'}, {
            status: 500,
        });
    }
    return await response.json();
}
