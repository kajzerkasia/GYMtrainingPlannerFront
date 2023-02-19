import {useState} from "react";
import {Form} from "../Form/Form";
import {Table} from "../Table/Table";

export const Profile = () => {
    const [tableData, setTableData] = useState([]);
    const [formObject, setFormObject] = useState({
        order: '',
        exercise: '',
        series: 0,
        repetitions: '',
        tempo: 0,
        break: '',
        url: '',
    });

    const onValChange = (event: any) => {
        const value = (res: any) => ({
            ...res,
            [event.target.name]: event.target.value,
        });
        setFormObject(value);
    };

    const onFormSubmit = (event: any) => {
        event.preventDefault();
        const checkVal = !Object.values(formObject).every((res) => res === "");
        if (checkVal) {
            const dataObj: any = (data: any) => [...data, formObject];
            setTableData(dataObj);
            const isEmpty: any = {
                order: '',
                exercise: '',
                series: 0,
                repetitions: '',
                tempo: 0,
                break: '',
                url: '',
            };
            setFormObject(isEmpty);
        }
    };

    return (
        <>
            <Form
                onValChange={onValChange}
                formObject={formObject}
                onFormSubmit={onFormSubmit}
            />
            <Table tableData={tableData}/>
        </>
    );
}