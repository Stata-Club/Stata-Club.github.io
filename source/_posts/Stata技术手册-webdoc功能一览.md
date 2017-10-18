---
title: '[Stata技术手册]webdoc功能一览'
date: 2017-10-17 10:46:04
tags:
- Stata
- webdoc
- 技术手册
categories:
- 推文
---

`webdoc`命令是Stata的一项外部命令，它旨在将Stata的do文件转化为html文件，并为此配置了一系列的（繁杂的）选项设置。

鉴于国内还没有相关的中文资料，本篇文章将详细介绍关于`webdoc`的参数配置选项。

<!--more-->

## 0.准备与配置

- 安装webdoc： `ssc install webdoc`
- 在本篇文章中，我们使用模板do文件如下
    
    ```html
        sysuse auto
        summarize price mpg
        regress price mpg
        twoway (scatter price mpg) (lfit price mpg)
    ```

## 1.迅速开始

### 1.1 example1

新建do文件example1.do，输入如下内容

```
webdoc init example1, replace logall plain
/***
<!DOCTYPE html>
<html><body>
<h1>Exercise 1</h1>
<p>Open the 1978 automobile data and summarize price and mileage.</p>
***/
sysuse auto
summarize price mpg
/***
<h1>Exercise 2</h1>
<p>Run a regression of price on mileage and display the relation in a scatter plot.</p>
***/
regress price mpg
twoway (scatter price mpg) (lfit price mpg)
webdoc graph
/***
</body></html>
***/
```

在Stata命令框中输入命令：

    webdoc do example1.do

得到[html文件](example1.txt)


### 1.2 基本解释

webdoc命令的形式有一点特殊，它由两部分组成：

1. 第一部分是webdoc do命令，格式为：

>webdoc do *filename* \[arguments\] \[, do_options\]

2. 第二部分是`webdoc 标签命令`


通过webdoc do命令，我们可以将一份do文档转化为html文档，当然，这份do文档会有一些格式要求，具体如下：

1. do文档中的`/***  ***/`之间写入html代码，它们会在`webdoc do`命令进行处理时被直接写入html文件。
2. `webdoc 标签命令` 是webdoc为了方便生成html文件而特意准备的一系列命令，它们写在将要被转换的do文件里，在遇到webdoc do命令执行时，执行其相应功能。简介其中的两个标签命令
    - `webdoc init [docname][,do_options]` 这一`webdoc标签命令`用来初始化html文件，该命令的do_options有：
        - `replace`:覆盖已存在的同名文件     
        - `logall`:要求日志记录所有的Stata输出结果。
    - `webdoc graph` 用于将之前生成的图片输出到html文件中。
3. do文档在`/*** ***/`之外可以自由书写Stata命令，它们会(也可以选择不会)输出到html文件中(包括命令自身和命令得到的结果)

也就是说，在被转换的do文档中包含有Stata命令、webdoc 标签命令还有一部分的html代码，当使用`webdoc do`命令转换时，

- Stata命令会被Stata执行，将执行的结果返回到html文件中
- webdoc标签命令会执行其相应功能
- html代码部分则原封不动地添加进html文件中

文档的这三部分内容共同组成了最后的html文件。

## 2.webdoc init 

>webdoc init \[docname\] \[, init_options\]

该命令用于初始化将要输出的html(或markdown)文档，其中`init_options`选项如下：

- Main
    - **replace**:  如果当前目录有同名文件，覆盖之。
    - **append**：   如果当前目录有同名文件，增加之。
    - **md**：   选择输出文件类型为md，默认选项是html。
    - **header\[(header_opts)\]**:  创建一个独立的html文档(有开头与结尾的相应标签)，其中还有更具体的 **header_opts** 以供细化。
- Log and graph options
    - \[no\]logall：   指定是否需要开启记录所有的Stata输出结果，默认值为不开启。
    - stlog_options:   该选项通过`webdoc stlog`命令发挥作用。
    - gropts(graph_options)：  该选项通过`webdoc graph`命令发挥作用。
