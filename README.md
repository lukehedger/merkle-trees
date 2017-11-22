# Merkle Trees 🌴🌲🌳🎄🎋

## What's a Tree?
A [tree structure](https://en.wikipedia.org/wiki/Tree_(data_structure)) is a way
of representing the hierarchical nature of a structure in a graphical form. The
chart is generally upside down compared to an actual tree, with the 'root' at
the top and the 'leaves' at the bottom.

![Unordered tree](https://upload.wikimedia.org/wikipedia/commons/f/f7/Binary_tree.svg)

In computer science, a tree is a data structure that simulates a hierarchical
tree structure.

A tree is made up of nodes and edges (the connection between one node and
another) without having any cycle.

Each node is a data structure consisting of a value and a list of references to
other nodes (children). A child is a node directly connected to another node
when moving away from the root.

References to child nodes cannot be duplicated and no reference can point to the
root. These constraints prevent circular references.

### Terminology
- Root - the top node in a tree
- Leaf node- a node with no children
- Non-leaf node - a node with children

## What's a Merkle Tree?
A [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) is a tree in which
every leaf node is labelled with a data block (eg. a file or set of files) and
every non-leaf node is labelled with the cryptographic hash of the labels of its
child nodes.

A binary Merkle Tree implementation is two child nodes under each node.

![Merkle Tree](https://upload.wikimedia.org/wikipedia/commons/9/95/Hash_Tree.svg)

## What's a Merkle Proof?
Merkle trees allow efficient and secure verification of the contents of large
data structures.

Fundamentally, a Merkle tree is an efficient way to prove that something is in a
set, without having to store or analyse the entire set.

Given that each non-leaf node is the hash of its children, each leaf node is the
set we want to prove membership for. And the root of a Merkle tree is a digest
of all of the elements in the data set: the ultimate source.

> A Merkle proof consists of a chunk (or, leaf node), the root hash of the tree,
and the 'branch' consisting of all of the hashes going up along the path from
the chunk to the root.

> Someone reading the proof can verify that the hashing, at least for that
branch, is consistent going all the way up the tree, and therefore that the
given chunk actually is at that position in the tree.

> The application is simple: suppose that there is a large database, and that
the entire contents of the database are stored in a Merkle tree where the root
of the Merkle tree is publicly known and trusted (eg. it was digitally signed by
enough trusted parties). Then, a user who wants to do a key-value lookup on the
database (eg. "tell me the object in position 85273") can ask for a Merkle
proof, and upon receiving the proof verify that it is correct, and therefore
that the value received actually is at position 85273 in the database with that
particular root. It allows a mechanism for authenticating a small amount of
data, like a hash, to be extended to also authenticate large databases of
potentially unbounded size.

[Merkling in Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)

In the following diagram of a Merkle proof, the green leaf node is the chunk we
want to verify, the beige non-leaf nodes represent the path back up to the root
node from the green leaf node (and together form a 'branch'). The yellow
non-leaf nodes are the siblings (nodes that share a parent) of the branch nodes
also needed to provide the proof. The purple nodes are not needed at all.

![Merkle Proof](https://blog.ethereum.org/wp-content/uploads/2015/11/merkle2.png)
