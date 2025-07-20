function draw(stackResult) {
  const ID = "tower-draw-canvas"
  const canvas = document.querySelector(`canvas#${ID}`) || document.createElement("canvas")
  canvas.id = ID
  canvas.style.width = "100%"
  canvas.style.height = "100vh"
  document.body.appendChild(canvas)
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  const ctx = canvas.getContext("2d")
  const { width, height } = canvas
  const cols = 4
  const gap = 10
  const gamePadding = 5
  const gameWidth = (width - (cols + 1)*gap)/cols
  // width = cols*gameWidth + (cols + 1)*gap
  const gameHeight = Math.min(gameWidth*2/3, (height - (Math.ceil(stackResult.length/cols) + 1)*gap)/Math.ceil(stackResult.length/cols))
  const innerWidth = gameWidth - 2*gamePadding
  const innerHeight = gameHeight - 2*gamePadding
  let x = gap;
  let y = gap;
  
  for(let i=0;i<stackResult.length;i++){
    const obj = stackResult[i]
    const {towers, from, to} = obj
    
    const totalDisks = towers.reduce((acc, arr) => acc + arr.length, 0)
    
    const innerX = x + gamePadding
    const innerY = y + gamePadding
    
//     base line
    ctx.beginPath()
    ctx.moveTo(innerX, innerY + innerHeight);
    ctx.lineTo(innerX + innerWidth, innerY + innerHeight);
    ctx.stroke()
    
//     towers
    const widthDiff = innerWidth / towers.length;
    for(let j=0;j<towers.length;j++){
      const diff = widthDiff * (j) + widthDiff/2
      const startX = innerX + diff
      const startY = innerY
      const endX = innerX + diff
      const endY = innerY + innerHeight
      
//       towers
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
      
      const disks = towers[j]
      const towerHeight = Math.abs(endY - startY)
      const diskHeight = towerHeight/totalDisks
      for(let k=0;k<disks.length;k++){
        const n = disks[k]
        const diskWidth = widthDiff*n/totalDisks
        const x = startX - diskWidth/2
        const y = endY - ((k+1)*diskHeight)
//         draw a disk
        ctx.beginPath()
        ctx.rect(x, y, diskWidth, diskHeight)
        ctx.stroke()
      }
    }
    
//     outer rect
    ctx.beginPath()
    ctx.rect(x, y, gameWidth, gameHeight);
    ctx.stroke()
    
    
    if (i>0 && (i+1)%(cols) === 0) {
      x = gap
      y += gameHeight + gap
    }else{
      x += gameWidth + gap
    }
    
  }
}


function getStackResult(n, ans){
  const towers = [
    Array.from({length: n}).map((_, i) => n-i),
    [],
    []
  ]
  
  const result = [
    {
      towers: towers.map(arr=>arr.map(e=>e)),
      from: 0,
      to: 0
    }
  ]
  
  ans.forEach((obj)=> {
    const {from, to} = obj
    const source = towers[from]
    const destination = towers[to]
    const lastElement = source.pop()
    if (!lastElement) return
    destination.push(lastElement)
    result.push({
      towers: towers.map(arr=>arr.map(e=>e)),
      from, 
      to
    })
  })
  
  return result
  
}

function toh(n, s=0, d=1, a=2, ans = []) {
  if (n === 0) {
    return
  }
  if (ans.length === 0) {
    ans.push({data: [n, 0, 0], from: null, to: null})
  }
  toh(n-1, s, a, d, ans)
  const obj = ans[ans.length - 1]
  const arr = [...obj.data]
  arr[s] -= 1
  arr[d] += 1
  obj.data = arr
  obj.from = s
  obj.to = d
  ans.push({...obj})
  // console.log(`${n} position disk from ${s} to ${d}`, obj)
  toh(n-1, a, d, s, ans)
  return ans
}


function main() {
  const n = 5
  const ans = toh(n, 0, 2, 1)
  const stackResult = getStackResult(n, ans)
  draw(stackResult)
}
main()
