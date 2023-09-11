package org.fly.config;

import jakarta.annotation.Resource;
import org.fly.auth.UserAuthorizationManager;
import org.springframework.context.annotation.Bean;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@EnableWebSecurity
public class SecurityConfiguration {

    /**
     * 用户权限控制管理器，处理用户权限控制。
     */
    @Resource
    UserAuthorizationManager authorizationManager;

    /**
     * 配置安全过滤链，定义了Web应用程序的安全性规则。
     *
     * @param http HttpSecurity对象，用于配置安全性规则。
     * @return SecurityFilterChain，表示已配置的安全过滤链。
     * @throws Exception 如果配置出现异常，将抛出异常。
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // 禁用跨源资源共享（CORS）保护，允许跨域请求
        http.cors(CorsConfigurer::disable);

        // 禁用跨站请求伪造（CSRF）保护，允许无CSRF令牌的请求
        http.csrf(CsrfConfigurer::disable);

        // 使用 authorizeHttpRequests 方法配置 HTTP 请求的授权规则。
        // 这个方法允许你定义哪些请求需要进行权限验证以及如何授权它们。
        http.authorizeHttpRequests(authorize -> {

            // 允许所有与MatcherConfiguration.allowed中定义的URL匹配的请求，
            // 这些请求将被完全放行，不需要进行额外的权限验证。
            authorize.requestMatchers(MatcherConfiguration.allowed).permitAll();

            // 允许所有与MatcherConfiguration.resource中定义的URL匹配的请求，
            // 这些请求也将被完全放行，不需要进行额外的权限验证。
            authorize.requestMatchers(MatcherConfiguration.resource).permitAll();

            // 对于除上述匹配规则之外的所有请求，将使用UserAuthorizationManager进行访问控制。
            // UserAuthorizationManager将根据用户的权限和请求的资源来决定是否允许访问。
            // 如果UserAuthorizationManager返回允许访问的授权决策，请求将继续执行。
            // 如果UserAuthorizationManager返回拒绝访问的授权决策，请求将被拒绝，并可能引发AccessDeniedException异常。
            authorize.anyRequest().access(authorizationManager);
        });


        // 返回已配置的安全过滤链
        return http.build();
    }


}
