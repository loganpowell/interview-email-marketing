/**
 * recursive function for pulling together goals
 */
const log = console.log

const load = opts => {
  let { ctx, xform } = opts
  const parse = (goal, parent = null) => {
    // no subs
    if (!goal.subs || goal.subs.length === 0)
      return xform ? xform(goal, parent) : goal
    let subs = goal.subs.reduce((acc, sub) => {
      // import referenced goals
      if (typeof sub === "string") {
        try {
          sub = require(ctx + sub)
        } catch (e) {
          sub = {
            ERROR: `Import not found: ${ctx + sub}`,
            FPATH: e.path,
            GUIDE: "Please check the file name and reference path",
          }
        }
      }
      // else concat goal into subs Array
      return acc.concat(parse(xform ? xform(sub, parent) : sub, goal))
    }, [])
    const parsed = { ...goal, subs }
    return xform ? xform(parsed, parent) : parsed
  }

  return G =>
    Array.isArray(G) ? G.reduce((a, c) => a.concat(parse(c)), []) : parse(G)
}

module.exports = { load }
