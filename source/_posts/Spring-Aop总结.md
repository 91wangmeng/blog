---
title: Spring-Aop总结
date: 2016-11-20 10:57:48
tags: [spring,aop]
categories: spring框架
---
> 路漫漫其修远兮，吾将上下而求索。　　　屈原--《离骚》

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="http://music.163.com/outchain/player?type=2&id=28661549&auto=1&height=66"></iframe>

# 前言
　　工作也一年出头了,深觉spring在java web开发中的重要地位,而spring-aop又是spring框架提供的一种重要特性,可以极大的提高开发的效率.但是日常工作中却基本没有应用到,深感遗憾,所以整理一些平时网上看到的教程,以备日后不时之需.
＞　文中内容基本转载于[水门-kay的spring源码分析](https://my.oschina.net/kaywu123/blog/626135)
# Spring-Aop简介
　　[AOP](http://spring.cndocs.tk/aop.html)（Aspect-Oriented Programming，面向切面的编程），谈起AOP，则一定会追溯到OOP（Object Oriented Programming,面向对象编程），因为AOP可以说是对OOP的补充和完善，而这一切的理念都是从模块化开始的。OOP是一种非常成功、极具表现力的编程范式，它将概念自然地表达为对象，从而将其中通用的代码模块化。所以，衡量OOP成功与否的标准就是它在多大程度上避免了代码的重复。一般情况下，OOP能够很好地避免代码重复。具体继承可以帮助我们在不同类型之间共享相同的行为；多态让我们可以用同样的方式来处理不同类型之间的对象，能够让我们将注意力集中在他们的共同之处。但当遇上一些特定问题的时候，比如，当我们需要为分散的对象引入公共行为时，OOP就显得很无力了。也就是说，OOP很适合你定义从上到下的关系，但不适合定义水平的关系。可以说因为有这些Bug的存在，是AOP生成的直接诱因，所以是为了弥补OOP而存在的。AOP在看待应用程序结构的方式上与OOP是截然不同的，以AOP的思路来看，系统是被分解成方面（Aspect）或者关注点（Concern），而不是一个个对象。追根溯源，与OOP一样，AOP只不过是一种全新的模块化机制而已，他的主要作用是用来描述分散在对象、类或函数中的横切关注点，从关注点中分离出横切关注点则是 AOP的核心概念。
　　AOP的原理，也是非常简单的，即通过分离关注点让解决特定领域问题的代码从业务逻辑中独立出来，业务逻辑的代码中就不再含有针对特定领域问题代码的调用，业务逻辑同特定领域问题的关系则通过切面来封装、维护，这样原本分散在整个应用程序中的代码就可以很好的进行管理了。例如：在使用公共函数的时候，往往需要进行一些逻辑设计，也就时需要代码实现来支持，而这些逻辑代码也是需要维护的，在传统的公共子模块的调用中，除了直接调用以外就没有其他的手段。而相同的情况，在使用AOP后，不仅可以将这些重复的代码抽出来单独维护，而且可以在需要时进行统一调度，这样的使用方法虽然与设计公共子模块有几分相似，但他为这一类问题的解决提供了一整套完整的理论和灵活多样的实现方法。也就是说，在AOP提出横切概念以后，再把模块功能正交化的同时，也在此基础上提供了一系列横切的灵活实现。
![spring-aop结构](http://ogw774xrt.bkt.clouddn.com/spring-aop%E7%BB%93%E6%9E%84.png)
## spring-aop相关术语

 * 目标对象（Target）：包含连接点的对象。也被用来引用增强化或代理化对象。
* 代理（Proxy）：AOP 框架创建的对象，包含增强。
* 连接点（Joinpoint）：程序执行过程中明确的点，如方法的调用或特定的异常被抛出。
* 切点（Pointcut）：指定一个通知将被引发的一系列连接点。AOP 框架必须允许开发者指定切入点：例如，使用正则表达式。
* 增强（Advice）：在特定的连接点AOP框架执行的动作。各种类型的增强包括“around”、“before”、“throws”增强等等。增强类型将在下面讨论。许多 AOP 框架都是以拦截器做增强模型，维护一个“围绕”连接点的拦截器链。
* 切面（Advisor）：一个关注点的模块化，这个关注点实现可能另外横切多个对象。事物管理是J2EE应用中横切关注点中一个很好的例子。切面一般是用 Advisor 或者 拦截器实现。
*　织入（Weaving）：组装方面创建通知化对象。这可以在编译时完成（例如：使用AspectJ编译器），也可以在运行时完成。Spring 和其他一些纯 Java AOP 框架，使用运行时织入。
* 引入（Introduction）：添加方法或字段到增强化类。
*　接口（IsModified）：用于简化缓存。（这里作为补充）。

## spring-aop的应用场景
　　AOP在 权限（Authentication）、缓存（Cache）、内容传递（Context passing）、错误处理（Error handling）、懒加载（Lazy loading）、调试（Debug）、日志（Log）、跟踪优化和校准（tracing、profiling and monitoring）、性能优化（Performance optimization）、持久化（Persistence）、资源池（Resource pooling）、同步（Synchronization）、事务（Transactions）等方面都有用处，可以说是可使用范围及其广泛.

## spring-aop增强类型
AOP增强类型（也叫 通知类型）包括：
* Before Advice（前置增强）：在一个连接点之前执行的增强，但这个增强不能阻止流程继续执行到连接点（除非它抛出一个异常）。
* After Advice（后置增强，全称是 After returning advice 正常返回增强 ）：在连接点正常完成后执行的增强，例如，如果一个正常返回，没有抛出异常。如果抛出异常则不会执行。
* Around Advice（环绕增强）：包围一个连接点的增强，如方法调用，是最强大的增强。在方法调用前后完成自定义的行为。它们负责选择继续执行连接点或直接返回它们自己的返回值或抛出异常来执行。
* Throws Advice（抛出增强，全称是 After throwing advice 异常返回增强，也叫 Finally returning advice 最终返回增强）：是最常用的增强类型。大部分是基于拦截器框架如Nanning或者JBoss4提供的Around增强。作用是，不管，是否正常执行，都会返回增强中的内容。
* Introduction Advice（引入增强）：一种非常特殊的增强。它将新的成员变量、成员方法引入到目标类中。它仅能作用于类层次，而不是方法层次，所以他不能作用于任何切入点。


