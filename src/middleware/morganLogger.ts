import morgan from 'morgan';
import chalk, {Chalk} from 'chalk';
import moment from 'moment';


export const morganLogger = morgan(function(tokens, req, res) {
  const status = tokens.status(req, res) || 0;
  const statusColor: Chalk =
    status >= 500
      ? chalk.blackBright.bgRed
      : status >= 400
      ? chalk.blackBright.bgYellow
      : status >= 300
      ? chalk.bgCyan
      : chalk.blackBright.bgGreen;

  return (
    '[EXPRESS] ' +
    chalk.reset(moment().format('YYYY/MM/DD - HH:mm:ss')) +
    ' |' +
    statusColor('  ' + status + '  ') +
    '|' +
    chalk.reset(padLeft(tokens['response-time'](req, res) + ' ms', 14)) +
    ' |' +
    chalk.bgCyan(padRight(' ' + tokens.method(req, res) || '', 9)) +
    ' ' +
    tokens.url(req, res)
  );
});


export function padLeft(str: string, len: number) {
  return len > str.length
      ? new Array(len - str.length + 1).join(' ') + str
      : str;
}

export function padRight(str: string, len: number) {
  return len > str.length
      ? str + new Array(len - str.length + 1).join(' ')
      : str;
}
