import {Injectable} from "@angular/core";
import {RemoteInterface} from "../interfaces/RemoteInterface";
import {Category} from "../models/Category";
import {Response} from "../models/Response";
import {Item} from "../models/Item";
/**
 * Created by Lee on 2017/4/11.
 */

@Injectable()
export class Remote implements RemoteInterface {

  getCategory(): Promise<Response<Category[]>> {
    return new Promise((resolve, reject) => {
      let r = new Response();

      let k: Category[] = new Array<Category>();
      for (let c = 65; c < 91; ++c) {
        let f: Category = new Category();
        f.id = String.fromCharCode(c);
        f.name = "Type " + String.fromCharCode(c);
        k.push(f);
      }

      r.data = k;

      resolve(r)

    })
  }

  getItemsByCategory(id: string, start: any, range: number): Promise<Response<Array<Item>>> {
    return new Promise((resolve, reject) => {

      let items: Item[] = new Array<Item>();

      for (let c = 65; c < 65 + range/*91*/; ++c) {
        let item = new Item();
        item.id = id + String.fromCharCode(c);
        item.categoryName = "Type " + id;
        item.categoryId = id;
        item.displayName = String.fromCharCode(c) + "#Type " + id;
        item.name = String.fromCharCode(c)+id;
        item.normalStockCount = 10;
        item.largeStockCount = 5;
        item.normalPrice = 1000;
        item.largePrice = 2000;
        item.recommandNormalPrice = 700;
        item.recommandLargePrice = 1500;
        items.push(item);
      }

      let r = new Response();

      r.data = items;

      resolve(r)

    })
  }


}
