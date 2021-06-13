### git的使用

# commit规范
feat  新功能
fix  bug修复
style  样式修改
refact  重构
optimize  优化
enhance  微调
docs  文档

# 撤销提交的记录 git reset commitId与 git reset --hard commitId的区别
git reset commitId:只是回退了commit的信息，如果还需要提交直接commit即可(只是将暂存区的代码放到工作区，不会影响到工作区的内容)
git reset --hard commitId 彻底回退到某个版本，本地的代码会变成回退到的版本，撤销的所有commit都会被直接移除即工作区的内容直接撤销掉(慎用)
加上--hard会把工作区的内容直接撤销掉所以要慎用，而不添加--hard的话只是将暂存区的代码放到工作区，不会影响到工作区的内容

# git pull与git pull --rebase、git merge的区别
git pull 等价于 git fetch + git merge
git pull --rebase等价于 git featch + git rebase
当我们需要push代码前执行git pull rebase它会变基将我们提交的commit全部放到拉取的线上commit之后，而不是按照各自的commit时间交叉在一起
git rebase master：rebase的执行原理，它会依次比较每次commit的冲突一旦发现冲突就会停下来，解决完冲突之后提交需要执行git rebase --continue继续往下比较，直到没有冲突合并完成

# git stash的使用
git stash 将修改的代码保存到暂存区，工作区会删除这些修改
git stash pop 要想取出的时候使用即可
git stash show 查看暂存的修改
git stash list 查看暂存区的所有暂存修改记录

# git 删除远程的分支
git branch -d xxx 删除本地的分支
git push origin --delete xxx 删除远程分支

# git reflog查看所有提交

# git cherry-pick commitId 与 git cherry-pick -n commitId的区别

git cherry-pick -n commitId (-n是--no-commit的缩写)加上这个参数可以将此提交“复制”到当前的分支，而不做额外的commit操作，避免犯错

git的一些辅助插件：
GitLens 可以帮助你快速比对不同分支的代码差异
在 vscode 里画流程图 - draw.io
高亮标识 - Todo Tree
快速定位括号 - Bracket Pair Colorizer
拼写检查 - Code Spell Checker
Git History可以帮助你迅速查看 Git 历史记录，图形化的页面，使 Git 历史一目了然
Git Emoji 可以更好的帮助团队形成提交规范，使用一个 Emoji 表情概括本次提交，再加上一些文本描述信息，提交记录将会变得赏心悦目