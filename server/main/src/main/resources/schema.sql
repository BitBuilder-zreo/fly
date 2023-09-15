
-- 创建系统用户表
create table if not exists sys_user(
    uid bigint primary key unique auto_increment not null comment '用户id',
    wx  varchar(128) unique comment '微信id',
    nickname varchar(16) comment '用户昵称',
    real_name varchar(16) comment '真实姓名',
    password varchar(128) default 'e10adc3949ba59abbe56e057f20f883e' not null comment '密码123456',
    mobile varchar(11) unique not null comment '手机号码',
    email varchar(32) unique comment '邮箱',
    avatar varchar(256) comment '头像',
    birthday datetime        comment '生日',
    gender int(1)  default 0 not null comment '性别 默认0 未知 1 男 2 女',
    enabled tinyint  default 1 not null comment '启用 1启用 0 不启用',
    del int(1) default 0 not null comment '逻辑删除 0未删除 1删除',
    create_by datetime default current_timestamp comment '创建时间',
    update_by datetime default current_timestamp on update current_timestamp comment '更新时间'

)engine = InnoDB auto_increment=10000 default charset = utf8 comment '系统用户表';



-- 插入admin 用户
insert ignore into sys_user(nickname,mobile) values ('admin','admin');

