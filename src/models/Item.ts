/**
 * Created by Lee on 2017/4/12.
 */

export class Item {
  public id: string;
  public categoryName: string;
  public categoryId: string;
  public displayName: string;
  public name: string;
  public normalStockCount: number;
  public largeStockCount: number;
  public normalPrice: number;
  public largePrice: number;
  public recommandNormalPrice: number;
  public recommandLargePrice: number;


  constructor(item?: Item) {
    if (item !== void 0) {
      this.id = item['id'];
      this.categoryName = item['categoryName']
      this.categoryId = item['categoryId']
      this.displayName = item['displayName']
      this.name = item['name']
      this.normalStockCount = item['normalStockCount']
      this.largeStockCount = item['largeStockCount']
      this.normalPrice = item['normalPrice']
      this.largePrice = item['largePrice']
      this.recommandNormalPrice = item['recommandNormalPrice']
      this.recommandLargePrice = item['recommandLargePrice']
    }
  }

}
