import React, { useState } from "react";
import { TabComponentModel } from "../../models/TabComponentModel";
import './TabComponent.scss'

function TabComponent(props: React.PropsWithChildren<TabProps>) {

    const [activeTabIndex, setActiveTabIndex] = useState(0);



    return (
        <div className="tabComponent">
            <div className="tabButtons">
                {props.tabs.map((x, index) => {
                    let isClassActive = "tablink"
                    if(index === activeTabIndex){
                        isClassActive = "tablink active"
                    }
                    return <button key={index} className={isClassActive} onClick={() => {
                        setActiveTabIndex(index) }}>
                        <img src={x.buttonIcon} alt="icon button tab"></img>
                        <div>
                            <span>{x.buttonActionValue}</span>
                            <br />
                            {x.buttonValue}
                        </div>
                    </button>
                })}
            </div>
            {props.tabs
                .map((x, index) => (
                    <div className="tabcontent" key={index}>
                        {x.tabContent}
                    </div>
                ))
                .filter((y, index) => index === activeTabIndex)}
        </div>
    );

}

type TabProps = {
    tabs: TabComponentModel[];
}

export { TabComponent };