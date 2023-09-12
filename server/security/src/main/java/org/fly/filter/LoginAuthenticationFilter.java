package org.fly.filter;

import org.springframework.util.Assert;
import org.springframework.lang.Nullable;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;


/**
 * 由于SpringSecurity的登录只能是表单形式 并且用户名密码需要时username、password,AbstractAuthenticationProcessingFilter 获取登录请求的参数
 * 再去设置到UsernamePasswordAuthenticationToken中 来改变请求传参方式、参数名等 或者也可以在登录的时候加入其他参数等等
 *
 * 也可以在这里添加验证码、短信等的验证
 */
public class LoginAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private static final AntPathRequestMatcher DEFAULT_ANT_PATH_REQUEST_MATCHER = new AntPathRequestMatcher("/login", "POST");
    private String accountParameter = "account";
    private String passwordParameter = "password";
    private boolean postOnly = true;

    public LoginAuthenticationFilter() {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER);
    }

    public LoginAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER, authenticationManager);
    }

    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        if (this.postOnly && !request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        } else {
            String account = this.obtainAccount(request);
            account = account != null ? account.trim() : "";
            String password = this.obtainPassword(request);
            password = password != null ? password : "";
            UsernamePasswordAuthenticationToken authenticationToken = UsernamePasswordAuthenticationToken.unauthenticated(account, password);
            this.setDetails(request, authenticationToken);
            return this.getAuthenticationManager().authenticate(authenticationToken);
        }
    }

    @Nullable
    protected String obtainPassword(HttpServletRequest request) {
        return request.getParameter(this.passwordParameter);
    }

    @Nullable
    protected String obtainAccount(HttpServletRequest request) {
        return request.getParameter(this.accountParameter);
    }

    protected void setDetails(HttpServletRequest request, UsernamePasswordAuthenticationToken authRequest) {
        authRequest.setDetails(this.authenticationDetailsSource.buildDetails(request));
    }

    public void setAccountParameter(String accountParameter) {
        Assert.hasText(accountParameter, "account parameter must not be empty or null");
        this.accountParameter = accountParameter;
    }

    public void setPasswordParameter(String passwordParameter) {
        Assert.hasText(passwordParameter, "Password parameter must not be empty or null");
        this.passwordParameter = passwordParameter;
    }

    public void setPostOnly(boolean postOnly) {
        this.postOnly = postOnly;
    }

    public final String getAccountParameter() {
        return this.accountParameter;
    }

    public final String getPasswordParameter() {
        return this.passwordParameter;
    }
}
