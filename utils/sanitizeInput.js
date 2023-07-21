function inputsAreClean(inputs) {
  /* Takes an array of inputs(values of inputs) and returns true if they are clean */

  // 1 - invalids is Array of same length as inputs
  // 2 - we assume at start that all the input in the inputs array are valid i.e.
  //     free of XSS and SQL Injection attempts
  let invalids = inputs.map((i) => false);
  const forbidden = [
    'drop database',
    'drop table',
    'drop user',
    'drop view',
    'drop type',
    'drop tablespace',
    'drop server',
    'drop access method',
    'drop aggregate',
    'drop cast',
    'drop collation',
    'drop conversion',
    'drop domain',
    'drop event trigger',
    'drop extension',
    'drop foreign data wrapper',
    'drop foreign table',
    'drop function',
    'drop group',
    'drop index',
    'drop language',
    'drop materialized view',
    'drop operator',
    'drop owned',
    'drop policy',
    'drop procedure',
    'drop publication',
    'drop role',
    'drop routine',
    'drop schema',
    'drop sequence',
    'drop subscription',
    'drop transform',
    'alter aggregate',
    'alter collation',
    'alter database',
    'alter domain',
    'alter foreign table',
    'alter table',
    'alter user',
    'alter tablespace',
    'alter system',
    'alter server',
    'alter rule',
    'alter role',
    'delete from',
    'select *',
    'insert into',
    'create table',
    'create aggregate',
    'create database',
    'create role',
    'create rule',
    'create foreign table',
    'create operator',
    'create policy',
    'rollback',
    'set role',
    ';',
    '<script>',
    '</script>',
    '<',
    '/>',
  ];

  inputs.forEach((input, index) => {
    for (let word of forbidden) {
      if (input.toString().toLowerCase().includes(word)) {
        invalids[index] = true;
      }
    }
  });

  // we want all entries in invalids to be false
  // so that we can say that invalids is
  // an array containing all valid inputs

  // for that we use every() array method
  invalids = invalids.every((invalid) => invalid == false);
  return invalids;
}
module.exports = inputsAreClean;
