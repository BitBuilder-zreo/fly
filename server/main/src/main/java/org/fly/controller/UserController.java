package org.fly.controller;

import jakarta.annotation.Resource;
import org.fly.common.response.Response;
import org.fly.security.service.User;
import org.fly.security.token.JWT;
import org.fly.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    @Resource
    UserService service;

    @PostMapping("info")
    public Response<User> info() throws Exception {
        User user = JWT.getUser();
        return Response.success(service.getByUid(user.getUid()));
    }

}
