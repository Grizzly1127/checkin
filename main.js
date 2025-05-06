const glados = async () => {
  const cookie = process.env.GLADOS
  if (!cookie) return
  try {
    const headers = {
      'cookie': cookie,
      'referer': 'https://glados.rocks/console/checkin',
      'user-agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
    }
    const checkin = await fetch('https://glados.rocks/api/user/checkin', {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: '{"token":"glados.one"}',
    }).then((r) => r.json())
    const status = await fetch('https://glados.rocks/api/user/status', {
      method: 'GET',
      headers,
    }).then((r) => r.json())

    const res = [
      'Checkin OK',
      `${checkin.message}`,
      `Left Days ${Number(status.data.leftDays)}`,
      `${checkin.message}`.replace('Checkin!', `Days ${Number(status.data.leftDays)}!`)
    ]
    console.log(res)
    return res
  } catch (error) {
    const res = [
      'Checkin Error',
      `${error}`,
      `<${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}>`,
    ]
    console.log(res)
    return res
  }
}

const notify = async (contents) => {
  const token = process.env.NOTIFY
  if (!token || !contents) return
  await fetch(`https://www.pushplus.plus/send`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: contents[0],
      content: contents.join('<br>'),
      template: 'markdown',
    }),
  })
}

const notify_ft = async (contents) => {
  const token = process.env.FT_SEND_KEY
  if (!token || !contents) return

  const baseUrl = `https://sctapi.ftqq.com/${token}.send`;
  const params = {
    text: contents[3],
    desp: contents.join('\n\n')
  };
  console.log(params)

  // 使用 URL 和 URLSearchParams 搭配处理
  const url = new URL(baseUrl);
  url.search = new URLSearchParams(params);
  await fetch(url.toString(), {
    method: 'GET'
  })
}

const notify_wxpusher = async (contents) => {
  const appToken = process.env.WXPUSHER_APP_TOKEN
  const uids = process.env.WXPUSHER_UIDS
  if (!appToken || !uids || !contents) return

  // 将uids字符串转换为数组（如果有多个UID，以逗号分隔）
  const uidArray = uids.split(',').map(uid => uid.trim())

  console.log('Sending message via WxPusher...')
  await fetch('https://wxpusher.zjiecode.com/api/send/message', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      appToken,
      content: contents.join('<br>'),
      summary: contents[0], // 消息摘要
      contentType: 2, // 内容类型 1表示文字 2表示html
      uids: uidArray,
      url: process.env.GITHUB_SERVER_URL ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}` : '' // 可选：点击消息后的跳转链接
    }),
  }).then(response => response.json())
    .then(data => {
      console.log('WxPusher response:', data)
    })
    .catch(error => {
      console.error('WxPusher error:', error)
    })
}

const main = async () => {
  const result = await glados()
  //await notify(result)
  //await notify_ft(result)
  await notify_wxpusher(result)
}

main()
