const MerkleTools = require('merkle-tools')

const merkleTools = new MerkleTools({ hashType: 'sha256' })

// add some leaves to the tree - can either be pre-hashed or raw
merkleTools.addLeaf('ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb')
merkleTools.addLeaf('3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d')
merkleTools.addLeaves(['c', 'd', 'e'], true)

/*
  Leaf hashes:
  =====
  a = ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
  b = 3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d
  c = 2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6
  d = 18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4
  e = 3f79bb7b435b05321651daefd374cdc681dc06faa65e374e38337b88ca046dea
 */

// generate the Merkle tree
merkleTools.makeTree()

/*
  Merkle Tree
  =====

                  ROOT=Hash(H+E)
                   /        \
                 /           \
            H=Hash(F+G)       E
            /       \          \
          /          \          \
    F=Hash(A+B)    G=Hash(C+D)   E
     /     \         /    \       \
   /        \      /       \       \
  A         B     C         D       E

 */

// get the Merkle Tree root as a Buffer
const merkleRoot = merkleTools.getMerkleRoot()

// get the Merkle proof as an Array of hash objects
const proof0 = merkleTools.getProof(0)

// The proof array contains a set of Merkle sibling objects.
// Each object contains the sibling hash, with the key value of either right or left.
// The right or left value tells you where that sibling was in relation to the
// current hash being evaluated.
console.log(proof0) // => [ { right: '3e2...' }, { right: 'bff...' }, { right: '3f7...' } ]

/*
  Leaf `A` proof
  =====
  [ { right: 'B' }, { right: 'G' }, { right: 'E' } ]
 */

// validate the proof of the first leaf
console.log(
  merkleTools.validateProof(proof0, merkleTools.getLeaf(0), merkleRoot)
) // => true

// get the number of leaves currently in the tree
console.log(merkleTools.getLeafCount()) // => 5
