import './HomePage.scss';
import { TabComponent } from "../../components/tabComponent/TabComponent";
import { HeaderContainer } from "../../containers/headerContainer/HeaderContainer";
import { TabComponentModel } from "../../models/TabComponentModel";
import { FilterCarFormContainer } from "../../containers/filterCarFormContainer/FilterCarFormContainer";
import motorcycle from "../../assets/icons/motorcycle.png";
import sportCar from "../../assets/icons/sport-car.png";


function HomePage() {

  const tabModel = [new TabComponentModel('carros','comprar',sportCar,<FilterCarFormContainer idButtonTab="carro"></FilterCarFormContainer>), 
                    new TabComponentModel('motos','comprar',motorcycle,<FilterCarFormContainer idButtonTab="moto"></FilterCarFormContainer>)];
  
  return (
    <div className="homePage">
      <HeaderContainer></HeaderContainer>
      <TabComponent tabs={tabModel}></TabComponent>


    </div>
  );
}

export default HomePage;
