# 分享不带姓名的网站地址

网站可以免费发布到 Cloudflare Pages，分享平台分配的 `pages.dev` 地址。用 **Direct Upload（直接上传）**，无需关联 GitHub，也无需购买域名。网址使用你选择的中性项目名；是否可用和最终地址，以 Cloudflare 界面实际返回为准。

目前已有的 GitHub Pages 地址仍包含 GitHub 用户名。本指南和打包命令不会自动创建 Cloudflare 项目，也不代表已经迁移或完成发布。换一个网站地址不会隐藏原有公开仓库、提交或 GitHub 账号记录。

## 生成可上传文件

在当前任务的功能分支中运行：

```bash
npm ci
npm test
npm run build
node scripts/package-site.mjs
```

输出文件为 `/tmp/todays-creature-site.zip`，需要先从云环境下载到自己的电脑。ZIP 的根目录是 `index.html` 和 `assets/` 等网页文件，**没有外层 `dist/` 文件夹**。

打包器只读取构建产物；排除 `.env`、其他隐藏文件、`.git`、source map 和 `source-commit` 发布记录。生成 ZIP 前会扫描文本及文件名，发现已知 GitHub 用户名、仓库地址、Git 作者姓名或邮箱，以及邮箱和常见密钥特征时停止。报错不显示匹配内容。它不会读取 `.env` 或把密钥、Git 历史放入 ZIP；新增图片等二进制素材时仍应确认素材本身不含个人信息。

如果打包失败，先检查指出的构建文件，再从源码去掉公开内容中的个人信息，重新构建。不要上传失败前留存的旧 ZIP。当前应用不需要任何 API 密钥；以后新增服务时，密钥仅放服务器端 `.env`，不能用 `VITE_` 变量发到前端。

## 第一次上线：直接上传

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)；没有账号时自行注册免费账号。
2. 进入 **Workers & Pages**，创建 **Pages** 应用，选择 **Direct Upload / Upload assets**。具体按钮名称以当前界面为准。
3. 输入不含姓名的中性项目名，例如 `today-offline`。这只是命名示例，未查询是否可用。
4. 上传 `todays-creature-site.zip`，检查识别到根目录 `index.html`，点击 **Deploy site**。
5. 等待部署完成，打开平台给出的真实 `pages.dev` 地址。实际检查首页、完成一次答题、复制分享链接，并在手机上打开。之后分享这个网址，不用分享 GitHub 仓库。

更新网站时重新构建、打包，在同一个项目里创建新的 production deployment 并上传新 ZIP。这样分享地址保持一致。无需粘贴 API Token 或提供密钥；当前云环境未登录 Cloudflare，因此最后的账号创建和上传需在你的浏览器中完成。

答题、匹配和图片导出都在访客浏览器内执行，不调用 OpenAI API，访客不会消耗你的 OpenAI 额度。Cloudflare 静态托管使用其免费套餐，仍受平台自己的套餐和使用规则限制；以账户界面的现行规则为准。国内或微信内的可访问性需要实际测试。

官方操作说明：[Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)。
