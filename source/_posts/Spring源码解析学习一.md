---
title: Spring源码解析学习一
date: 2016-11-22 21:34:23
tags: [spring,ioc]
categories: javaweb
---
> 欲穷千里目，更上一层楼　　　王之涣--《登黄鹤楼》

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="http://music.163.com/outchain/player?type=2&id=443242&auto=1&height=66"></iframe>

# IOC容器

　　[IOC](http://baike.baidu.com/link?url=JWeJwbeWUgHNVPBDar_dHnd4t0pkTjISMgwpwDTgT6IxvMCZ6Vnb_glBEyGJn5v2zShO1h092qk16D2zEq-xGSnhH72-awArnyJXo8YE7lVOwHZ8sOQgN9haMYHeVvIY),又名控制反转(Inversion of Control),即是某一接口具体实现类的选择控制权从调用类中移除，转交给第三方决定.因为IoC确实不够开门见山，因此业界曾进行了广泛的讨论，最终软件界的泰斗级人物Martin Fowler提出了DI（依赖注入：Dependency Injection）的概念用以代替IoC，即让调用类对某一接口实现类的依赖关系由第三方（容器或协作类）注入，以移除调用类对某一接口实现类的依赖。“依赖注入”这个名词显然比“控制反转”直接明了、易于理解。
IOC则是容器是Spring实现IOC功能的具体执行者,在Spring中BeanFactory就是我们所说的IOC容器,从这个类名中可以看出它的设计采用了工厂模式,同时它是生产bean的,生产bean干什么呢?当然就是注入依赖了,BeanFactory这个借口主要为了一个最基本的IOC容器提供一个规范.
```java
public interface BeanFactory {
    /* 默认情况下，如果一个Bean是FactoryBean，Spring是会返回其生成的Bean，而不是工厂本身，如果想要得到工厂本身，需要在ID前加&.
    * 例如:PropertiesFactoryBean,@Resource('properties')注入的是是Properties,而@Resource('properties')注入的才
    * 是PropertiesFactoryBean
    */
    String FACTORY_BEAN_PREFIX = "&";
    //通过bean的名称在IOC容器中获取bean对象
    Object getBean(String s) throws BeansException;
    //通过bean的名称和bean的Class类型来获取bean
    <T> T getBean(String s, Class<T> aClass) throws BeansException;
    //根据bean的Class类型来获取bean对象
    <T> T getBean(Class<T> aClass) throws BeansException;
    //根据名称和多个对象来获取一个bean对象
    Object getBean(String s, Object... objects) throws BeansException;
    //根据bean的Class类型和多个对象来获取一个bean
    <T> T getBean(Class<T> aClass, Object... objects) throws BeansException;
    //判断容器中是否包含名称是s的bean对象
    boolean containsBean(String s);
    //判断一个名称为s的bean对象是否为单例模式,如果容器中没有名称为s的Bean对象会抛出找不到该bean的异常
    boolean isSingleton(String s) throws NoSuchBeanDefinitionException;
    //判断一个名称为s的bean对象是否为多例模式,如果容器中没有名称为s的Bean对象会抛出找不到该bean的异常
    boolean isPrototype(String s) throws NoSuchBeanDefinitionException;
    //判断名称为s的bean的Class类型是不是指定的类型
    boolean isTypeMatch(String s, ResolvableType resolvableType) throws NoSuchBeanDefinitionException;
    //判断名称为s的bean的Class类型是不是指定的类型
    boolean isTypeMatch(String s, Class<?> aClass) throws NoSuchBeanDefinitionException;
    //获取名字为s的bean的Class类型
    Class<?> getType(String s) throws NoSuchBeanDefinitionException;
    //获取名称为s的bean的所有别名
    String[] getAliases(String s);
}
```
spring配置文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean name="A" class="com.wang.meng.A"/>
    <alias name="A" alias="a1"/>
    <alias name="A" alias="a2"/>
    <bean name="B" class="com.wang.meng.B"/>
    <alias name="B" alias="b"/>
</beans>
```
简单的IOC容器创建并测试一些基本方法.
创建过程:
> * 创建IOC配置文件的抽象资源
* 创建一个BeanFactory
* 把读取配置信息的Reader配置给BeanFactory
* 加载配置信息

```java
        ClassPathResource resource = new ClassPathResource("applicationContext.xml");
        DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
        XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(beanFactory);
        reader.loadBeanDefinitions(resource);
        System.out.println("名称为A的bean是否存在:" + beanFactory.containsBean("A"));
        System.out.println("名称为B的bean是否存在:" + beanFactory.containsBean("B"));
        System.out.println("名称为C的bean是否存在:" + beanFactory.containsBean("C"));
        System.out.println("通过名称A:" + beanFactory.getBean("A"));
        System.out.println("通过别名a1:" + beanFactory.getBean("a1"));
        System.out.println("通过别名a2:" + beanFactory.getBean("a2"));
        System.out.println("通过名称和类型:" + beanFactory.getBean("A", A.class));
        System.out.println("通过名称和对象:" + beanFactory.getBean("A", beanFactory.getBean("a2")));
        System.out.println("A是否是单例模式:"+beanFactory.isSingleton("A"));
        System.out.println("A是否是多例模式:"+beanFactory.isPrototype("A"));
        System.out.println("名称为A的bean是否是A类型:"+beanFactory.isTypeMatch("A",A.class));
        System.out.println("名称为A的bean是否是B类型"+beanFactory.isTypeMatch("A",B.class));
        System.out.println("名称为A的bean的所有别名:"+ Arrays.toString(beanFactory.getAliases("A")));
```
打印结果
```
23:12:26.945 [main] DEBUG org.springframework.core.env.PropertySourcesPropertyResolver - Could not find key 'spring.liveBeansView.mbeanDomain' in any property source
名称为A的bean是否存在:true
名称为B的bean是否存在:true
名称为C的bean是否存在:false
通过名称A:com.wang.meng.A@569cfc36
通过别名a1:com.wang.meng.A@569cfc36
通过别名a2:com.wang.meng.A@569cfc36
通过名称和类型:com.wang.meng.A@569cfc36
通过名称和对象:com.wang.meng.A@569cfc36
A是否是单例模式:true
A是否是多例模式:false
名称为A的bean是否是A类型:true
名称为A的bean是否是B类型false
名称为A的bean的所有别名:[a1, a2]
```
从结果中可以分析出,spring创建的bean默认为单例模式.
