// 폴더 및 Route 구조 정의 ( 기획서 내용 참조 )
// syncView, syncEdit, snapView, snapEdit
// template - 보류
// Q. resolve 사용 여부
export namespace UrlPath {

  // 홈
  export class HOME {
    public static ROUTE = {
      ROOT: 'home',
      FOLDER: 'folder/:folderId' // 폴더 선택
    };

    public static ROOT = '/' + HOME.ROUTE.ROOT;
    public static FOLDER = '/' + HOME.ROUTE.ROOT + '/' + HOME.ROUTE.FOLDER;
  }

  // 리포트 만들기 -> 싱크 리포트 / 스냅 리포트
  export class REPORT {
    public static ROUTE = {
      ROOT: 'report',
      DETAIL: 'detail/:reportId', // report 열람
      EDIT: 'edit/:reportId' // report 편집
    };

    public static ROOT = '/' + HOME.ROUTE.ROOT + '/' + REPORT.ROUTE.ROOT;
    public static REPORT_DETAIL = '/' + HOME.ROUTE.ROOT + '/' + REPORT.ROUTE.DETAIL;
    public static REPORT_EDIT = '/' + HOME.ROUTE.ROOT + '/' + REPORT.ROUTE.EDIT;
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
