package org.fly.security.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.mybatisflex.annotation.Column;
import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

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
    private String mobile;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 性别 默认0 未知 1 男 2 女
     */
    private Integer gender;

    /**
     * 密码
     */
    @JsonIgnore
    private String password;

    /**
     * 是否启用 默认启用
     */
    private boolean enabled;

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
