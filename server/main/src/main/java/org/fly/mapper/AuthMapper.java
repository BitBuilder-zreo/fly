package org.fly.mapper;

import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.query.QueryWrapper;
import org.apache.ibatis.annotations.Mapper;
import org.fly.entity.User;

@Mapper
public interface AuthMapper extends BaseMapper<User> {

    default User getByUsername(String username) {

        QueryWrapper wrapper = QueryWrapper.create();

        wrapper.where("mobile=?", username);

        return selectOneByQuery(wrapper);
    }

}
