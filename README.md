# typescript-to-markdown

## why

开发过程中需要写技术文档，在定义接口文档时，接口输入输出内容需要以表格的形式同步给其它开发(FE/BE/QA 等), 前端更偏向于写 ts 类型来定义接口

因此，需要一个工具用于将 ts 类型转换为 markdown 的 table 语法，方便分享。

## How

![](https://raw.githubusercontent.com/feikerwu/figure-bed/master/assets/20220609150925.png)
[https://excalidraw.com/#json=hU_Q2a1RmOjtKBmWjSx8U,XKq0LgpjR5ni-Erk8RY5yw](https://excalidraw.com/#json=hU_Q2a1RmOjtKBmWjSx8U,XKq0LgpjR5ni-Erk8RY5yw)

### 技术选型

1. 通过 ts 的 compiler 接口去解析 AST，参考

[Using the Compiler API · microsoft/TypeScript Wiki](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)

2. 通过 babel 编译能力去解析 AST
