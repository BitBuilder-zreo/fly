package org.fly.service.impl;

import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import org.fly.mapper.UserMapper;
import org.fly.security.service.User;
import org.fly.service.UserService;
import org.springframework.stereotype.Component;

@Component
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Override
    public User getByUid(Integer uid) {

        QueryWrapper wrapper = QueryWrapper.create();

        wrapper.where("uid=?", uid);

        return mapper.selectOneByQuery(wrapper);
    }
}
