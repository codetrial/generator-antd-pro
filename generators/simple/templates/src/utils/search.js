export function parseSearchResult(response) {
  const res = { ...response };
  const pagination = res.data && res.data.pagination;

  if (!pagination) {
    return response;
  }

  const {
    pageNo: current = 1,
    pageSize = 10,
    order: [firstOrder] = [],
    orderBy: [firstOrderBy] = [],
    total,
  } = pagination;

  res.data.pagination = {
    current,
    pageSize,
    total,
  };

  if (firstOrder && firstOrderBy) {
    res.data.pagination.sortColumn = firstOrderBy;
    res.data.pagination.sortOrder = firstOrder.toLowerCase() === 'desc' ? 'descend' : 'ascend';
  }

  return res;
}

export function formatFormValues(formValues) {
  return Object.keys(formValues).reduce((result, key) => {
    const nextResult = { ...result };
    const value = formValues[key];

    if (value != null) {
      if (Array.isArray(value) || typeof value === 'string') {
        if (value.length) {
          nextResult[key] = value;
        }
      } else {
        nextResult[key] = value;
      }
    }

    return nextResult;
  }, {});
}

export function serializeSearchParam(pagination = {}, query = {}, filters = {}, sorter = {}) {
  const { current: pageNo = 1, pageSize = 10 } = pagination;
  const filterValues = Object.keys(filters).reduce((result, key) => {
    const nextResult = { ...result };
    const filterValue = filters[key] || [];

    if (filterValue.length) {
      nextResult[`IN_${key}`] = filterValue;
    }
    return nextResult;
  }, {});
  const filter = {
    ...query,
    ...filterValues,
  };
  const page = {
    pageNo,
    pageSize,
  };

  if (sorter.field) {
    page.orderBy = sorter.field;
    page.order = sorter.order === 'descend' ? 'desc' : 'asc';
  }

  return {
    page: JSON.stringify(page),
    filter: JSON.stringify(filter),
  };
}
