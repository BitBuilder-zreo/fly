package org.fly.security.handler;


import java.util.Map;
import java.util.HashMap;
import java.io.IOException;

import org.fly.security.token.JWT;
import org.fly.common.date.DateUtils;
import jakarta.servlet.ServletException;
import org.fly.common.response.Response;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;


/**
 * 处理用户成功登录的认证成功处理器。
 */
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    /**
     * 在用户成功登录后调用，生成JWT令牌并返回给客户端。
     *
     * @param request        HTTP请求对象。
     * @param response       HTTP响应对象。
     * @param authentication 认证对象，包含成功认证的用户信息。
     * @throws IOException      如果发生I/O异常。
     * @throws ServletException 如果发生Servlet异常。
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // 生成JWT令牌
        String token = JWT.token(authentication);

        // 将JWT令牌添加到响应头
        response.addHeader("token", token);

        // 设置响应内容类型和字符编码
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 创建包含令牌和其他信息的数据映射
        Map<String, String> data = new HashMap<>();
        data.put("token", token);
        data.put("refreshToken", token);

        // 假设在30天后令牌过期，生成并添加到数据映射中
        data.put("expires", DateUtils.timestamp(DateUtils.addDay(30)).toString());

        // 将数据映射转换为JSON格式并写入响应
        response.getWriter().write(Response.success(data).toJSON());
    }
}