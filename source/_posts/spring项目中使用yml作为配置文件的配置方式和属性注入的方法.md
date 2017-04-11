---
title: spring项目中使用yml作为配置文件的配置方式和属性注入的方法
date: 2017-02-15 20:36:19
tags: [spring,yml]
categories: javaweb
---
> 九曲黄河万里沙,浪淘风簸自天涯　　刘禹锡--《浪淘沙·九曲黄河万里沙》

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=28661564&auto=1&height=66"></iframe>

# 使用yml文件的理由
yml作为配置文件相较于properties文件的优势是可以支持列表,当参数过多的时候properties文件中就会显得很凌乱,而yml文件可以通过多层级关系让文件显得层次分明,更加清爽,如:
properties文件

```properties
redis.ip=192.168.11.1
redis.port=8080
```


yml文件

```yml
redis:
        ip: 192.168.11.1
        port: 8080
```

# yml语法

```yml
普通Key-Value
a: b
层级
a:
    b: c
列表
a: 
    - b: 1
    - c: 2
  
```
# POM文件引入依赖
```xml
<!-- https://mvnrepository.com/artifact/org.yaml/snakeyaml -->
<dependency>
    <groupId>org.yaml</groupId>
    <artifactId>snakeyaml</artifactId>
    <version>1.17</version>
</dependency>
```

# spring配置文件
```xml
<bean id="configProperties" class="org.springframework.beans.factory.config.YamlPropertiesFactoryBean">
        <property name="resources">
            <list>
                <value>classpath:filter/${env}.yml</value>
            </list>
        </property>
    </bean>
    <bean class="org.springframework.beans.factory.config.PreferencesPlaceholderConfigurer">
        <property name="properties" ref="configProperties"/>
    </bean>    
```

# 注入属性
```java
@Value("#{configProperties['jpush.appKey']}")
    private String jpush_appKey;
```