- Filenames/paths
    - \[no\]logdir\[(path)\]:   指定存储Stata记录文件的生成路径。默认为当前目录。
    - grdir(path)      指定存储Stata产生的图片的生成路径。默认为当前目录。
    - dodir(path)              指定存储do-files的生成路径。默认为当前目录。
    - \[no\]prefix\[(prefix)\]     指定生成文件的文件名前缀。
    - \[no\]stpath\[(path)\]       指定输出文件中的include-path

以下是关于 **header\[(header_opts)\]** 的选项介绍

- Main
    - width(width)：设置页面宽度
    - nofooter      忽略结尾标签（当这份html文件没有完稿时，可以使用该选项）
- Meta data
    - title(str)   指定文件标题
    - author(str)    指定文件作者  
    - date(str)      指定文件日期  
    - description(str)   添加文件描述  
    - keywords(str)       添加文件的关键词列表（以逗号分隔） 
    - language(str)      指定文件语言，默认为language(en)
    - charset(str)      指定文件编码形式，默认为utf-8
- Stylesheets
    - bstheme\[(spec)\]     从 http://bootswatch.com 中指定一个Bootstrap的CSS主题， *spec* 中的内容为 [theme] [,jscript selfcontained] 形式
        - theme 名称可以为 default cerulean cosmo simplex united 更多请参考[bootswatch官网](https://www.bootstrapcdn.com/bootswatch)，如果该选项被忽略，则自动使用 default主题
        - 如果你想加入需要调用javascript的Bootstrap元素，则可以指定 jscript 选项，程序为为你添加进相关的插入元素。
        - 如果指定 `selfcontained` 选项，则将所引用的CSS及JS全部囊括至目标文件中。
        - 最后的最后，如果你未添加`bstheme`选项，则它会在你的头文件中写入一个最基本的CSS设定。
    - include(filename)     从 **filename** 中导入内容到`<head></head>` 
    - stscheme(stscheme_opts)  指定Stata输出的外观主题
        - 事前提要：由 `cmdlog` 所产生的section 内容不会受到 stscheme 影响。
        - Stata scheme
            - standard      使用 standard 主题（直接在stscheme中填写即可）
            - studio       
            - classic                 
            - desert            
            - mountain            
            - ocean                
            - simple                
        - Manual settings
            - bg(color)     指定背景颜色，color使用16进制颜色码，如#00ff00
            - fg(color)     指定前置颜色
            - rfg(color)    指定输出结果的字体颜色
            - cfg(color)    指定命令颜色
            - rbf           输出结果加粗
            - cbf           输入结果加粗
            - lcom          输出结果斜体或加阴影
        
以下是关于 **stlog_options** 的选项介绍

- Main
    - linesize(#)   指定Stata log中的行宽，用字符数来表示
    - [no]do        指定是否运行Stata命令，默认是运行
    - [no]log       指定是否创建log文件并将其输出到html文件中，默认是记录。
    - [no]cmdlog    指定是否仅展示命令而不输出结果，默认是 否
    - [no]dosave    是否对do文件中的命令储存一份拷贝，默认是 否  
- Contents
    - [no]output               是否隐藏输出内容，默认是不隐藏
    - [no]matastrip            是否隐藏Mata环境的开启与结束命令，默认是不隐藏
    - [no]cmdstrip             是否不记录命令行，默认为记录
    - [no]lbstrip              whether to strip line-break comments; default is nolbstrip
    - [no]gtstrip              whether to strip continuation symbols; default is nogtstrip
    - [no]ltrim                whether to remove indentation; default is ltrim
- Highlighting
    - mark(strlist)            apply `<mark>` tag to specified strings
    - tag(matchlist)           apply custom tags to specified strings
- Technical
    - [no]plain                whether to omit markup; default is noplain
    - [no]raw                  whether to omit markup and character substitutions; default is noraw
    - [no]custom               whether to use custom code to include the log file; default is
                                 nocustom
    - [no]keep                 whether to erase the external log file; default is keep
    - [no]certify              whether to compare results against previous version; default is
                                 nocertify
    - [no]sthlp[(subst)]       (webdoc stlog using only) whether to treat as a Stata help file
    - nostop                   (webdoc stlog using only) do not stop execution on error

以下是关于 **graph_options** 的选项介绍
 
- Main
    - as(fileformats)  输出图片的格式，默认为 as(png)  
    - name(name)        输出图片的名称
    - width(#)        输出图片的宽度，默认为 width(500) 
    - height(#)       输出图片的高度，
    - override_options   override conversion defaults; see graph export
- Attributes
    - alt(string)  为图片增加alt属性，默认为图片名称 
    - title(string)    为图片提供一个"tooltip" 标题
    - attributes(args)       关于img标签更多的属性
- Environment
    - \[no\]link\[(fileformat)\]  是否给图片增加一个链接，默认为增加一个链接，除非hardcode情况
    - \[no\]figure\[(id)\]       是否使用figure标签，默认是使用 
    - caption(string)          给figure提供一个标题
    - cabove or cbelow        标题位于图片上方(cabove)或者下方(cbelow)
- Technical
    - \[no\]hardcode      是否将图片嵌入文件中
    - \[no\]keep   当选择了hardcode后，是否要将原图片文件删除，默认为保留
    - \[no\]custom  是否在图片中使用custom code，默认是不使用

## 3.webdoc 标签命令一览

- `webdoc init [docname] [, init_options]`  初始化输出文件，设置相关全局属性                                     
- /*** ... ***/            在do文件相应位置中加入html代码 
- `webdoc substitute [from to ...] [, add]`  替换代码区的元素
- `webdoc write`     输出一行文本（除了换行符） 
- `webdoc put` ...    输出包含换行符的一行文本  
- `webdoc append filename [, append_opts]`  引入某文件内的内容
- `webdoc toc [levels [offset]] [, ...]`   加入一个表格
- `webdoc stlog [name] [, stlog_options]`  开启一个Stata log记录 
- `webdoc stlog oom cmdline`       隐藏命令行，并增加一句"output omitted" 的解释  
- `webdoc stlog quietly cmdline`    隐藏命令行，啥也不说
- `webdoc stlog cnp`    插入一个换页符，并增加一句"continued on next page"        
- `webdoc stlog close`       停止Stata log记录
- `webdoc stlog [name] using dofile [, ...]` 载入某个do文件的命令的记录
- `webdoc stlog [name] [, ...] : command`  加入某个命令的输出结果
- `webdoc local name definition`      定义一个局部宏
- `webdoc graph [name] [, graph_options]`   插入一张图片
- `webdoc close`             关闭输出文件
- `webdoc set [setname [definition]]`   改变html标签设置
- `webdoc strip filename newname [, replace append]` 将一个do文件中的所有webdoc 标签命令移除

以下是关于 **append_options** 的选项介绍

- `substitute(subst)`   应用替换功能，subst形式为  from to
- `drop(numlist)`     忽略指定行数 

## webdoc set  自定义所生成的html代码

>webdoc set [ *setname* [definition]]

setname是你想要改变的标签
本命令只在被 webdoc do 处理，当本次命令执行完成后，所有setting失效

|Description|setname|Default definition|
|---|:--:|---|
|Stata output section|stlog|`<pre class="stlog"><samp>`|
||_stlog|`</samp></pre>`|
|Stata code section|stcmd|`<pre class="stcmd"><code>`|
||_stcmd|`</code></pre>`|
|Stata help section|sthlp|`<pre class="sthlp">`|
||_sthlp|`</pre>`|
| Stata input tag|stinp|`<span class="stinp">`|
||_stinp|`</span>`|
|Stata result tag|stres|`<span class="stres">`|
||_stres|`</span>`|
|Stata comment tag||`<span class="stcmt">`|
||_stcmt|`</span>`|
|Output-omitted tag|stoom|`<span class="stoom">(output omitted)</span>`|
|Continued on next page tag|stcnp|`<span class="stcnp" style="page-break-after:always"><br/>(continued on next page)<br/></span>`|
|Figure tag|figure|`<figure id="macval(id)">`|
||_figure|`</figure>`|
|Figure caption|fcap||
|Figure link tag|flink||
||_flink|`</a>`|
|Image tag|img|`<img alt="macval(alt)" macval(title) src="`|
||_img|`"macval(attributes)/>`|
|Embedded SVG|svg|`<span macval(title) macval(attributes)>`|
||_svg|`</span>`|

用法举例 

```
 webdoc set stlog <pre id="\`id'" class="stlog" style="position:relative;"><a href="\`doname'" style="position:absolute;top:5px;right:5px">[code]</a><samp>

```

提醒事项：

当svg图片指定了 hardcode 选项时，图片代码会被be tagged by  svg，而img则正常

## 注意事项

- `$`是Stata中用以表示宏的符号，因此如果你使用 `webdoc write` 或者 `webdoc put` 写的文本中含有 `$` ，别忘了加上转义字符 `\$`
- webdoc do 命令不能良好支持 semicolon command delimiter ， The semicolon command delimiter 在 webdoc commands，及 `/*** ***/`中正常运行
- webdoc 标签命令 应在每一行的开头书写
- webdoc stlog 不能被嵌套使用
- 不要在webdoc stlog 中写入 webdoc do 及webdoc init命令

## 宏变量及返回结果列表

webdoc命令在执行的过程中会产生若干全局宏以供使用，当webdoc do 结束后，这些宏会被自动删除。 以下是全部的宏列表

- webdoc do
    ```
     WebDoc_dofile, WebDoc_do_snippets, WebDoc_do_replace, WebDoc_do_append, WebDoc_do_md,
    WebDoc_do_header, WebDoc_do_header2, WebDoc_do_logall, WebDoc_do_linesize, WebDoc_do_nodo, WebDoc_do_nolog, WebDoc_do_cmdlog, WebDoc_do_dosave, WebDoc_do_plain, WebDoc_do_raw,
    WebDoc_do_nooutput, WebDoc_do_matastrip, WebDoc_do_cmdstrip, WebDoc_do_lbstrip, WebDoc_do_gtstrip, WebDoc_do_noltrim, WebDoc_do_mark, WebDoc_do_tag, WebDoc_do_custom,
    WebDoc_do_nokeep, WebDoc_do_certify, WebDoc_do_gropts, WebDoc_do_logdir, WebDoc_do_logdir2, WebDoc_do_grdir, WebDoc_do_dodir, WebDoc_do_noprefix, WebDoc_do_prefix,
    WebDoc_do_prefix2, WebDoc_do_stpath, WebDoc_do_stpath2
    ```
- webdoc set
    ```
    WebDoc_set_stlog, WebDoc_set__stlog, WebDoc_set_stcmd, WebDoc_set__stcmd, WebDoc_set_sthlp,
    WebDoc_set__sthlp, WebDoc_set_stinp, WebDoc_set__stinp, WebDoc_set_stres, WebDoc_set__stres, WebDoc_set_stcmt, WebDoc_set__stcmt, WebDoc_set_stoom, WebDoc_set_stcnp,
    WebDoc_set_figure, WebDoc_set__figure, WebDoc_set_fcap, WebDoc_set_flink, WebDoc_set__flink, WebDoc_set_img, WebDoc_set__img, WebDoc_set_svg, WebDoc_set__svg
    ```
- webdoc init
    ```
     WebDoc_docname, WebDoc_docname_FH, WebDoc_docname0, WebDoc_basename, WebDoc_path, WebDoc_path0,
    WebDoc_stcounter, WebDoc_md, WebDoc_nofooter, WebDoc_logall, WebDoc_linesize, WebDoc_nodo, WebDoc_nolog, WebDoc_cmdlog, WebDoc_dosave, WebDoc_plain, WebDoc_straw, WebDoc_nooutput,
    WebDoc_matastrip, WebDoc_cmdstrip, WebDoc_lbstrip, WebDoc_gtstrip, WebDoc_noltrim, WebDoc_mark, WebDoc_tag, WebDoc_custom, WebDoc_nokeep, WebDoc_certify, WebDoc_gropts,
    WebDoc_logdir, WebDoc_do_grdir, WebDoc_dodir, WebDoc_prefix, WebDoc_prefix0, WebDoc_stpath
    ```
- webdoc substitute
    ```
    WebDoc_substitute
    ```
- webdoc stlog
    ```
    WebDoc_ststatus, WebDoc_stname, WebDoc_stname0, WebDoc_stid, WebDoc_stfilename, WebDoc_stfilename0,
    WebDoc_stwebname, WebDoc_stwebname0, WebDoc_stgrcounter, WebDoc_stlinesize, WebDoc_stlinesize0, WebDoc_stnodo, WebDoc_stnolog, WebDoc_stcmdlog, WebDoc_stdosave, WebDoc_stplain,
    WebDoc_straw, WebDoc_stnooutput, WebDoc_stmatastrip, WebDoc_stcmdstrip, WebDoc_stlbstrip, WebDoc_stgtstrip, WebDoc_stnoltrim, WebDoc_stmark, WebDoc_sttag, WebDoc_stcustom,
    WebDoc_stnokeep, WebDoc_stcertify
    ```
- webdoc local
    ```
    WebDoc_stloc
    ```
- webdoc do(an external Mata global called **WebDoc_do_snippets**    )

在使用webdoc do执行转换工作后，会产生一系列相关的结果宏，这些宏变量当遇到 webdoc init时清空并初始化，webdoc close 则将它们储存如下：

```
      s(docname)        name of output document (including absolute path)
      s(basename)       base name of output document (excluding path)
      s(path)           (absolute) path of output document
      s(md)             md or empty
      s(logall)         logall or empty
      s(linesize)       specified line width or empty
      s(nodo)           nodo or empty
      s(nolog)          nolog or empty
      s(cmdlog)         cmdlog or empty
      s(dosave)         dosave or empty
      s(plain)          plain or empty
      s(raw)            raw or empty
      s(nooutput)       nooutput or empty
      s(matastrip)      matastrip or empty
      s(cmdstrip)       cmdstrip or empty
      s(lbstrip)        lbstrip or empty
      s(gtstrip)        gtstrip or empty
      s(noltrim)        noltrim or empty
      s(mark)           contents of mark() option
      s(tag)            contents of tag() option
      s(custom)         custom or empty
      s(nokeep)         nokeep or empty
      s(certify)        certify or empty
      s(gropts)         default graph export options
      s(logdir)         subdirectory used for Stata log files
      s(grdir)          subdirectory used for graphs (if different from s(logdir))
      s(dodir)          subdirectory used for do-files (if different from s(logdir))
      s(prefix)         prefix for automatic names
      s(stpath)         include-path to be used in the output document
```

webdoc stlog close 以及 webdoc stlog using 储存了如下结果宏

```
      s(name)           name of the Stata output log, including logdir() path
      s(name0)          s(name) without logdir() path
      s(id)             id of the log in the output document
      s(filename)       name of log file on disk (including absolute path and suffix)
      s(filename0)      s(filename) without suffix
      s(webname)        name of log file with include-path for use in output document
      s(webname0)       s(webname) without suffix
      s(doname)         name (and include-path) of do-file
      s(linesize)       line width used for the output log
      s(indent)         size of indentation
      s(nodo)           nodo or empty
      s(nolog)          nolog or empty
      s(cmdlog)         cmdlog or empty
      s(dosave)         dosave or empty
      s(plain)          plain or empty
      s(raw)            raw or empty
      s(nooutput)       nooutput or empty
      s(matastrip)      matastrip or empty
      s(cmdstrip)       cmdstrip or empty
      s(lbstrip)        lbstrip or empty
      s(gtstrip)        gtstrip or empty
      s(noltrim)        noltrim or empty
      s(mark)           contents of mark() option
      s(tag)            contents of tag() option
      s(custom)         custom or empty
      s(nokeep)         nokeep or empty
      s(certify)        certify or empty
```

## webdoc local 

webdoc local 命令用于设置局部宏，该命令只有在 webdoc stlog 命令后方可使用，该宏会被Stata 输出结果的同名列表所存储（使用后缀名 .stloc）每一个输出结果都会有其自己的同名列表，所以不同结果间可以重复使用同名宏，webdoc local的具体用法与 local一致

通过使用webdoc local命令，你可以将输出结果直接写入文本中，webdoc local所定义的宏在 代码区和 webdoc put 命令中均适用，直至下一个webdoc stlog命令之前。需要说明的是，这两者间有一些不同，在代码区使用宏建立在了宏的内容被宏列表储存了，webdoc put则是直接使用宏。

栗子

```
        webdoc stlog
        regress y x1 x2 ...
        webdoc stlog close
        webdoc local b = strofreal(_b[x1], "%9.3f")
        webdoc local se = strofreal(_se[x1], "%9.3f")
        
        /*** <p>As can be seen in the output above, the estimate for the effect
        of x1 on y is equal to `b' (with a standard error of `se').</p> ***/
```

```
        webdoc put <p> As can be seen in the output above, the estimate for 
        webdoc put the effect of x1 on y is equal to `b' (with a standard 
        webdoc put error of `se').</p>
```

## webdoc substitute

webdoc substitute用于将所有代码区内的文字替换为指定文字，其用法为

>webdoc substitute "some text" "SOME TEXT"

如果在后续的文字部分想要改变，则可以使用 webdoc substitute 重新指定，如果想要增加替换方案，可以使用 webdoc substitute add ，如果想要清空方案，则使用webdoc substitute 不加任何参数

## webdoc strip

- replace 
- append

## webdoc do

命令将一份do文档转换为html文档或者markdown文档，webdoc do与 do 命令很相似

## webdoc stlog 

>webdoc stlog

为将Stata的输出结果写入html文档中，你可以使用webdoc stlog命令，该命令将命令的输出结果写入一个log文件中，再将其内容写入html里，

webdoc stlog oom *cmdline* 可以将该命令的输出内容隐藏，并加上一句 "output omitted"信息，如果你连这条信息都不想添加，可以使用 webdoc stlog quietly *cmdline*  webdoc stlog cnp 可以插入一条分页标记，以及"continued on next page"

webdoc stlog close 表示一个输出模块的结束，如果你想将一个外部do文件的输出结果加入本html中，可以使用 webdoc stlog *filename* *filename*即为do文件名称，另外，如果只是想包含一个单独命令的输出结果，而去除命令本身，你可以输入  webdoc stlog : *command* 在这种命令下，使不需要 webdoc stlog close 的。

PS：你也可以不选择这种方式来添加输出结果，而是在webdoc do 或者 webdoc init 中指定 logall 选项。

## webdoc append 用于将其一个外部文件的内容引入

## webdoc toc 

webdoc toc命令将一个表格插入html中

webdoc toc num1 num2  将创建`<hnum2+1>`...三种标签，num2 默认为0  num1 默认为1 

## webdoc graph

webdoc graph 用于将已经生成的图片插入到输出文件中，该命令可以在webdoc stlog中使用，或者在webdoc stlog close之后直接写，如果webdoc graph是在webdoc stlog中书写，图片会在Stata output之前生成，如果webdoc graph是在webdoc stlog close


    webdoc graph can be used to export the current graph and include appropriate code in the output document to display a graph.  webdoc graph can be specified within a webdoc stlog
    section or directly after webdoc stlog close.  If webdoc graph is specified within a webdoc stlog section, the graph is included in the document before the Stata output; if webdoc
    graph is specified after webdoc stlog close, the graph is included after the Stata output (furthermore, if webdoc graph is used outside a webdoc stlog section while logall is on,
    the graph will be placed at the position in the output where the webdoc graph command occurs).  Unless a custom name is specified, the name of the webdoc stlog section is used to
    name the graph (possibly suffixed by a counter if the webdoc stlog section contains more than one webdoc graph command).

    webdoc close closes the HTML or Markdown document.  This is not strictly needed, because webdoc do closes the document automatically if the do-file does not contain a webdoc close
    command.  Furthermore, to exit a do-file before the end of the file, add a line containing // webdoc exit (without anything else on the same line).  webdoc do will read only the
    do-file up to this line.

    webdoc uses a specific set of HTML tags to include and format the Stata outputs and graphs.  The definitions of these tags can be changed within the do-file by the webdoc set
    command.  For details, see Changing the HTML settings under Remarks below.  Specifying webdoc set without an argument restores the default settings.

    webdoc strip removes all webdoc commands and all /*** ***/ blocks from a do-file.

