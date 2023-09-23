// 导入 Pinia 的 defineStore 函数，用于创建状态管理仓库
import { defineStore } from "pinia";

// 导入自定义的 webStore、AUTHORIZE_KEY 和 USER_INFO_KEY，用于数据持久化
import { webStore, AUTHORIZE_KEY, USER_INFO_KEY } from "../storage";
import { store } from "..";

// 定义一个接口 Authorize，用于表示授权信息
interface Authorize {
    token: string;       // 访问令牌
    refreshToken: string; // 刷新令牌
    expires: number;     // 令牌过期时间
}

// 定义一个接口 User，用于表示用户信息
interface User {
    nickname?: string;   // 昵称
    realName?: string;   // 真实姓名
    mobile: string;      // 手机号
    avatar?: string;     // 头像
    email?: string;      // 邮箱
    create: string;      // 创建时间
}

// 定义用户状态的接口 UserState
interface UserState {
    user: Nullable<User>;        // 用户信息
    authorize: Nullable<Authorize>; // 授权信息
}

// 使用 defineStore 创建名为 useUserStore 的状态管理仓库
export const useUserStore = defineStore({
    id: "Fly user", // 仓库的唯一标识符
    state: (): UserState => ({
        user: null,           // 初始化用户信息为空
        authorize: null       // 初始化授权信息为空
    }),
    getters: {
        getUser(state): Nullable<User> {
            // 获取用户信息，如果仓库中没有，则从 webStore 中获取
            return state.user || webStore.data<User>(USER_INFO_KEY);
        },
        getAuthorize(state): Nullable<Authorize> {
            // 获取授权信息，如果仓库中没有，则从 webStore 中获取
            return state.authorize || webStore.data<Authorize>(AUTHORIZE_KEY);
        }
    },
    actions: {
        setAuthorize(auth: Authorize | null) {
            // 设置授权信息并将其持久化到 webStore
            this.authorize = auth;
            webStore.setData(auth, AUTHORIZE_KEY);
        },
        setUser(user: User | null) {
            // 设置用户信息并将其持久化到 webStore
            this.user = user;
            webStore.setData(user, USER_INFO_KEY);
        }
    }
});

// 导入 useUserStore 函数，用于创建或获取用户状态管理仓库
export function useUserStateHooks() {
    // 调用 useUserStore 函数，传入 store 参数，以获取用户状态管理仓库的实例
    return useUserStore(store);
}
