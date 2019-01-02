const STATUS = {
  OK: ['200', 'OK', 'ok'],
};

export function isOK(status) {
  return status == null || STATUS.OK.indexOf(String(status)) >= 0;
}

export function isNotOK(status) {
  return status != null && STATUS.OK.indexOf(String(status)) < 0;
}
