import {Item} from "./Item";
/**
 * Created by Lee on 2017/4/12.
 */

export class BuyItem extends Item {


  constructor(item?: Item) {
    super();
    if (item !== void 0) {
      this.id = item.id;
      this.categoryName = item.categoryName;
      this.categoryId = item.categoryId;
      this.displayName = item.displayName;
      this.name = item.name;
      this.normalStockCount = item.normalStockCount;
      this.largeStockCount = item.largeStockCount;
      this.normalPrice = item.normalPrice;
      this.largePrice = item.largePrice;
      this.recommandNormalPrice = item.recommandNormalPrice;
      this.recommandLargePrice = item.recommandLargePrice;
    }
  }

  private _buyNormalCount: number = 0;
  private _buyLargeCount: number = 0;

  public init(item: object) {
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
    this._buyNormalCount = item['_buyNormalCount']
    this._buyLargeCount = item['_buyLargeCount']
  }

  public update(item: Item) {
    this.id = item.id;
    this.categoryName = item.categoryName;
    this.categoryId = item.categoryId;
    this.displayName = item.displayName;
    this.name = item.name;
    this.normalStockCount = item.normalStockCount;
    this.largeStockCount = item.largeStockCount;
    this.normalPrice = item.normalPrice;
    this.largePrice = item.largePrice;
    this.recommandNormalPrice = item.recommandNormalPrice;
    this.recommandLargePrice = item.recommandLargePrice;
  }

  public addBuyNormalCount(): number {
    return ++this._buyNormalCount;
  }

  public minusBuyNormalCount(): number {
    --this._buyNormalCount;
    if (this._buyNormalCount < 0)
      this._buyNormalCount = 0
    return this._buyNormalCount
  }

  public setBuyNormalCount(num: number): number {
    if (typeof num != 'number') {
      return this._buyNormalCount;
    } else if (num < 0) {
      this._buyNormalCount = 0;
      return this._buyNormalCount;
    } else {
      this._buyNormalCount = num;
      return this._buyNormalCount;
    }
  }

  public getBuyNormalCount(): number {

    return this._buyNormalCount;
  }

  public addBuyLargeCount(): number {
    return ++this._buyLargeCount;
  }

  public minusBuyLargeCount(): number {
    --this._buyLargeCount;
    if (this._buyLargeCount < 0)
      this._buyLargeCount = 0
    return this._buyLargeCount
  }

  public setBuyLargeCount(num: number): number {
    if (typeof num != 'number') {
      return this._buyLargeCount;
    } else if (num < 0) {
      this._buyLargeCount = 0;
      return this._buyLargeCount;
    } else {
      this._buyLargeCount = num;
      return this._buyLargeCount;
    }
  }

  public getBuyLargeCount(): number {

    return this._buyLargeCount;
  }

}
