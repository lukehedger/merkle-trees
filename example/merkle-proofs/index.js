const crypto = require('crypto')
const merkleProofs = require('merkle-proofs')
const merkleStream = require('merkle-tree-stream')

// temp state
let nodes = []

// function to hash incoming data into a leaf node
const hashLeaf = (leaf, roots) => {
  return crypto.createHash('sha256').update(leaf.data).digest()
}

// function to hash two merkle tree node hashes into a new parent hash
const hashParent = (a, b) => {
  return crypto.createHash('sha256').update(a.hash).update(b.hash).digest()
}

// create a Merkle stream
const stream = merkleStream({
  leaf: hashLeaf,
  parent: hashParent,
})

// write some data to the Merkle stream
stream.write('hello')
stream.write('hashed')
stream.write('world')

// end the Merkle stream
stream.end()

// stream data received event
stream.on('data', data => {
  // update `nodes` state with received data
  nodes.push(data)

  console.log(data)

  //=> {
  //   index, //=> tree node index. Even numbers are data nodes
  //   parent, //=> index of a tree node's parent node.
  //   hash, //=> hash of a tree node.
  //   data, //=> hash of raw data value eg. 'hello' hashed
  // }

  // Indexes:
  // 0 = 'hello'
  // 2 = 'hashed'
  // 4 = 'world'

  /*
        ROOT
        /  \
       3    5
      /    /
     1    4
    /  \
   0    2
 */
})

// stream end event
stream.on('end', () => {
  // to find the index of 'hello' find the node in `proof` or `nodes` with
  // node.data equal to `new Buffer('hello')`
  nodes.sort((a, b) => {
    return a.index - b.index
  })

  const prover = merkleProofs.proofGenerator(nodes)

  prover.add(nodes[0]) // 'hello'
  prover.add(nodes[2]) // 'world'

  const proof = prover.proof() // proof path nodes + Merkle tree root

  const verify = merkleProofs.verifier({
    proof: proof,
    leaf: hashLeaf,
    parent: hashParent,
  })

  console.log(verify('hello', 0))  // true
  console.log(verify('hashed', 2)) // true
  console.log(verify('world', 4))  // false
})
