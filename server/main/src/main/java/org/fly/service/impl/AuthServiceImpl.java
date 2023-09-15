package org.fly.service.impl;

import org.fly.entity.User;
import org.fly.mapper.AuthMapper;
import org.fly.service.AuthService;
import org.springframework.stereotype.Component;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Component
public class AuthServiceImpl extends ServiceImpl<AuthMapper, User> implements AuthService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = mapper.getByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("用户或者密码错误!");
        }

        return user;
    }
}
