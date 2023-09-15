package org.fly.service;

import com.mybatisflex.core.service.IService;
import org.fly.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AuthService extends IService<User>,UserDetailsService {

}
