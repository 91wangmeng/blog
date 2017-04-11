---
title: 'profile:spring根据环境动态配置'
date: 2016-12-13 21:20:13
tags: [spring,profile]
categories: 博客
---
> 好好学习,天天向上　　　--英语老师说的

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=86369&auto=1&height=66"></iframe>
# Profile

    在不同的开发环境下,可能会出现有的bean在不同的环境下配置不同,如果通过修改配置文件或者代码来做到切换,那势必将增加工作难度和实施的压力.
在spring3.1以后引入了profile bean的功能,可以将不同环境下的bean一次定义,然后通过切换对应的profile的激活状态来实现不同环境下bean的动态配置.
## 测试
通过改变不同环境下输出流指向不同的位置测试是否实现了动态切换

> dev环境下,输出流会指向一个文件,将内容打印在文本文件内.
pro环境下,输出流会指向控制台,将内容打印控制台上.

### java配置方式
```java
@Configuration
public class JavaConfig {

    @Bean
    public Knight knight() {
        return new DamselRescuingKnight();
    }

    @Bean
    @Profile("dev")
    public Quest devQuest() {
        PrintStream printStream = null;
        try {
            printStream = new PrintStream("/Volumes/my space/开发相关/work space/wm/src/main/resources/a.txt");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new QuestImpl(printStream);
    }

    @Bean
    @Profile("pro")
    public Quest proQuest() {
        return new QuestImpl(System.out);
    }
}
```
### 测试代码
```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = JavaConfig.class)
@ActiveProfiles("dev")
public class JavaConfigTest {
    @Resource
    private Knight knight;
    @Test
    public void contextLoads() {
        knight.fight();
    }
    @Test
    public void knightNotNull(){
        Assert.assertNotNull(knight);
    }
}
```

### xml配置方式
```xml
<bean name="knight" class="com.wang.meng.DamselRescuingKnight">
</bean>
<beans profile="pro">
    <bean name="devQuestImpl" class="com.wang.meng.QuestImpl">
        <constructor-arg name="_printStream" value="#{T(System).out}"/>
    </bean>
</beans>
<beans profile="dev">
    <bean name="printSteam" class="java.io.PrintStream">
        <constructor-arg value="/Volumes/my space/开发相关/work space/wm/src/main/resources/a.txt"/>
    </bean>
    <bean name="proQuestImpl" class="com.wang.meng.QuestImpl">
        <constructor-arg name="_printStream" ref="printSteam"/>
    </bean>
</beans>
<beans>
<bean name="minstrel" class="com.wang.meng.Minstrel">
    <constructor-arg name="_printStream" value="#{T(System).out}"/>
</bean>
<aop:config>
    <aop:aspect ref="minstrel">
        <aop:pointcut id="fight" expression="execution(* *.fight(..))"/>
        <aop:before method="before" pointcut-ref="fight"/>
        <aop:after method="after" pointcut-ref="fight"/>
    </aop:aspect>
</aop:config>
</beans>
```
### 测试代码
```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
@ActiveProfiles("pro")
public class XmlConfigTests {
	@Resource
	private Knight knight;
	@Test
	public void contextLoads() {
		knight.fight();
	}
}
```
> xml配置方式启动报错
```java
Caused by: org.xml.sax.SAXParseException; lineNumber: 22; columnNumber: 58; cvc-complex-type.2.4.a: 发现了以元素 'bean' 开头的无效内容。应以 '{"http://www.springframework.org/schema/beans":beans}' 之一开头。
```
经排查,如果前边使用了<beans profile="dev">配置了以后,那么后边如果存在不需要动态配置的<bean>,必须用<beans></beans>包裹起来,否侧会报错
