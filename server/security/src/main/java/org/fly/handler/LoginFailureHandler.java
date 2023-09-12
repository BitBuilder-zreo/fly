package org.fly.handler;

import java.io.IOException;

import org.fly.common.response.Code;
import org.fly.common.response.Response;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;


public class LoginFailureHandler implements AuthenticationFailureHandler {

    /**
     * 处理身份验证失败的回调方法。
     *
     * @param request   HTTP请求对象，包含关于失败身份验证的信息。
     * @param response  HTTP响应对象，用于向客户端发送响应。
     * @param exception 身份验证异常，描述了失败的原因。
     * @throws IOException 如果在处理失败时发生I/O错误，将抛出IOException。
     */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {

        // 设置HTTP响应状态码为200，表示成功响应
        response.setStatus(200);
        // 设置响应内容类型为JSON格式，并指定字符编码为UTF-8
        response.setContentType("application/json;charset=UTF-8");

        // 根据不同的身份验证异常类型返回不同的JSON响应
        if (exception instanceof UsernameNotFoundException || exception instanceof BadCredentialsException) {
            // 如果是用户名不存在或凭证无效异常，返回相应的错误消息
            response.getWriter().write(Response.fail(500, exception.getMessage()).toJSON());
        } else if (exception instanceof LockedException) {
            // 如果是账户被锁定异常，返回相应的错误消息
            response.getWriter().write(Response.fail(Code.user_Locked).toJSON());
        } else if (exception instanceof CredentialsExpiredException) {
            // 如果是凭证过期异常，返回相应的错误消息
            response.getWriter().write(Response.fail(Code.certificate_expiration).toJSON());
        } else if (exception instanceof AccountExpiredException) {
            // 如果是账户过期异常，返回相应的错误消息
            response.getWriter().write(Response.fail(Code.account_expiration).toJSON());
        } else if (exception instanceof DisabledException) {
            // 如果是账户被禁用异常，返回相应的错误消息
            response.getWriter().write(Response.fail(Code.account_disabled).toJSON());
        } else {
            // 对于其他未处理的异常，返回通用的登录失败错误消息
            response.getWriter().write(Response.fail(Code.login_error).toJSON());
        }
    }
}
