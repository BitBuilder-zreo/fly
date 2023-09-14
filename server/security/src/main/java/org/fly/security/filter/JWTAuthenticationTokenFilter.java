package org.fly.security.filter;

import org.fly.common.response.Code;
import org.fly.common.response.Response;
import org.fly.security.token.JWT;
import java.io.IOException;
import org.fly.security.config.Matcher;
import lombok.extern.slf4j.Slf4j;
import jakarta.servlet.FilterChain;
import org.springframework.lang.NonNull;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class JWTAuthenticationTokenFilter extends OncePerRequestFilter {


    /**
     * 在每个HTTP请求中执行过滤操作，用于验证JWT令牌的有效性。
     *
     * @param request  HTTP请求对象。
     * @param response HTTP响应对象。
     * @param filterChain 过滤器链，用于继续处理请求。
     * @throws ServletException 如果发生Servlet异常。
     * @throws IOException      如果发生I/O异常。
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        // 获取请求的URI
        String requestURI = request.getRequestURI();

        // 检查请求URI是否包含在Matcher类定义的允许列表中
        if (Matcher.contains(requestURI)) {
            filterChain.doFilter(request, response);
        } else {
            // 从请求头中获取JWT令牌
            String token = request.getHeader("Authorization");
            log.info("接收到的token:{}", token);
            if (token != null) {
                try {
                    // 验证JWT令牌的有效性
                    JWT.tokenVerify(token);
                } catch (Exception e) {
                    // 处理非法令牌的情况，返回自定义响应
                    response.setStatus(200);
                    response.setCharacterEncoding("UTF-8");
                    response.setContentType("application/json");
                    response.getWriter().write(Response.fail(Code.token_illegal).toJSON());
                }
            }

            // 继续处理请求
            filterChain.doFilter(request, response);
        }
    }
}
