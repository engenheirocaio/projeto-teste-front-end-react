export class CardComponentModel {
  public ID: number;
  public Make: string;
  public Model: string;
  public Version: string;
  public Image: any;
  public KM: number;
  public Price: string;
  public YearModel: number;
  public YearFab: number;
  public Color: string;

  constructor(id: number,make: string,model: string,version: string,image: any,
    km: number,price: string,yearModel: number,yearFab: number,color: string) {
    this.ID = id;
    this.Make = make;
    this.Model = model;
    this.Version = version;
    this.Image = image;
    this.KM = km;
    this.Price = price;
    this.YearModel = yearModel;
    this.YearFab = yearFab;
    this.Color = color;
  }

}