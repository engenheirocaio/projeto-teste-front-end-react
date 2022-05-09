import React, { useEffect, useState } from "react";
import { useWebMotorsApi } from "../../commons/service/WebMotorsApi";
import { SelectComponent } from "../../components/selectComponent/SelectComponent";
import { SelectComponentModel } from "../../models/SelectComponentModel";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import './FilterCarFormContainer.scss'
import { CardComponent } from '../../components/cardComponent/CardComponent';
import { CardComponentModel } from '../../models/CardComponentModel';

function FilterCarFormContainer(props: React.PropsWithChildren<SelectProps>) {

    const now = new Date().getUTCFullYear();
    const years = Array(now - (now - 20)).fill('').map((v, idx) => now - idx);
    const { register, handleSubmit, setValue } = useForm();
    const { getMake, getModel, getVersion, getVehicles } = useWebMotorsApi();
    const initSelect = [] as SelectComponentModel[];
    const initCard = [] as CardComponentModel[];
    const [selectMake, setSelectMake] = useState<SelectComponentModel[]>(initSelect);
    const [selectModel, setSelectModel] = useState<SelectComponentModel[]>(initSelect);
    const [selectVersion, setSelectVersion] = useState<SelectComponentModel[]>(initSelect);
    const [selectYear, setSelectYear] = useState<SelectComponentModel[]>(initSelect);
    const [selectPrice, setSelectPrice] = useState<SelectComponentModel[]>(initSelect);
    const [selectState, setSelectState] = useState<SelectComponentModel[]>(initSelect);
    const [selectKm, setSelectKm] = useState<SelectComponentModel[]>(initSelect);
    const [selectModelActive, setSelectModelActive] = useState(true);
    const [selectVersionActive, setSelectVersionActive] = useState(true);
    const [cards, setCards] = useState<CardComponentModel[]>(initCard);


    useEffect(() => {

        getMake().then((data) => {
            setSelectMake(data);
        }
        ).catch((errors) => {
            console.error(errors.message)
        });

        setSelectYear(fillSelectYear());
        setSelectPrice(fillSelectPrice());
        setSelectState(fillSelectState());
        setSelectKm(fillSelectKm());

    }, [])

    function onChangeMake(event: any) {
        setValue(event.target.name, event.target.selectedOptions[0].text);
        setCards(initCard);
        getModel(event.target.value).then((data) => {
            setSelectModel(data);
            setSelectModelActive(false);
        }
        ).catch((errors) => {
            console.error(errors.message)
        })
    }

    function onChangeModel(event: any) {
        setValue(event.target.name, event.target.selectedOptions[0].text);
        setCards(initCard);
        getVersion(event.target.value).then((data) => {
            setSelectVersion(data);
            setSelectVersionActive(false);
        }
        ).catch((errors) => {
            console.error(errors.message)
        })
    }

    function fillSelectYear(): SelectComponentModel[] {
        let arrayYear = [] as SelectComponentModel[];

        years.map((year) => {
            return arrayYear.push(new SelectComponentModel(year, year.toString()));
        });

        return arrayYear;
    }

    function fillSelectPrice(): SelectComponentModel[] {
        let arrayPrice = [] as SelectComponentModel[];

        for (var i = 10000; i <= 200000; i += 10000) {
            arrayPrice.push(new SelectComponentModel(i, i.toString()));
        };

        return arrayPrice;
    }

    function fillSelectState(): SelectComponentModel[] {
        let arrayState = [] as SelectComponentModel[];

        arrayState.push(new SelectComponentModel(0, 'Goiás'));
        arrayState.push(new SelectComponentModel(1, 'Pernambuco'));
        arrayState.push(new SelectComponentModel(2, 'Rio de Janeiro'));
        arrayState.push(new SelectComponentModel(3, 'Santa Catarina'));
        arrayState.push(new SelectComponentModel(4, 'São Paulo'));

        return arrayState;
    }

    function fillSelectKm(): SelectComponentModel[] {
        let arrayKm = [] as SelectComponentModel[];

        arrayKm.push(new SelectComponentModel(0, '10km'));
        arrayKm.push(new SelectComponentModel(1, '50km'));
        arrayKm.push(new SelectComponentModel(2, '100km'));
        arrayKm.push(new SelectComponentModel(3, '500km'));
        arrayKm.push(new SelectComponentModel(4, '1000km'));

        return arrayKm;
    }

    function setValueRegister(event: any) {
        setValue(event.target.name, event.target.selectedOptions[0].text)
    }

    function onSubmit(data: any) {
        let cardsArray = [] as CardComponentModel[];

        if (!data.kmSelect || !data.makeSelect || !data.modelSelect || !data.priceSelect ||
            !data.stateSelect || !data.versionSelect || !data.yearSelect) {
            Swal.fire({
                title: 'Opa ;)',
                text: 'Preencha todos os filtros para fazer a consulta',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ca2430'
            })
            return
        }

        getVehicles(1).then((response) => {
            cardsArray = cardsArray.concat(response)
            getVehicles(2).then((response) => {
                cardsArray = cardsArray.concat(response)
                getVehicles(3).then((response) => {
                    cardsArray = cardsArray.concat(response)
                    cardsArray = cardsArray.filter(x => x.Make === data.makeSelect)
                    setCards(cardsArray)
                  })
                  .catch((errors) => {
                    console.error(errors.message);
                  });
              })
              .catch((errors) => {
                console.error(errors.message);
              });
          })
          .catch((errors) => {
            console.error(errors.message);
          });
    }


    return (

        <div className="filterCarForm">
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="checkBoxArea">
                    <div className="checkbox">
                        <input {...register("checkboxNew")} type="checkbox" id="checkboxNew" />
                        <label htmlFor="checkboxNew">Novos</label>
                    </div>
                    <div className="checkbox">
                        <input {...register("checkboxUsed")} type="checkbox" id="checkboxUsed" />
                        <label htmlFor="checkboxUsed">Usados</label>
                    </div>
                </div>
                <div className="areaOne">
                    <div className="selectsOne">
                        <SelectComponent labelValue="Onde:" classNameValue="stateSelect" selectValues={selectState} onChange={setValueRegister}></SelectComponent>
                        <SelectComponent labelValue="Raio:" classNameValue="kmSelect" selectValues={selectKm} onChange={setValueRegister}></SelectComponent>
                    </div>
                    <div className="selectsOne make model">
                        <SelectComponent labelValue="Marca:" classNameValue="makeSelect" selectValues={selectMake} onChange={onChangeMake}></SelectComponent>
                        <SelectComponent labelValue="Modelo:" classNameValue="modelSelect" selectValues={selectModel} onChange={onChangeModel} disabled={selectModelActive}></SelectComponent>
                    </div>
                </div>
                <div className="areaTwo">
                    <div className="selectsTwo year price">
                        <SelectComponent labelValue="Ano:" classNameValue="yearSelect" selectValues={selectYear} onChange={setValueRegister}></SelectComponent>
                        <SelectComponent labelValue="Preço:" classNameValue="priceSelect" selectValues={selectPrice} onChange={setValueRegister}></SelectComponent>
                    </div>
                    <div className="selectsTwo version">
                        <SelectComponent labelValue="Versão:" classNameValue="versionSelect" selectValues={selectVersion} onChange={setValueRegister} disabled={selectVersionActive}></SelectComponent>
                    </div>
                </div>
                <div className="buttonsArea">
                    <div className="buttonsAreaOne">3.1</div>
                    <div className="buttonsAreaTwo">
                        <a href="/" className="clearFilter">Limpar filtros</a>
                        <button className="confirmSearch" type="submit">Ver Ofertas</button>
                    </div>
                </div>
            </form>
            {cards.length > 0 &&
                <div className="containerCardsCars">
                    {cards.map((x) => (<CardComponent cardValues={x}></CardComponent>))}
                </div>
            }
        </div>

    );

}

type SelectProps = {
    idButtonTab: string;
}

export { FilterCarFormContainer };