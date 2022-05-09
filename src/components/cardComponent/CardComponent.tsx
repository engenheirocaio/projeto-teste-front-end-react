import React from "react";
import { CardComponentModel } from "../../models/CardComponentModel";
import './CardComponent.scss'
import carro1 from "../../assets/imgs/carro1.webp"
import carro2 from "../../assets/imgs/carro2.jpg"
import carro3 from "../../assets/imgs/carro3.jpg"
import Swal from "sweetalert2";

function CardComponent(props: CardsProps) {

    function contactCliente(){
        Swal.fire({
            title: 'Perfeito!',
            text: 'Em breve o proprietario do automóvel irá entrar em contato para inciar a negociação',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ca2430'
        })
    }

    return (
        <>
            {props.cardValues 
            ?   <div className="card" onClick={contactCliente}>
                    <img src={carro2} alt="Avatar" />
                    <div className="container">
                        <h4><b>{props.cardValues.Make}</b></h4>
                        <p>{props.cardValues.Model + ' - ' + props.cardValues.YearModel}</p>
                        <p>{props.cardValues.Version}</p>
                    </div>
                </div>
            : <></>
            }
        </>
    );
}

type CardsProps = {
    cardValues: CardComponentModel;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export { CardComponent };