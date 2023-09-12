package org.fly.common.response;

import lombok.Getter;
import lombok.AllArgsConstructor;

/**
 * 错误码
 */
@Getter
@AllArgsConstructor
public enum Code {

    token_illegal(401, "非法请求"),

    login_success(200, "登录成功"),

    login_error(301, "用户名或密码错误"),
    user_Locked(302, "账户被锁定，请联系管理员!"),
    certificate_expiration(303, "证书过期，请联系管理员!"),
    account_expiration(304, "账户过期，请联系管理员!"),
    account_disabled(305, "账户被禁用，请联系管理员!");


    /**
     * 错误码
     */
    private final Integer code;
    /**
     * 错误信息
     */
    private final String msg;

}