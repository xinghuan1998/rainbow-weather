var res = Array(100).fill(0).map(function (v, k) { return k + 1; })
console.log(res)
//首先用Array(100)生成长度为100的空位数组,由于遍历方法不处理空位,因此需要Array.fill()方法填充整个数组，再使用map方法遍历数组，它接受一个回调函数，回调函数的第二个参数是，当前元素索引，返回索引+1，来修改原始数组中的值