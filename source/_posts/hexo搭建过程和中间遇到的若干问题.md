---
title: hexo搭建过程和中间遇到的若干问题
date: 2016-11-19 18:51:53
tags: [hexo,nodejs,mac]
categories: 博客
---
> 竹杖芒鞋轻胜马 一蓑烟雨任平生　　　--苏轼《定风波》

# 开始
　　本来我以前也用hexo搭建过一个博客,但是由于后来工作变得懒惰,加上搭建的时候刚接触到编程,对搭建过程一知半解,也没有很好的保存搭建的文件,github上只剩下编译后的文件,就放弃折腾了.偶然间发现[Material Theme](https://material.vss.im/)博客,加上本身自己是谷歌脑残粉,用过*nexus5*和*neuxs6*,对[material design](http://baike.baidu.com/view/13912767.htm)本身有莫名的好感,很喜欢这种有质感的设计,于是折腾了一晚上把这个博客搭建起来了.在这里主要记录一下自己在搭建过程中遇到的问题和找到的解决方案,也算为以后再做类似的工作提供一个解决思路.
## 安装nodejs
　　前往[nodejs](https://nodejs.org/en/)官网,根据系统下载相应版本的安装包,然后进行安装.安装完成以后通过以下命令检测是否安装成功,如果出现版本号,则证明安装成功.
```bash
$ node -v
```

## 安装hexo
　　由于nodejs自带npm功能,可以通过以下命令安装hexo
```bash
npm install -g hexo
```
[hexo文档](https://hexo.io/zh-cn/docs/deployment.html)
 值得注意的是如果安装进度条一直不动,那是由于npm的安装源是国外的地址,需要翻墙才能正常使用,解决办法是讲npm的源更换到国内的地址,可以通过以下命令将源更换为淘宝的镜像.
```bash
npm --registry http://npm.stdyun.com info underscore
```
同时在mac系统下如果出现类似下文的报错信息
```
pm ERR! Error: EACCES: permission denied, access '/usr/local/lib/node_modules/npm/node_modules/ansi-styles'
npm ERR!     at Error (native)
npm ERR!  { [Error: EACCES: permission denied, access '/usr/local/lib/node_modules/npm/node_modules/ansi-styles']
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'access',
npm ERR!   path: '/usr/local/lib/node_modules/npm/node_modules/ansi-styles' }
```
则是由于权限不够,需要用sudo权限安装,命令如下:
```bash
sudo npm install -g hexo
```

　　安装完成以后,新建一个文件夹blog,然后在blog文件夹下打开终端/控制台,执行以下命令:
```bash
hexo init
```
等待hexo初始化完成以后blog文件夹下会出现以下文件,大致介绍一下.
* themes 顾名思义主题文件夹,安装主题的位置.
* source 新建博文和其他相关页面的保存位置.
* scaffolds 博文模板保存位置,通过命令`hexo new 模板名 "博文名"`新建博文,会根据模板生产相应的初始化博文.
* public 根据主题相关配置编译markdown格式的博文生成页面的保存位置,也就是说别人所看到的博客所有的内容都在这里.
* node_modules hexo相关模块的保存位置.
* package.json hexo个模块版本信息.
* _config.yml 站点配置文件.配置如博客的名称,作者,语言等相关信息.

然后可以开始安装主题了.
## 安装material theme
　　可以前往[material theme](https://material.vss.im/)官网查看安装方式以及相关教程,在这里就不一一赘述了,我用的是比较简单的一种方式,如下:
```
npm install hexo-material
```
安装完成以后,可以在blog/node_modules找到hexo-material文件夹,讲hexo-material文件夹拷贝到blog/themes文件夹下.然后修改blog文件夹里的_config.yml,如下:
```yml
theme:
  hexo-material
```

## 本地预览博客
　　一切准备就绪后,可以在本地预览博客,通过以下命令:
```bash
hexo g #编译生成
hexo s #服务启动
```
然后访问[http://localhost:4000](http://localhost:4000)就可以看到属于你自己的博客了.

## 安装集成服务
### RSS
```bash
npm install hexo-generator-feed --save
```
### search
```bash
npm isntall hexo-generator-search --save
```
## DIY
　　别急这只是刚刚开始,如果所有人都是这样的那怎么突出这个博客是专属我的呢,接下来让我们进行一些DIY.通过修改blog/themes/hexo-material文件夹下的_config.yml文件进行一下个性化的配置,注意不要跟blog下的_config.yml搞混了哦!可以参考[主题配置](https://material.vss.im/intro/)个性化你的博客.

# 发布
　　博客弄好了,怎么可以不放到网上与大家分享呢,参考以下文档[hexo部署](https://hexo.io/zh-cn/docs/deployment.html),将博客部署到[github](https://github.com/),最后绑定好你的域名[【Hexo+Github】域名和github绑定的问题](http://www.jianshu.com/p/1d427e888dda),一切大功告成了.
　　好了,享受写作的快乐吧!如果有什么问题欢迎留言或者点击侧边栏里的Q ME与我联系.


