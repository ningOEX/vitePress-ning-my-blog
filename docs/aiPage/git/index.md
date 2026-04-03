---
title: TortoiseGit
description: Git 仓库管理变得更加简单和高效
updated: 2026-4-3
---

# 常见使用命令
<UpdatedTime :updated="$frontmatter.updated" />

### 添加文件到暂存区
> git add .

### 提交更改
> git commit -m "提交信息"

### 推送到远程仓库
> git push -u origin main  # 或 master

### 查看所有分支（当前分支前有*号）
> git branch

### 查看所有分支（包括远程）
> git branch -a

### 切换到已有分支
> git checkout 分支名

### 或使用新命令
> git switch 分支名

### 创建并切换新分支
> git checkout -b 新分支名

### 或
> git switch -c 新分支名