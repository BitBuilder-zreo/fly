package org.fly.handler;


import java.io.IOException;

import lombok.extern.slf4j.Slf4j;
import org.fly.common.response.Response;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;


@Slf4j
@Component
public class NoAuthAccessDeniedHandler implements AccessDeniedHandler {
    /**
     * 处理访问被拒绝的情况，并返回自定义的响应。
     *
     * @param request               HTTP请求对象。
     * @param response              HTTP响应对象。
     * @param accessDeniedException 访问被拒绝的异常。
     * @throws IOException      如果发生I/O异常。
     * @throws ServletException 如果发生Servlet异常。
     */
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

        // 记录访问被拒绝的日志信息
        log.info("认证未通过: {}", accessDeniedException.getMessage());

        // 设置HTTP响应状态码为500，表示访问被拒绝
        response.setStatus(500);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        // 返回自定义的响应，通常包括错误代码和错误消息
        response.getWriter().write(Response.fail(500, accessDeniedException.getMessage()).toJSON());
    }
}
