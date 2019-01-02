import { parse } from 'url';

const list = [
  {
    id: '1001',
    name: 'Sample A',
    time: '2018-12-09 12:00:00',
  },
  {
    id: '1002',
    name: 'Sample B',
    time: '2018-12-10 15:00:00',
  },
  {
    id: '1003',
    name: 'Sample C',
    time: '2018-12-11 20:00:00',
  },
];

const getSamples = (req, res) => {
  let sampleList = list;
  const { filter = '{}' } = req.query;
  const filterJSON = JSON.parse(filter);

  Object.keys(filterJSON).forEach(key => {
    const filterValue = filterJSON[key];
    if (filterValue != null && filterValue.length) {
      sampleList = sampleList.filter(item => {
        if (Array.isArray(filterValue)) {
          return filterValue.map(String).indexOf(String(item[key])) > -1;
        }
        return (
          String(item[key]) === String(filterValue) ||
          String(item[key]).indexOf(String(filterValue)) > 0
        );
      });
    }
  });

  return res.json({
    status: 'OK',
    message: 'Query sample list success!',
    data: {
      list: sampleList,
      pagination: {
        total: sampleList.length,
        totalPage: 1,
        pageNo: 1,
        pageSize: 10,
      },
    },
  });
};

const getSample = (req, res) => {
  const { params } = req;
  const sample = list.find(item => item.id == params.id);

  return res.json({
    status: 'OK',
    message: 'Get sample success!',
    data: sample,
  });
};

const createSample = (req, res) => {
  const { body } = req;

  if (list.length >= 10) {
    return res.json({
      status: 'ERROR',
      message: 'Create failed!',
    });
  }

  list.push({
    id: list.length + 1001,
    ...body,
  });

  return res.json({
    status: 'OK',
    message: 'Create success!',
  });
};

const updateSample = (req, res) => {
  const { body = {} } = req;
  const { id } = body;
  const sample = list.find(item => item.id == id);

  if (sample) {
    Object.assign(sample, body);
  }

  return res.json({
    status: 'OK',
    message: 'Update success!',
  });
};

export default {
  'PUT /api/sample/:id': updateSample,
  'GET /api/sample/:id': getSample,
  'POST /api/sample': createSample,
  'GET /api/sample': getSamples,
};
