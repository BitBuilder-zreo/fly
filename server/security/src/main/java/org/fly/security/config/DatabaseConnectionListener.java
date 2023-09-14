package org.fly.security.config;

import javax.sql.DataSource;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.context.ApplicationListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

@Slf4j
@Component
public class DatabaseConnectionListener implements ApplicationListener<ContextRefreshedEvent> {

    @Value("classpath:security/user.sql")
    private Resource script;

    @jakarta.annotation.Resource
    DataSource dataSource;

    /**
     * 当应用程序上下文被刷新时触发的方法。
     * 在应用程序启动时或上下文被刷新时，Spring容器会发送ContextRefreshedEvent事件，
     * 该方法会在接收到该事件时被调用。
     *
     * @param event 应用程序上下文刷新事件
     */
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (dataSource != null) {

            log.info("初始化security sql 数据...");

            // 创建一个ResourceDatabasePopulator对象，用于执行SQL脚本
            ResourceDatabasePopulator populate = new ResourceDatabasePopulator();

            // 将指定的SQL脚本添加到ResourceDatabasePopulator中
            populate.addScript(script);

            // 使用指定的DataSource执行SQL脚本
            populate.execute(dataSource);

            log.info("完成");
        } else {
            log.warn("DataSource 为 null，无法执行数据库初始化操作。");
        }
    }
}
