package org.fly.mapper;

import com.mybatisflex.core.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.fly.security.service.User;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}
