/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinaryTree {
	constructor(root = null) {
		this.root = root;
	}

	/** minDepth(): return the minimum depth of the tree -- that is,
	 * the length of the shortest path from the root to a leaf. */

	minDepth() {
		if (this.root === null) return 0;
		return this._findDepth(this.root);
	}

	_findDepth(node, max = false) {
		const { left, right } = node;
		if (left === null && right === null) return 1;
		if (left === null) return this._findDepth(right, max) + 1;
		if (right === null) return this._findDepth(left, max) + 1;
		if (max) {
			return (
				Math.max(
					this._findDepth(left, max),
					this._findDepth(right, max)
				) + 1
			);
		} else {
			return Math.min(this._findDepth(left), this._findDepth(right)) + 1;
		}
	}

	/** maxDepth(): return the maximum depth of the tree -- that is,
	 * the length of the longest path from the root to a leaf. */

	maxDepth() {
		if (this.root === null) return 0;
		return this._findDepth(this.root, true);
	}

	/** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
	 * The path doesn't need to start at the root, but you can't visit a node more than once. */

	maxSum() {
		let result = 0;

		function helper(node) {
			if (node === null) return 0;
			const { left, right, val } = node;
			const leftSum = helper(left);
			const rightSum = helper(right);
			result = Math.max(result, val + leftSum + rightSum);
			return Math.max(0, leftSum + val, rightSum + val);
		}

		helper(this.root);
		return result;
	}

	/** nextLarger(lowerBound): return the smallest value in the tree
	 * which is larger than lowerBound. Return null if no such value exists. */

	nextLarger(lowerBound) {
		if (this.root === null) return null;

		let larger = null;
		let toVisitQueue = [this.root];
		while (toVisitQueue.length) {
			let current = toVisitQueue.pop();
			const { val, left, right } = current;

			if (val > lowerBound && (val < larger || larger === null)) {
				larger = val;
			}
			if (left) {
				toVisitQueue.push(left);
			}
			if (right) {
				toVisitQueue.push(right);
			}
		}
		return larger;
	}

	/** Further study!
	 * areCousins(node1, node2): determine whether two nodes are cousins
	 * (i.e. are at the same level but have different parents. ) */

	areCousins(node1, node2) {
		function findParentNode(
			findNode,
			currentNode,
			level = 0,
			data = { level: 0, parent: null }
		) {
			if (data.parent) return data;
			if (
				currentNode.left === findNode ||
				currentNode.right === findNode
			) {
				data.level = level + 1;
				data.parent = currentNode;
			}
			if (currentNode.left) {
				findParentNode(findNode, currentNode.left, level + 1, data);
			}
			if (currentNode.right) {
				findParentNode(findNode, currentNode.right, level + 1, data);
			}
			return data;
		}
		const node1ParData = findParentNode(node1, this.root);
		const node2ParData = findParentNode(node2, this.root);

		return (
			node1ParData.level === node2ParData.level &&
			node1ParData.parent !== node2ParData.parent
		);
	}

	/** Further study!
	 * serialize(tree): serialize the BinaryTree object tree into a string. */

	static serialize(tree) {
		const toVisitStack = [tree.root];
		const vals = [];

		while (toVisitStack.length) {
			const current = toVisitStack.pop();

			if (current) {
				const { left, right, val } = current;
				vals.push(val);
				toVisitStack.push(right);
				toVisitStack.push(left);
			} else {
				vals.push("#");
			}
		}

		return vals.join(" ");
	}

	/** Further study!
	 * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

	static deserialize() {}

	/** Further study!
	 * lowestCommonAncestor(node1, node2): find the lowest common ancestor
	 * of two nodes in a binary tree. */

	lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
