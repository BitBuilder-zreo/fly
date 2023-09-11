package org.fly.auth;

import java.util.function.Supplier;

import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;


/**
 * 自定义的 Spring Security 授权管理器，用于处理用户权限控制。
 */
@Component
public class UserAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {

    /**
     * 验证授权请求，检查用户是否有权访问特定资源。
     *
     * @param authentication 认证信息的供应商。
     * @param context        请求授权上下文。
     * @return 授权决策，表示是否允许访问。
     * @throws AccessDeniedException 如果访问被拒绝。
     */
    @Override
    public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext context)  {

        throw new AccessDeniedException("匿名不可访问");
    }
}
