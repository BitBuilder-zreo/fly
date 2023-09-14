package org.fly.security.config;

import jakarta.annotation.Resource;
import org.fly.security.handler.LoginFailureHandler;
import org.fly.security.handler.LoginSuccessHandler;
import org.fly.security.auth.MyAuthorizationManager;
import org.fly.security.filter.LoginAuthenticationFilter;
import org.fly.security.handler.NoAuthAccessDeniedHandler;
import org.springframework.context.annotation.Bean;
import org.fly.security.filter.JWTAuthenticationTokenFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    /**
     * 用户权限控制管理器，处理用户权限控制。
     */
    @Resource
    MyAuthorizationManager authorizationManager;

    /**
     * NoAuthAccessDeniedHandler是一个自定义的权限拒绝处理器，
     * 用于处理用户无权访问某个资源时的情况。
     * 该处理器的具体实现可能包括返回适当的HTTP响应或执行其他自定义的操作。
     */
    @Resource
    NoAuthAccessDeniedHandler accessDeniedHandler;

    /**
     * AuthenticationConfiguration通常是Spring Security中的一个配置类，
     * 它可能包含有关身份验证配置的信息，例如认证提供程序等。
     * 在这个代码中，configuration对象被用于获取AuthenticationManager，
     * 以便在自定义的LoginAuthenticationFilter中使用。
     */
    @Resource
    AuthenticationConfiguration configuration;

    /**
     * 密码解析器
     * @return 密码解析器
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        // 创建并返回一个密码编码器（PasswordEncoder）。
        // 在Spring Security中，密码编码器用于对用户密码进行加密和验证。
        // PasswordEncoderFactories.createDelegatingPasswordEncoder() 创建了一个默认的密码编码器，
        // 它支持多种密码编码算法，例如bcrypt、SHA-256等。
        // 这个方法的目的是为了配置Spring Security使用的密码编码器，
        // 以便在用户注册时加密密码，以及在用户登录时验证密码。

        return NoOpPasswordEncoder.getInstance();

//        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

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
            authorize.requestMatchers(Matcher.allowed).permitAll();

            // 允许所有与MatcherConfiguration.resource中定义的URL匹配的请求，
            // 这些请求也将被完全放行，不需要进行额外的权限验证。
            authorize.requestMatchers(Matcher.resource).permitAll();

            // 对于除上述匹配规则之外的所有请求，将使用UserAuthorizationManager进行访问控制。
            // UserAuthorizationManager将根据用户的权限和请求的资源来决定是否允许访问。
            // 如果UserAuthorizationManager返回允许访问的授权决策，请求将继续执行。
            // 如果UserAuthorizationManager返回拒绝访问的授权决策，请求将被拒绝，并可能引发AccessDeniedException异常。
            authorize.anyRequest().access(authorizationManager);
        });

        // 在UsernamePasswordAuthenticationFilter之前添加JWTAuthenticationTokenFilter过滤器
        http.addFilterBefore(new JWTAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        // 在UsernamePasswordAuthenticationFilter之前添加自定义的LoginAuthenticationFilter过滤器
        http.addFilterAt(loginAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        // 配置表单登录，包括成功和失败处理器
        http.formLogin(login -> {
            login.successHandler(new LoginSuccessHandler());
            login.failureHandler(new LoginFailureHandler());
        });

        // 配置异常处理，包括拒绝访问处理器
        http.exceptionHandling(e -> {
            e.accessDeniedHandler(accessDeniedHandler);
        });

        // 返回已配置的安全过滤链
        return http.build();
    }


    /**
     * 创建并配置自定义的LoginAuthenticationFilter过滤器
     */
    public LoginAuthenticationFilter loginAuthenticationFilter() throws Exception {

        LoginAuthenticationFilter filter = new LoginAuthenticationFilter();

        // 设置认证成功处理器
        filter.setAuthenticationSuccessHandler(new LoginSuccessHandler());

        // 设置认证失败处理器
        filter.setAuthenticationFailureHandler(new LoginFailureHandler());

        // LoginAuthenticationFilter 中需要使用到 AuthenticationManager 不加会出现空指针
        filter.setAuthenticationManager(configuration.getAuthenticationManager());

        return filter;
    }


}
