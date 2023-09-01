import { FooterModel } from "@/resources/navigations/navigations.model";

export class NavigationsService {
  public model = FooterModel;

  public async getFooter() {
    return this.model.find();
  }

  public async create(values: Record<string, any>) {
    try {
      return await this.model.create(values);
    } catch (e) {
      throw new Error("Unable to create new footer data");
    }
  }

  public async deleteData(id: string) {
    try {
      return await this.model.deleteMany({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }
}
