function sketch(p) {
  var noNodes = 10;
  var noConn = 5;
  var gravityConstant = 1;
  var forceConstant = 1000;
  var physics = true;
  
  var nodes = [];
  var nodeCon = [];
  var clicked = false;
  var lerpValue = 0.2;
  var startDisMultiplier = 10;
  var closeNode;
  // var closeNodeMag;
  
  
  p.setup = function () {
    p.createCanvas(600, 600);
    p.fill(0)
    for (let i = 0; i < noNodes; i++) {
      let x = p.random(-startDisMultiplier* p.width , startDisMultiplier* p.width)
      let y = p.random(-startDisMultiplier* p.height , startDisMultiplier* p.height)
      let node = new Node(p.createVector(x, y), p.random(1, 5))
      nodes.push(node);
    }
    closeNode = nodes[0]
    for (let n = 0; n < noConn; n++) {
      nodeCon.push([
        p.round(p.random(noNodes - 1)),
        p.round(p.random(noNodes - 1)),
        p.random(100, 300)
      ])
    }
    nodeCon.push([0,1,200])
    
    // lets add a connection from all solo nodes for good measure
    
    let connected = new Set()
    nodeCon.forEach(conn=>{
      connected.add(conn[0])
      connected.add(conn[1])
    })
    
    for (let n = 0; n < noNodes; n++) {
      if (!connected.has(n)){
          nodeCon.push([
            n, 
            p.round(p.random(noNodes - 1)), 
            p.random(100, 300)
            ]
          )
      }
    }
  }
  
  p.draw = function () {
    p.translate(p.width / 2, p.height / 2)
    p.background(255);
      nodeCon.forEach(con => {
      let node1 = nodes[con[0]]
      let node2 = nodes[con[1]]
      p.line(node1.pos.x, node1.pos.y,
        node2.pos.x, node2.pos.y)
    })
    applyForces(nodes)
    nodes.forEach(node => {
      node.draw()
      if (physics) {
        node.update()
      }
    })
    if (clicked === true) {
      let mousePos = p.createVector(p.mouseX - p.width/2, p.mouseY - p.height/2)
      closeNode.pos.lerp(mousePos, lerpValue)
      if (lerpValue < 0.95) {
          lerpValue+=0.02;
      }
    }
  }
  
  p.touchStarted = function () {
      clicked = true
      let mousePos = p.createVector(p.mouseX - p.width/2, p.mouseY - p.height/2)
      nodes.forEach((node)=>{
        if (mousePos.copy().sub(node.pos).mag() - closeNode.mass/(2 * p.PI) < mousePos.copy().sub(closeNode.pos).mag() - closeNode.mass/(2 * p.PI))
          closeNode = node;
      })
  }
  
  p.touchEnded = function () {
      clicked = false
      lerpValue = 0.2
  }
  
  function applyForces(nodes) {
  
    // apply force towards centre
    nodes.forEach(node => {
      let gravity = node.pos.copy().mult(-1).mult(gravityConstant)
      node.force = gravity
    })
  
    // apply repulsive force between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        let pos = nodes[i].pos
        let dir = nodes[j].pos.copy().sub(pos)
        let force = dir.div(dir.mag() * dir.mag())
        force.mult(forceConstant)
        nodes[i].force.add(force.copy().mult(-1))
        nodes[j].force.add(force)
      }
    }
  
    // apply forces applied by connections
    nodeCon.forEach(con => {
      let node1 = nodes[con[0]]
      let node2 = nodes[con[1]]
      // let maxDis = con[2]
      let dis = node1.pos.copy().sub(node2.pos)
      // diff = dis.mag() - maxDis
      node1.force.sub(dis)
      node2.force.add(dis)
    })
  }

  function mousePressed() {
    // this is where you draw a new square (node)
  }
  
  function Node(pos, size) {
    this.pos = pos
    this.force = p.createVector(0, 0)
    this.mass = (2 * p.PI * size)/1.5
    this.fs = []
  }
  
  Node.prototype.update = function() {
    p.force = this.force.copy()
    p.vel = p.force.copy().div(this.mass)
    // print("VEL", vel, "FORCE", force)
    this.pos.add(p.vel)
  }
  
  Node.prototype.draw = function() {
    p.ellipse(this.pos.x, this.pos.y, this.mass, this.mass) 
  }
};

export default sketch;