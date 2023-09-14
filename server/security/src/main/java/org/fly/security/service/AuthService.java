package org.fly.security.service;

import com.mybatisflex.core.service.IService;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AuthService extends IService<User>,UserDetailsService {

}
