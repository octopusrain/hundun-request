#!/usr/bin/env bash
npm config set registry=http://registry.npmjs.org
echo '请进⾏登录相关操作：'
npm login
echo "-------publishing-------"
npm publish .
echo "发布完成"
npm config set registry=https://registry.npm.taobao.org # 设置taobaoyuan
exit