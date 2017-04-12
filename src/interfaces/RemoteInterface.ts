import {Category} from "../models/Category";
import {Response} from "../models/Response";
import {Item} from "../models/Item";
/**
 * Created by Lee on 2017/4/11.
 */

export interface RemoteInterface {
  getCategory(): Promise<Response<Array<Category>>>;
  getItemsByCategory(id: string, start: any, range: number): Promise<Response<Array<Item>>>;
}
