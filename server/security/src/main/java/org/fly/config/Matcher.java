package org.fly.config;

import org.springframework.security.web.util.matcher.RegexRequestMatcher;

/**
 * 匹配器配置类，用于定义URL匹配规则。
 */
public class Matcher {

    /**
     * 包含被允许的URL，这些URL不需要进行权限验证。
     */
    public static String[] allowed = {
            "/login"
    };

    /**
     * 静态资源匹配器，用于匹配以 "css" 或 "js" 结尾的URL。
     */
    public static RegexRequestMatcher resource = RegexRequestMatcher.regexMatcher("^\\S*[css|js]$");

    /**
     * 检查给定的URL是否包含在允许的URL列表中。
     *
     * @param url 要检查的URL字符串。
     * @return 如果URL包含在允许的URL列表中，则返回true；否则返回false。
     */
    public static boolean contains(String url) {
        for (String arg : allowed) {
            if (url.contains(arg)) {
                return true;
            }
        }
        return false;
    }
}
