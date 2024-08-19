export interface ResponseOk<T> {
    success: true;
    data: T;
  }
  
  export function responseOk<T>(data: T): ResponseOk<T> {
    return {
      success:true,
      data,
    };
  }
  