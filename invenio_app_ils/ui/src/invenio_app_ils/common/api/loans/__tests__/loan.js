import { loan as loanApi } from '../loan';

describe('Loan query builder tests', () => {
  it('should build query string with document PID', () => {
    const query = loanApi
      .query()
      .withDocPid(5)
      .qs();
    expect(query).toEqual('document_pid:5');
  });

  it('should build query string with document PID 5 and pending state', () => {
    const query = loanApi
      .query()
      .withDocPid(5)
      .withState('PENDING')
      .qs();
    expect(query).toEqual('document_pid:5 AND state:PENDING');
  });

  it('should build query string with pending state', () => {
    const query = loanApi
      .query()
      .withState('PENDING')
      .qs();
    expect(query).toEqual('state:PENDING');
  });

  it('should build query string with item pid 5 and on loan state', () => {
    const query = loanApi
      .query()
      .withItemPid(5)
      .withState('ON_LOAN')
      .qs();
    expect(query).toEqual('item_pid:5 AND state:ON_LOAN');
  });

  it('should build query string with itemPid 10 and ITEM_RETURNED or CANCELLED state', () => {
    const query = loanApi
      .query()
      .withItemPid(10)
      .withState(['ITEM_RETURNED', 'CANCELLED'])
      .qs();
    expect(query).toEqual('item_pid:10 AND state:(ITEM_RETURNED OR CANCELLED)');
  });

  it('should not return anything for empty params', () => {
    expect(() => {
      loanApi
        .query()
        .withState()
        .qs()
        .toThrow();
    });
  });
});

describe('Loan list url request test', () => {});