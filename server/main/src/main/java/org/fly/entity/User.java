package org.fly.entity;


import com.mybatisflex.annotation.*;
import com.mybatisflex.core.mask.Masks;
import lombok.Data;

import java.util.Date;
import java.util.Collection;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.fly.enums.Gender;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Data
@Table("sys_user")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User implements Serializable, UserDetails {

    @Id(keyType = KeyType.Auto)
    private Integer uid;

    /**
     * 微信标识
     */
    private String wx;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 真实姓名
     */
    @Column("real_name")
    private String realName;

    /**
     * 手机号码
     */
    @ColumnMask(Masks.MOBILE)
    private String mobile;

    /**
     * 默认头像
     */
    private String avatar;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 性别 默认0 未知 1 男 2 女
     */
    private Gender gender;

    /**
     * 密码
     */
    @JsonIgnore
    private String password;

    /**
     * 是否启用 默认启用
     */
    private boolean enabled;

    @JsonIgnore
    @Column(isLogicDelete = true)
    private Integer del;

    /**
     * 创建时间
     */
    @Column("create_by")
    private Date create;
    /**
     * 更新时间
     */
    @Column("update_by")
    private Date update;

    @Column(ignore = true)
    private Collection<? extends GrantedAuthority> authorities;


    @Override
    @JsonIgnore
    public String getUsername() {
        return this.mobile;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }


}
