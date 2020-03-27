const source = require("./interview.json")
const { load } = require("../function/load")
const { getIn } = require("@thi.ng/paths")

const parse = ({ get, src, ctx }) => {
  const _src = require(src)
  let plot = {
    plan: [get],
    acc: [],
    prime: null,
  }

  return {
    parse: load({
      ctx,
      xform: (G, parent) => {
        if (parent && !plot.prime) plot.prime = parent.goal

        let { goal, subs } = G

        if (plot.plan.find(a => a === goal)) {
          if (subs && subs.length) {
            subs.forEach(sub => {
              plot.plan.push(sub.goal)
              plot.acc.push(parent ? [parent.goal, goal, sub.goal] : sub.goal)
            })
          }
          return G
        }

        return {
          // goal,
          subs,
        }
      },
    })(_src),
    plan: plot.acc,
  }
}

// const res = parse(source)
// const parsed = JSON.stringify(res, null, 2)

// const plan = JSON.stringify(plot.acc, null, 2)

// console.log(parsed)

// console.log(plan)

// parse({
//   get: "make the program area look good",
//   src: "./interview.json",
//   ctx: "../email_marketing/",
// }) //?

// Node CLI args
const args = process.argv.slice(2).reduce((a, c) => {
  const kv = c.split(":")
  return { ...a, [kv[0]]: kv[1] }
}, {})

// CLI use
// node scripts\types para1:arg1 para2:arg2

const s_fied = val => JSON.stringify(val, null, 2)

// @ts-ignore
const result = args =>
  args.parse ? s_fied(parse(args).parse) : s_fied(parse(args).plan)

console.log(
  result({
    get: "make the program area look good",
    src: "./interview.json",
    ctx: "../email_marketing/",
    // parse: true,
  })
)
