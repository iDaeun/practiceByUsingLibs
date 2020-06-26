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

  export class USER {
    public static ROUTE = {
      ROOT: 'user',
      SIGNIN: 'signin',
      CERTIFICATION: 'certification/:key',
      PROFILE: 'user-profile'
    };

    public static USER_PROFILE = '/' + TEMPLATE.ROUTE.ROOT + '/' + USER.ROUTE.PROFILE;
    public static USER_SIGNIN = '/' + USER.ROUTE.ROOT + '/' + USER.ROUTE.SIGNIN;
  }

  export class SYNC {
    public static ROUTE = {
      ROOT: 'sync',
      SYNC_DETAIL: 'detail/:syncId'
    };
  }

  export class SNAP {
    public static ROUTE = {
      ROOT: 'snap',
      SYNC_DETAIL: 'detail/:snapId'
    };
  }

}
