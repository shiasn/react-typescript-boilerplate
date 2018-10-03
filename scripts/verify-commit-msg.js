const chalk = require('chalk')
const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()
console.log(msg);
const commitRE = /^(revert: )?(WIP|feat|fix|refactor|docs|test|chore|style|types|pref|revert)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
    chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
    `    ${chalk.green(`feat(search): add 'history' options`)}\n` +
    `    ${chalk.green(`fix(account): field email typo`)}\n\n` +
    chalk.red(`  You can also use ${chalk.cyan(`npm run commit`)} to interactively generate a commit message.\n`)
  )
  process.exit(1)
}