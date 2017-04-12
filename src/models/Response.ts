/**
 * Created by Lee on 2017/3/3.
 */

export class Response<T> {
  public static RESPONSE_OK: number = 0;
  public static RESPONSE_FAIL: number = 1;
  public static HTTP_OK: number = 200;

  public httpStatus: number;
  public status: number = Response.RESPONSE_OK;
  public callTimestamp: number = new Date().getTime();
  public timestamp: number = new Date().getTime();
  public metadata: any;
  public data: T;
  public rawData: any;
}
