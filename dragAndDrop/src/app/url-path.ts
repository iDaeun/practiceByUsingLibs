// 폴더 및 Route 구조 정의 ( 기획서 내용 참조 )
// syncView, syncEdit, snapView, snapEdit
export namespace UrlPath {

  // 홈
  export class HOME {
    public static ROUTE = {
      ROOT: 'home',
      FOLDER: 'folder/:folderId', // 폴더 선택
      TEMPLATE: 'templateList' // 템플릿 목록 화면
    };

    public static ROOT = '/' + HOME.ROUTE.ROOT;
    public static FOLDER = '/' + HOME.ROUTE.ROOT + '/' + HOME.ROUTE.FOLDER;
    public static TEMPLATE = '/' + HOME.ROUTE.ROOT + '/' + HOME.ROUTE.TEMPLATE;
  }

  // 리포트 만들기 -> 싱크 리포트
  export class SYNC {
    public static ROUTE = {
      ROOT: 'sync',
      DETAIL: 'detail/:syncId', // 특정 sync report 열람
      EDIT: 'edit/:syncId' // sync report 편집
    };

    public static ROOT = '/' + HOME.ROUTE.ROOT + '/' + SYNC.ROUTE.ROOT;
    public static SYNC_DETAIL = '/' + HOME.ROUTE.ROOT + '/' + SYNC.ROUTE.DETAIL;
    public static SYNC_EDIT = '/' + HOME.ROUTE.ROOT + '/' + SYNC.ROUTE.EDIT;
  }

  // 리포트 만들기 -> 스냅 리포트
  export class SNAP {
    public static ROUTE = {
      ROOT: 'snap',
      DETAIL: 'detail/:snapId', // 특정 snap report 열람
      EDIT: 'edit/:snapId' // sync report 편집
    };

    public static ROOT = '/' + HOME.ROUTE.ROOT + '/' + SNAP.ROUTE.ROOT;
    public static SNAP_DETAIL = '/' + HOME.ROUTE.ROOT + '/' + SNAP.ROUTE.DETAIL;
    public static SNAP_EDIT = '/' + HOME.ROUTE.ROOT + '/' + SNAP.ROUTE.EDIT;
  }

  export class USER {
    public static ROUTE = {
      ROOT: 'user',
      SIGNIN: 'signin',
      CERTIFICATION: 'certification/:key',
      PROFILE: 'user-profile'
    };

    public static USER_PROFILE = '/' + HOME.ROUTE.ROOT + '/' + USER.ROUTE.PROFILE;
    public static USER_SIGNIN = '/' + USER.ROUTE.ROOT + '/' + USER.ROUTE.SIGNIN;
  }

}
