import type { User, Token } from '/#/store';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { loginApi } from '/@/api/sys/user';
import { LoginParams } from '/@/api/sys/model/userModel';
import { ErrorMessageMode } from '/#/axios';





interface UserState {
  userInfo: Nullable<User>;
  token: Nullable<Token>;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: null,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(state): User {
      return state.userInfo || getAuthCache<User>(USER_INFO_KEY) || {};
    },
    getToken(state): Token {
      return state.token || getAuthCache<Token>(TOKEN_KEY);
    },
    getRoleList(state): RoleEnum[] {
      return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(state): boolean {
      return !!state.sessionTimeout;
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime;
    },
  },
  actions: {
    setToken(token: Token | null) {
      this.token = token;
      setAuthCache(TOKEN_KEY, token);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: User | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = null;
      this.roleList = [];
      this.sessionTimeout = false;
    },

    async login(params: LoginParams & { goHome?: boolean; mode?: ErrorMessageMode; }): Promise<User | null> {

      try {
        const data = await loginApi(params);

        this.setToken(data);

        const { goHome } = params;

        return this.afterLoginAction(goHome);

      } catch (error) {

        return Promise.reject(error)
      }

    },
    async afterLoginAction(goHome?: boolean): Promise<User | null> {

      return null;
    }

    /**
     * @description: login
     */
    // async login(
    //   params: LoginParams & {
    //     goHome?: boolean;
    //     mode?: ErrorMessageMode;
    //   },
    // ): Promise<GetUserInfoModel | null> {
    //   try {
    //     const { goHome = true, mode, ...loginParams } = params;
    //     const data = await loginApi(loginParams, mode);
    //     const { token } = data;

    //     // save token
    //     this.setToken(token);
    //     return this.afterLoginAction(goHome);
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // },
    // async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
    //   if (!this.getToken) return null;
    //   // get user info
    //   const userInfo = await this.getUserInfoAction();

    //   const sessionTimeout = this.sessionTimeout;
    //   if (sessionTimeout) {
    //     this.setSessionTimeout(false);
    //   } else {
    //     const permissionStore = usePermissionStore();
    //     if (!permissionStore.isDynamicAddedRoute) {
    //       const routes = await permissionStore.buildRoutesAction();
    //       routes.forEach((route) => {
    //         router.addRoute(route as unknown as RouteRecordRaw);
    //       });
    //       router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
    //       permissionStore.setDynamicAddedRoute(true);
    //     }
    //     goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
    //   }
    //   return userInfo;
    // },
    // async getUserInfoAction(): Promise<User | null> {
    //   if (!this.getToken) return null;
    //   const userInfo = await getUserInfo();
    //   const { roles = [] } = userInfo;
    //   if (isArray(roles)) {
    //     const roleList = roles.map((item) => item.value) as RoleEnum[];
    //     this.setRoleList(roleList);
    //   } else {
    //     userInfo.roles = [];
    //     this.setRoleList([]);
    //   }
    //   this.setUserInfo(userInfo);
    //   return userInfo;
    // },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {

    },

    /**
     * @description: Confirm before logging out
     */
    // confirmLoginOut() {
    //   const { createConfirm } = useMessage();
    //   const { t } = useI18n();
    //   createConfirm({
    //     iconType: 'warning',
    //     title: () => h('span', t('sys.app.logoutTip')),
    //     content: () => h('span', t('sys.app.logoutMessage')),
    //     onOk: async () => {
    //       await this.logout(true);
    //     },
    //   });
    // },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
