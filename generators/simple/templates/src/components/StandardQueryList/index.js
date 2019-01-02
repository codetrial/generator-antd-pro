import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

class StandardQueryList extends PureComponent {
  render() {
    const { form, leftOperators, rightOperators, table } = this.props;

    return (
      <div className={styles.tableList}>
        <div className={styles.tableListForm}>{form}</div>
        {(rightOperators || leftOperators) && (
          <div className={styles.tableListOperator}>
            <div className={styles.tableListOperatorLeft}>{leftOperators}</div>
            <div className={styles.tableListOperatorRight}>{rightOperators}</div>
          </div>
        )}
        {table}
      </div>
    );
  }
}

StandardQueryList.defaultProps = {
  leftOperators: null,
  rightOperators: null,
};

StandardQueryList.propTypes = {
  form: PropTypes.element.isRequired,
  table: PropTypes.element.isRequired,
  leftOperators: PropTypes.element,
  rightOperators: PropTypes.element,
};

export default StandardQueryList;
