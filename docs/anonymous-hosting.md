# 分享不带姓名的网站地址

网站可以免费发布到 Cloudflare Pages，分享平台分配的 `pages.dev` 地址。用 **Direct Upload（直接上传）**，无需关联 GitHub，也无需购买域名。网址使用你选择的中性项目名；是否可用和最终地址，以 Cloudflare 界面实际返回为准。

## 第一次上线：只需 5 步，不用写代码

1. **下载网站包**：把本次交付的 `todays-creature-site.zip` 下载到电脑，保持 ZIP 不解压。
2. **登录 Cloudflare**：打开 [Cloudflare Dashboard](https://dash.cloudflare.com/)，没有账号时注册免费账号。
3. **选择直接上传**：进入 **Workers & Pages**，创建 **Pages** 应用，选择 **Direct Upload / Upload assets**。具体按钮名称以当前界面为准。
4. **取一个中性名字**：填写不含姓名的项目名，例如 `today-offline`。示例名称未查询是否可用，以平台提示为准。
5. **上传并部署**：上传 ZIP，确认识别到根目录 `index.html`，点击 **Deploy site**。等待完成，再打开和分享平台给出的真实 `pages.dev` 地址。

当前云环境无法代替你登录 Cloudflare；账号登录和最后上传要在你的浏览器里完成。无需把账号密码或 API Token 发给任何人。第一次打开新网址时，检查首页、完成一次答题、切换中英文并复制分享链接，再用手机打开。

目前已有的 GitHub Pages 地址仍包含 GitHub 用户名。本指南和打包命令不会自动创建 Cloudflare 项目，也不代表已经迁移或完成发布。换一个网站地址不会隐藏原有公开仓库、提交或 GitHub 账号记录。

## 给中文和英文朋友分享

网站提供 **中文 / EN** 手动切换，切换不丢答题进度或已有答案。初始语言按 **URL 的有效 `lang` 参数 → 浏览器本地语言偏好 → 浏览器语言** 选择；中文浏览器默认中文，其余默认英文。

结果页复制的链接带有角色 `r` 和当前语言 `lang`。例如选择英文后分享，朋友会先看到英文分享卡，也能手动改为中文。下载的 PNG 工牌同样使用当前语言，支持中文或英文导出。

两种语言的文案已包含在网站里，答题、匹配、切换语言和图片导出都在访客浏览器执行，不调用翻译或 OpenAI API，不消耗你的 OpenAI 额度。

## 开发者：重新生成可上传文件

已经拿到交付 ZIP 时，可以直接按上面的 5 步上传，无需运行以下命令。修改网站后，在当前任务的功能分支中重新生成上传包：

```bash
npm ci
npm test
npm run package:site
```

输出文件为 `/tmp/todays-creature-site.zip`，需要先从云环境下载到自己的电脑。ZIP 的根目录是 `index.html` 和 `assets/` 等网页文件，**没有外层 `dist/` 文件夹**。

打包器只读取构建产物；排除 `.env`、其他隐藏文件、`.git`、source map 和 `source-commit` 发布记录。生成 ZIP 前会扫描文本及文件名，发现已知 GitHub 用户名、仓库地址、Git 作者姓名或邮箱，以及邮箱和常见密钥特征时停止。报错不显示匹配内容。它不会读取 `.env` 或把密钥、Git 历史放入 ZIP；新增图片等二进制素材时仍应确认素材本身不含个人信息。

如果打包失败，先检查指出的构建文件，再从源码去掉公开内容中的个人信息，重新构建。不要上传失败前留存的旧 ZIP。当前应用不需要任何 API 密钥；以后新增服务时，密钥仅放服务器端 `.env`，不能用 `VITE_` 变量发到前端。

## 更新已发布的网站

重新生成 ZIP 后，在同一个 Cloudflare Pages 项目里创建新的 production deployment 并上传新 ZIP。这样分享地址保持一致，不用重新通知朋友换网址。

Cloudflare 静态托管使用其免费套餐，仍受平台自己的套餐和使用规则限制；以账户界面的现行规则为准。国内或微信内的可访问性需要实际测试。

官方操作说明：[Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)。
