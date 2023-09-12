package org.fly.common.response;

import lombok.Data;

import java.io.Serializable;

import lombok.NoArgsConstructor;
import com.alibaba.fastjson2.JSON;
import com.fasterxml.jackson.annotation.JsonInclude;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class Response<T> implements Serializable {

    /**
     * code 200 成功 其余是失败
     */
    private Integer code;
    /**
     * msg 信息包含成功和失败的信息
     */
    private String msg;
    /**
     * data 数据
     */
    private T data;

    /**
     * 只有包含数据的成功
     *
     * @param data 数据
     * @param <T>  泛型
     * @return Response
     */
    public static <T> Response<T> success(T data) {
        Response<T> response = new Response<>();
        response.setCode(200);
        response.setData(data);
        return response;
    }

    /**
     * 只有包含数据的带有成功信息
     *
     * @param data 数据
     * @param code 成功信息
     * @param <T>  泛型
     * @return Response
     */
    public static <T> Response<T> success(T data, Code code) {
        Response<T> response = new Response<>();
        response.setCode(code.getCode());
        response.setMsg(code.getMsg());
        response.setData(data);
        return response;
    }

    /**
     * 只有包含code码和msg信息的成功
     *
     * @param code 成功信息
     * @param <T>  泛型
     * @return Response
     */
    public static <T> Response<T> success(Code code) {
        Response<T> response = new Response<>();
        response.setCode(code.getCode());
        response.setMsg(code.getMsg());
        return response;
    }

    /**
     * 只有包含code码和msg信息的失败
     *
     * @param code 失败信息 除200外
     * @param <T>  泛型 无
     * @return Response 失败信息
     */
    public static <T> Response<T> fail(Code code) {
        Response<T> response = new Response<>();
        response.setCode(code.getCode());
        response.setMsg(code.getMsg());
        return response;
    }

    /**
     * 只有包含code码和msg信息的失败
     *
     * @param code 失败信息 除200外
     * @param <T>  泛型 无
     * @return Response 失败信息
     */
    public static <T> Response<T> fail(Integer code, String msg) {
        Response<T> response = new Response<>();
        response.setCode(code);
        response.setMsg(msg);
        return response;
    }

    /**
     * 响应转json 字符串
     *
     * @return json 字符串
     */
    public String toJSON() {
        return JSON.toJSONString(this);
    }
}
