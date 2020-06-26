// 폴더 및 Route 구조 정의 ( 기획서 내용 참조 )
// syncView, syncEdit, snapView, snapEdit
export namespace UrlPath {

  export class TEMPLATE {
    public static ROUTE = {
      ROOT: 'template'
    };
  }

  export class HOME {
    public static ROUTE = {
      ROOT: 'home'
    };

    public static ROOT = '/' + TEMPLATE.ROUTE.ROOT + '/' + HOME.ROUTE.ROOT;
  }

}
