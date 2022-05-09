export class TabComponentModel {
    public buttonValue: string;
    public buttonActionValue: string;
    public buttonIcon: any;
    public tabContent: any;
  
    constructor(buttonValue: string, buttonActionValue: string, buttonIcon?: any, tabContent?: any) {
      this.buttonValue = buttonValue;
      this.buttonActionValue = buttonActionValue;
      this.buttonIcon = buttonIcon;
      this.tabContent = tabContent;
    }

  }

  