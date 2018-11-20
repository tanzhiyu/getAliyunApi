console.log(module.paths)
console.log(__dirname)
console.log(require.extensions['.js'].toString())
console.log(__filename)


var change = a => {
  console.log(a ===b )
  a = [7]
  console.log(a)
}
var a = {a: 'a'}
var b = a
change(a)
console.log(a)

console.log(b)