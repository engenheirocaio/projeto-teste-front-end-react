import React from "react";
import './HeaderContainer.scss'
import logoHeader from './../../assets/imgs/webmotors.svg'

function HeaderContainer() {
    return (
        <div className="header">
            <a href="/" className="logo">
                <img src={logoHeader} alt="header logo webmotors" />
            </a>
        </div>
    );
}


export { HeaderContainer };