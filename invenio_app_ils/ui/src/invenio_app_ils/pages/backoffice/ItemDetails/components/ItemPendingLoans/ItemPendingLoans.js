import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Error } from '../../../../../common/components';
import { loan as loanApi } from '../../../../../common/api/';
import { ResultsTable } from '../../../../../common/components';

import './ItemPendingLoans.scss';
import {
  loanSearchQueryUrl,
  viewLoanDetailsUrl,
} from '../../../../../common/urls';
import { formatter } from '../../../../../common/components/ResultsTable/formatters';

export default class ItemPendingLoans extends Component {
  constructor(props) {
    super(props);
    this.fetchPendingLoans = props.fetchPendingLoans;
    this.showDetailsUrl = viewLoanDetailsUrl;
    this.showAllUrl = loanSearchQueryUrl;
  }

  componentDidMount() {
    const { item_pid } = this.props.item;
    this.fetchPendingLoans(item_pid);
  }

  _showDetailsHandler = loan_pid =>
    this.props.history.push(this.showDetailsUrl(loan_pid));

  _showAllHandler = () => {
    const { document_pid, item_pid } = this.props.item;
    this.props.history.push(
      this.showAllUrl(
        loanApi
          .query()
          .withDocPid(document_pid)
          .withItemPid(item_pid)
          .withState('PENDING')
          .qs()
      )
    );
  };

  prepareData() {
    return this.props.data.map(row => formatter.loan.toTable(row));
  }

  render() {
    const rows = this.prepareData();
    const { data, isLoading, hasError } = this.props;
    const errorData = hasError ? data : null;
    return (
      <Loader isLoading={isLoading}>
        <Error error={errorData}>
          <ResultsTable
            rows={rows}
            name={'Pending loans requests'}
            actionClickHandler={this._showDetailsHandler}
            showAllClickHandler={{
              handler: this._showAllHandler,
              params: null,
            }}
            showMaxRows={this.props.showMaxPendingLoans}
          />
        </Error>
      </Loader>
    );
  }
}

ItemPendingLoans.propTypes = {
  item: PropTypes.object.isRequired,
  fetchPendingLoans: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  showMaxPendingLoans: PropTypes.number,
};

ItemPendingLoans.defaultProps = {
  showMaxPendingLoans: 5,
};
