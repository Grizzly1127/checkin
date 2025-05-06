# Checkin

GitHub Actions 实现 [GLaDOS][glados] 自动签到

([GLaDOS][glados] 可用邀请码: `ZTIMU-AU8P5-O9VGU-AJ7CB`, 双方都有奖励天数)

## 使用说明

1. Fork 这个仓库

1. 登录 [GLaDOS][glados] 获取 Cookie

1. 添加 Cookie 到 Secret `GLADOS`

1. 启用 Actions, 每天北京时间 00:10 自动签到

1. 如需推送通知, 可选择以下方式:
   - [PushPlus][pushplus]: 添加 Token 到 Secret `NOTIFY`
   - 方糖: 添加 SendKey 到 Secret `FT_SEND_KEY`
   - [WxPusher][wxpusher]: 添加 AppToken 到 Secret `WXPUSHER_APP_TOKEN`, 添加 UID(s) 到 Secret `WXPUSHER_UIDS` (多个UID用逗号分隔)

[glados]: https://github.com/glados-network/GLaDOS
[pushplus]: https://www.pushplus.plus/
[wxpusher]: https://wxpusher.zjiecode.com/
