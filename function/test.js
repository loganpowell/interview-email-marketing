const source = require("../personal/personal_goals.json")
const { load } = require("./load")
const ctx = "../personal/"

let recur = load({
  ctx,
})

const res = recur(source)

const print = JSON.stringify(res, null, 2)

console.log(print)
