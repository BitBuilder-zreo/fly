package org.fly.security.token;

import com.alibaba.fastjson2.JSON;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.fly.security.auth.JWTAuthentication;
import org.fly.security.service.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.Date;

public class JWT {
    private static final String secret = "org.fly.security";


    public static void tokenVerify(String token) {

        JWTVerifier jwt = com.auth0.jwt.JWT.require(Algorithm.HMAC256(secret)).build();

        jwt.verify(token);

        DecodedJWT decode = com.auth0.jwt.JWT.decode(token);

        decode.getExpiresAt();

        String json = decode.getAudience().get(0);

        JWTAuthentication authentication = JSON.parseObject(json, JWTAuthentication.class);

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    public static String token(Authentication authentication) {

        return com.auth0.jwt.JWT.create()
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30))  //设置过期时间:单位毫秒
                .withAudience(JSON.toJSONString(authentication)) //设置接受方信息，一般时登录用户
                .sign(Algorithm.HMAC256(secret));
    }

    public static User getUser() throws UserPrincipalNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof User) {
            return (User) authentication.getPrincipal();
        }

        throw new UserPrincipalNotFoundException("用户信息错误");
    }


}
