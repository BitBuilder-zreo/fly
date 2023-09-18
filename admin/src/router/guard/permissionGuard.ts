import { Router } from "vue-router";
import { PageEnum } from "/@/enums";

const whitePageList: PageEnum[] = [PageEnum.login];


export function createPermissionGuard(router: Router) {

  router.beforeEach(async (to, from, next) => {

    if (whitePageList.includes(to.path as PageEnum)) {

      return next();
    }

    const redirect: { path: string; replace: boolean; query?: Recordable<string> } = {
      path: PageEnum.login,
      replace: true
    }

    if (to.path) {
      redirect.query = {
        ...redirect.query,
        redirect: to.path
      }
    }
    next(redirect);
  });
}