import React from "react";
import { SelectComponentModel } from "../../models/SelectComponentModel";
import './SelectComponent.scss'

function SelectComponent({classNameValue, labelValue, selectValues, label, ...restProps}: SelectProps) {

    return (
        <div className={'select-wrap ' + classNameValue}>
            <label {...label}>{labelValue}</label>
            <select name={classNameValue} key={classNameValue} {...restProps}>
            <option value="" selected={true} disabled={true}>Selecione</option>
                {selectValues.map((x,index) => <option key={index} value={x.ID}>{x.Name}</option>)}
            </select>
        </div>
    );
}

type SelectProps = {
    label?: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
    classNameValue: string;
    labelValue: string;
    selectValues: SelectComponentModel[];
}&React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

export { SelectComponent };