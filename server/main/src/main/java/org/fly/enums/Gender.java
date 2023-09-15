package org.fly.enums;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import com.mybatisflex.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;



@Getter
@RequiredArgsConstructor
public enum Gender{

    /**
     * 保密
     */
    Unknown(0, "保密"),
    /**
     * 男
     */
    Man(1, "男"),
    /**
     * 女
     */
    Woman(2, "女");

    /**
     * 性别
     */
    @EnumValue
    @JsonValue
    private final Integer value;

    // 描述
    private final String description;

}



