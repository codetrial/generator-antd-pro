const getNotices = (req, res) =>
  res.json([
    {
      id: '000000001',
      avatar: 'https://avatars0.githubusercontent.com/u/41424813?s=200&v=4',
      title: 'Winter is comming',
      datetime: '2018-12-09',
      type: 'notification',
    },
    {
      id: '000000006',
      avatar: 'https://avatars2.githubusercontent.com/u/36496727?s=200&v=4',
      title: 'Jon Snow 评论了你',
      description: '权力的游戏第八季即将开播！',
      datetime: '2018-12-07',
      type: 'message',
    },
    {
      id: '000000009',
      title: 'Yo Antd Pro 开发',
      description: '任务需要在 2019-05-20 20:00 前完成',
      extra: '进行中',
      status: 'processing',
      type: 'event',
    },
  ]);

export default {
  'GET /api/notices': getNotices,
};
