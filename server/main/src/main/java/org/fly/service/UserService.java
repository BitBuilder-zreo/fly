package org.fly.service;

import com.mybatisflex.core.service.IService;
import org.fly.security.service.User;

public interface UserService extends IService<User> {

    /**
     * 通过id 获取用户信息
     *
     * @param uid 用户id
     * @return 用户信息
     */
    public User getByUid(Integer uid);


}
