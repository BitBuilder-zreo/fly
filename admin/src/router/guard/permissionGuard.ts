import { Router } from "vue-router";
import { useUserStateHooks } from "/@/store/modules/user";
import { PageEnum } from "/@/enums/pageEnum";

const ROOT_PATH = PageEnum.BASE_HOME;

const whitePaths: PageEnum[] = [PageEnum.BASE_LOGIN];

export function createPermissionGuard(router: Router) {

    const userState = useUserStateHooks();

    router.beforeEach(async (to, from, next) => {


        if (from.path === ROOT_PATH && to.path === PageEnum.BASE_HOME && userState.user) {

            return next(PageEnum.BASE_HOME);
        }

        if (whitePaths.includes(to.path as PageEnum)) {

            console.log('123')

            if (to.path === PageEnum.BASE_LOGIN && userState.authorize) {

                // 等待更新用户信息
                return next((to.query?.redirect as string) || '/');
            }

            return next();
        }

        if (!userState.authorize) {
            const redirect: { path: string; replace: boolean; query?: Recordable<string> } = {
                path: PageEnum.BASE_LOGIN,
                replace: true,
            }
            if (to.path) {
                redirect.query = {
                    ...redirect.query,
                    redirect: to.path
                }
            }
            return next(redirect);
        }






    });

}