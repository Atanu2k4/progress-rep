# 30-Day DSA Roadmap (C++) — Zero to Interview-Ready

> Rule: Every day = Learn topic (2-3 hrs) + Solve problems (3-4 hrs). No skipping. No excuses.
> Use C++ STL heavily. LeetCode (LC) numbers included wherever applicable.

---

## DAY 1 — C++ Foundations for DSA
- Time & Space Complexity, Big-O, Big-Theta, Big-Omega
- Pass by value vs reference, Pointers, Structures
- STL: `vector`, `pair`, `array`
- STL: `string`, string streams
- Input/Output fast I/O (`ios_base::sync_with_stdio`)
- Practice: LC 1 (Two Sum - brute), LC 66 (Plus One), LC 189 (Rotate Array), LC 283 (Move Zeroes)

## DAY 2 — STL Deep Dive
- `pair`, `tuple`
- `stack`, `queue`, `deque`
- `priority_queue` (min-heap, max-heap)
- `set`, `multiset`, `unordered_set`
- `map`, `multimap`, `unordered_map`
- Iterators, `auto`, range-based loops
- `sort()`, custom comparators, `lambda` functions
- Practice: LC 1046 (Last Stone Weight), LC 350 (Intersection of Two Arrays II), LC 242 (Valid Anagram)

## DAY 3 — Math & Bit Manipulation
- GCD/LCM (Euclidean algorithm)
- Sieve of Eratosthenes
- Prime factorization
- Modular arithmetic, Fast exponentiation
- AND, OR, XOR, NOT, Shift operators
- Count set bits (Brian Kernighan's algorithm)
- Check power of 2, single number problems
- Practice: LC 231 (Power of Two), LC 191 (Number of 1 Bits), LC 136 (Single Number), LC 137 (Single Number II), LC 260 (Single Number III), LC 50 (Pow(x,n)), LC 204 (Count Primes)

## DAY 4-5 — Arrays (Core)
- Subarray techniques: Prefix sum, Kadane's Algorithm
- Two Pointer technique
- Sliding Window (fixed + variable size)
- Sorting-based array problems
- Dutch National Flag algorithm
- Array rotation (reversal algorithm)
- Majority Element (Moore's Voting)
- Practice: LC 53 (Max Subarray), LC 121 (Best Time to Buy/Sell Stock), LC 122 (Best Time II), LC 15 (3Sum), LC 16 (3Sum Closest), LC 18 (4Sum), LC 11 (Container With Most Water), LC 75 (Sort Colors), LC 169 (Majority Element), LC 229 (Majority Element II), LC 238 (Product of Array Except Self), LC 41 (First Missing Positive), LC 128 (Longest Consecutive Sequence), LC 152 (Maximum Product Subarray), LC 560 (Subarray Sum Equals K)

## DAY 6 — 2D Arrays / Matrix
- Matrix traversal patterns (spiral, diagonal)
- Matrix rotation (in-place)
- Transpose
- Set Matrix Zeroes
- Search in 2D Matrix
- Practice: LC 48 (Rotate Image), LC 54 (Spiral Matrix), LC 73 (Set Matrix Zeroes), LC 74 (Search a 2D Matrix), LC 240 (Search 2D Matrix II), LC 130 (Surrounded Regions)

## DAY 7 — Strings
- Pattern matching: Naive, KMP, Rabin-Karp (concepts)
- Anagram, Palindrome checks
- String reversal techniques
- Longest Common Prefix
- String to Integer (atoi)
- Practice: LC 5 (Longest Palindromic Substring), LC 3 (Longest Substring Without Repeating Characters), LC 49 (Group Anagrams), LC 14 (Longest Common Prefix), LC 8 (String to Integer atoi), LC 28 (Find Index of First Occurrence - KMP), LC 43 (Multiply Strings), LC 6 (Zigzag Conversion), LC 767 (Reorganize String), LC 187 (Repeated DNA Sequences)

## DAY 8 — Searching
- Binary Search (iterative + recursive)
- Binary Search on Answer (Search Space Reduction)
- Lower Bound / Upper Bound
- Search in Rotated Sorted Array
- Order-statistics / Kth element
- Practice: LC 704 (Binary Search), LC 33 (Search in Rotated Sorted Array), LC 81 (Search in Rotated Sorted Array II), LC 34 (Find First and Last Position), LC 153 (Find Minimum in Rotated Sorted Array), LC 4 (Median of Two Sorted Arrays), LC 74 (Search a 2D Matrix), LC 1011 (Capacity To Ship Packages), LC 875 (Koko Eating Bananas), LC 410 (Split Array Largest Sum)

## DAY 9 — Sorting
- Bubble, Selection, Insertion Sort
- Merge Sort (with inversion count)
- Quick Sort (with Quickselect)
- Counting Sort, Radix Sort, Bucket Sort concepts
- Practice: LC 912 (Sort an Array), LC 148 (Sort List), LC 215 (Kth Largest Element - Quickselect), LC 493 (Reverse Pairs), LC 56 (Merge Intervals), LC 57 (Insert Interval), LC 452 (Minimum Arrows to Burst Balloons)

## DAY 10 — Recursion & Backtracking (Part 1)
- Recursion basics, recursion tree, base cases
- Subsets / Subsequences generation
- Permutations
- Combination Sum
- N-Queens (intro)
- Practice: LC 78 (Subsets), LC 90 (Subsets II), LC 46 (Permutations), LC 47 (Permutations II), LC 39 (Combination Sum), LC 40 (Combination Sum II), LC 77 (Combinations), LC 22 (Generate Parentheses)

## DAY 11 — Recursion & Backtracking (Part 2)
- N-Queens full solution
- Sudoku Solver
- Rat in a Maze
- Word Search
- Palindrome Partitioning
- Practice: LC 51 (N-Queens), LC 52 (N-Queens II), LC 37 (Sudoku Solver), LC 79 (Word Search), LC 131 (Palindrome Partitioning), LC 17 (Letter Combinations of Phone Number), LC 93 (Restore IP Addresses)

## DAY 12 — Linked List (Part 1)
- Singly Linked List: insert, delete, traverse
- Doubly Linked List
- Reverse a Linked List (iterative + recursive)
- Detect cycle (Floyd's Algorithm)
- Find middle of linked list
- Practice: LC 206 (Reverse Linked List), LC 141 (Linked List Cycle), LC 142 (Linked List Cycle II), LC 876 (Middle of the Linked List), LC 21 (Merge Two Sorted Lists), LC 83 (Remove Duplicates from Sorted List), LC 19 (Remove Nth Node From End)

## DAY 13 — Linked List (Part 2)
- Merge K Sorted Lists
- Add Two Numbers (linked list)
- Reorder List
- Copy List with Random Pointer
- Flattening a Multilevel List
- Intersection of Two Linked Lists
- Practice: LC 23 (Merge k Sorted Lists), LC 2 (Add Two Numbers), LC 143 (Reorder List), LC 138 (Copy List with Random Pointer), LC 25 (Reverse Nodes in k-Group), LC 160 (Intersection of Two Linked Lists), LC 234 (Palindrome Linked List)

## DAY 14 — Stack & Queue
- Stack using array/LL, Queue using array/LL
- Stack using Queue & Queue using Stack
- Next Greater Element / Next Smaller Element
- Min Stack
- Valid Parentheses / Balanced Brackets
- Monotonic stack pattern
- Practice: LC 20 (Valid Parentheses), LC 155 (Min Stack), LC 496 (Next Greater Element I), LC 503 (Next Greater Element II), LC 739 (Daily Temperatures), LC 84 (Largest Rectangle in Histogram), LC 42 (Trapping Rain Water), LC 232 (Implement Queue using Stacks), LC 225 (Implement Stack using Queues)

## DAY 15 — Trees (Part 1 - Basics & Traversals)
- Binary Tree structure, types of trees
- Preorder, Inorder, Postorder (recursive + iterative)
- Level Order Traversal (BFS)
- Height, Diameter of Binary Tree
- Balanced Binary Tree check
- Practice: LC 144, 94, 145 (Traversals), LC 102 (Level Order), LC 104 (Max Depth), LC 543 (Diameter of Binary Tree), LC 110 (Balanced Binary Tree), LC 100 (Same Tree), LC 226 (Invert Binary Tree), LC 101 (Symmetric Tree)

## DAY 16 — Trees (Part 2 - Advanced)
- Zigzag Level Order Traversal
- Top View / Bottom View / Left-Right View
- Boundary Traversal
- Lowest Common Ancestor (LCA)
- Path Sum problems
- Construct Tree from Traversals
- Practice: LC 103 (Zigzag Traversal), LC 199 (Right Side View), LC 236 (LCA of Binary Tree), LC 112 (Path Sum), LC 113 (Path Sum II), LC 124 (Binary Tree Max Path Sum), LC 105 (Construct from Preorder+Inorder), LC 662 (Max Width of Binary Tree)

## DAY 17 — Binary Search Tree (BST)
- BST insert, delete, search
- Validate BST
- Kth Smallest/Largest in BST
- BST to sorted array (inorder)
- LCA in BST
- Construct BST from Preorder
- Practice: LC 98 (Validate BST), LC 230 (Kth Smallest in BST), LC 235 (LCA of BST), LC 108 (Convert Sorted Array to BST), LC 450 (Delete Node in BST), LC 700 (Search in BST), LC 173 (BST Iterator), LC 99 (Recover BST)

## DAY 18 — Heap / Priority Queue
- Min-Heap / Max-Heap implementation concepts
- Heapify, Build Heap
- Kth largest/smallest element
- Top K Frequent Elements
- Merge K Sorted Arrays/Lists
- Median in a stream (two heaps)
- Practice: LC 215 (Kth Largest Element), LC 347 (Top K Frequent Elements), LC 23 (Merge k Sorted Lists), LC 295 (Find Median from Data Stream), LC 973 (K Closest Points to Origin), LC 621 (Task Scheduler), LC 1046 (Last Stone Weight)

## DAY 19 — Trie & Advanced String
- Trie construction (insert, search, startsWith)
- Word Search II using Trie
- Prefix-based problems
- Practice: LC 208 (Implement Trie), LC 211 (Design Add and Search Words), LC 212 (Word Search II), LC 648 (Replace Words), LC 676 (Implement Magic Dictionary)

## DAY 20 — Graphs (Part 1 - Basics & Traversal)
- Graph representation: Adjacency List/Matrix
- BFS, DFS (recursive + iterative)
- Connected Components
- Cycle Detection (Directed & Undirected)
- Bipartite Graph Check
- Practice: LC 200 (Number of Islands), LC 133 (Clone Graph), LC 207 (Course Schedule), LC 210 (Course Schedule II), LC 785 (Is Graph Bipartite), LC 994 (Rotting Oranges), LC 130 (Surrounded Regions), LC 733 (Flood Fill)

## DAY 21 — Graphs (Part 2 - Advanced)
- Topological Sort (Kahn's Algo + DFS-based)
- Dijkstra's Algorithm
- Bellman-Ford Algorithm
- Floyd-Warshall Algorithm
- Minimum Spanning Tree: Prim's & Kruskal's
- Disjoint Set Union (Union-Find) with path compression
- Practice: LC 210 (Course Schedule II), LC 743 (Network Delay Time), LC 787 (Cheapest Flights Within K Stops), LC 1584 (Min Cost to Connect All Points), LC 684 (Redundant Connection), LC 1319 (Number of Operations to Connect Network), LC 1631 (Path With Minimum Effort), LC 542 (01 Matrix)

## DAY 22 — Dynamic Programming (Part 1 - 1D DP)
- Memoization vs Tabulation
- Fibonacci-style DP
- Climbing Stairs pattern
- House Robber pattern
- Practice: LC 70 (Climbing Stairs), LC 198 (House Robber), LC 213 (House Robber II), LC 91 (Decode Ways), LC 62 (Unique Paths), LC 63 (Unique Paths II), LC 279 (Perfect Squares), LC 322 (Coin Change), LC 518 (Coin Change II)

## DAY 23 — Dynamic Programming (Part 2 - 2D DP & Subsequence)
- Longest Common Subsequence (LCS)
- Longest Increasing Subsequence (LIS)
- Edit Distance
- Matrix Chain Multiplication concept
- Practice: LC 1143 (LCS), LC 300 (LIS), LC 72 (Edit Distance), LC 583 (Delete Operation for Two Strings), LC 97 (Interleaving String), LC 115 (Distinct Subsequences), LC 1035 (Uncrossed Lines), LC 673 (Number of LIS)

## DAY 24 — Dynamic Programming (Part 3 - Knapsack Pattern)
- 0/1 Knapsack
- Unbounded Knapsack
- Subset Sum
- Partition Equal Subset Sum
- Target Sum
- Practice: LC 416 (Partition Equal Subset Sum), LC 494 (Target Sum), LC 474 (Ones and Zeroes), LC 1049 (Last Stone Weight II), LC 139 (Word Break), LC 377 (Combination Sum IV)

## DAY 25 — Dynamic Programming (Part 4 - Stock, Palindrome, Interval DP)
- Buy/Sell Stock (multiple variations)
- Palindromic Substrings DP
- Matrix Chain Multiplication (Interval DP)
- Burst Balloons pattern
- Practice: LC 123 (Best Time to Buy/Sell Stock III), LC 188 (Best Time IV), LC 309 (Stock with Cooldown), LC 714 (Stock with Transaction Fee), LC 647 (Palindromic Substrings), LC 132 (Palindrome Partitioning II), LC 312 (Burst Balloons), LC 96 (Unique BSTs)

## DAY 26 — Greedy Algorithms
- Activity Selection
- Interval Scheduling
- Fractional Knapsack
- Job Sequencing
- Gas Station problem
- Practice: LC 55 (Jump Game), LC 45 (Jump Game II), LC 435 (Non-overlapping Intervals), LC 452 (Minimum Arrows), LC 763 (Partition Labels), LC 134 (Gas Station), LC 860 (Lemonade Change), LC 402 (Remove K Digits), LC 738 (Monotone Increasing Digits)

## DAY 27 — Advanced Data Structures
- Segment Tree (Range Sum/Min Query, Point Update)
- Binary Indexed Tree / Fenwick Tree
- LRU Cache / LFU Cache design
- Sparse Table (concept for RMQ)
- Practice: LC 307 (Range Sum Query - Mutable), LC 315 (Count of Smaller Numbers After Self), LC 146 (LRU Cache), LC 460 (LFU Cache), LC 218 (The Skyline Problem)

## DAY 28 — Sliding Window & Two Pointers (Advanced Mix)
- Longest Substring with K Distinct Characters
- Minimum Window Substring
- Fruit Into Baskets pattern
- Subarray/Substring counting with constraints
- Practice: LC 76 (Minimum Window Substring), LC 3 (Longest Substring Without Repeating Chars), LC 424 (Longest Repeating Character Replacement), LC 567 (Permutation in String), LC 209 (Minimum Size Subarray Sum), LC 992 (Subarrays with K Different Integers), LC 904 (Fruit Into Baskets)

## DAY 29 — Mixed Hard Problems (Full Syllabus Revision Practice)
- Mix of Array + DP + Graph + Tree hard-level problems
- Practice: LC 84 (Largest Rectangle in Histogram), LC 42 (Trapping Rain Water), LC 32 (Longest Valid Parentheses), LC 4 (Median of Two Sorted Arrays), LC 76 (Minimum Window Substring), LC 124 (Binary Tree Max Path Sum), LC 200 (Number of Islands), LC 322 (Coin Change), LC 45 (Jump Game II), LC 295 (Find Median from Data Stream)

## DAY 30 — Final Revision + Mock Interview Simulation
- Revisit all weak topics identified from Day 1-29
- Redo 2-3 problems per topic without looking at solutions (timed)
- Do 2 full mock interviews (45 min each, 2 problems each, mixed difficulty)
- Revise time/space complexity of every core algorithm covered
- Revise STL function signatures used throughout

---

## Topic Checklist (Tick as you go)
- [ ] C++ STL
- [ ] Math & Bit Manipulation
- [ ] Arrays & Matrix
- [ ] Strings
- [ ] Searching & Sorting
- [ ] Recursion & Backtracking
- [ ] Linked List
- [ ] Stack & Queue
- [ ] Trees & BST
- [ ] Heap
- [ ] Trie
- [ ] Graphs (BFS/DFS/Shortest Path/MST/Union-Find)
- [ ] Dynamic Programming (1D, 2D, Knapsack, Stock, Interval)
- [ ] Greedy
- [ ] Segment Tree / Fenwick Tree
- [ ] Sliding Window / Two Pointers
- [ ] Final Revision

**Total Problems Covered: ~180+ LeetCode problems across every core DSA topic.**

---
---

# AI PROMPTS — One Per Day (Copy-Paste into any AI chat)

> Paste the full prompt for that day into ChatGPT/Claude/Gemini/etc. Each prompt is self-contained — it tells the AI your exact topic list, forces detailed explanation, examples, C++ code, and complexity analysis, and ties it back to the relevant LeetCode problems.

---

### Day 1 Prompt
```
I am learning DSA in C++ from scratch. Teach me today's topics in full depth, one by one, with a clear explanation, at least one real-world analogy, a working C++ code example for each, and time/space complexity analysis. Topics for today:
- Time & Space Complexity, Big-O, Big-Theta, Big-Omega
- Pass by value vs reference, Pointers, Structures in C++
- STL vector, pair, array
- STL string and stringstream
- Fast I/O in C++ (ios_base::sync_with_stdio)
After explaining, give me a step-by-step approach and C++ solution with dry run for these LeetCode problems: 1 (Two Sum), 66 (Plus One), 189 (Rotate Array), 283 (Move Zeroes).
```

### Day 2 Prompt
```
Teach me C++ STL in depth for DSA with code examples for each container's key operations (insertion, deletion, traversal, time complexity):
- pair, tuple
- stack, queue, deque
- priority_queue (min-heap and max-heap, custom comparator)
- set, multiset, unordered_set
- map, multimap, unordered_map
- Iterators, auto keyword, range-based for loops
- sort() with custom comparators and lambda functions
Then give me detailed C++ solutions with explanation for LeetCode 1046 (Last Stone Weight), 350 (Intersection of Two Arrays II), 242 (Valid Anagram).
```

### Day 3 Prompt
```
Explain the following Math and Bit Manipulation topics for DSA in C++, each with intuition, formula/derivation where relevant, and a C++ code snippet:
- GCD/LCM using Euclidean Algorithm
- Sieve of Eratosthenes
- Prime factorization of a number
- Modular arithmetic and Fast/Binary Exponentiation
- Bitwise operators: AND, OR, XOR, NOT, Left/Right Shift
- Counting set bits using Brian Kernighan's Algorithm
- Checking power of 2 using bits
Then solve with full explanation: LeetCode 231 (Power of Two), 191 (Number of 1 Bits), 136 (Single Number), 137 (Single Number II), 260 (Single Number III), 50 (Pow(x,n)), 204 (Count Primes).
```

### Day 4-5 Prompt
```
Teach me core Array techniques in C++ in depth, one at a time, with examples and code:
- Prefix Sum technique
- Kadane's Algorithm (Maximum Subarray)
- Two Pointer technique
- Sliding Window (fixed size and variable size) with examples of each
- Dutch National Flag algorithm
- Array rotation using the Reversal algorithm
- Majority Element using Moore's Voting Algorithm
For each technique explain WHEN to use it (pattern recognition) and WHY it works. Then give detailed C++ solutions with dry runs for: LeetCode 53, 121, 122, 15, 16, 18, 11, 75, 169, 229, 238, 41, 128, 152, 560.
```

### Day 6 Prompt
```
Explain 2D Array / Matrix techniques in C++ with diagrams-in-text and code:
- Matrix traversal patterns: spiral order and diagonal traversal
- In-place matrix rotation (90 degrees)
- Matrix transpose
- Set Matrix Zeroes technique (O(1) space approach)
- Efficient search in a sorted 2D matrix
Then solve in detail with C++ code: LeetCode 48 (Rotate Image), 54 (Spiral Matrix), 73 (Set Matrix Zeroes), 74 (Search a 2D Matrix), 240 (Search a 2D Matrix II), 130 (Surrounded Regions).
```

### Day 7 Prompt
```
Teach me String algorithms for DSA in C++ with detailed explanation and code:
- Naive Pattern Matching, KMP Algorithm (with LPS array construction explained step by step), Rabin-Karp concept
- Anagram checking techniques
- Palindrome checking techniques
- String reversal techniques (in-place and using extra space)
- Longest Common Prefix approaches
- String to Integer (atoi) implementation from scratch
Then solve with full C++ code and explanation: LeetCode 5, 3, 49, 14, 8, 28, 43, 6, 767, 187.
```

### Day 8 Prompt
```
Teach me Binary Search in full depth in C++, covering:
- Standard iterative and recursive Binary Search
- Binary Search on Answer / Search Space Reduction pattern (explain how to identify these problems)
- Finding Lower Bound and Upper Bound
- Searching in Rotated Sorted Arrays (with and without duplicates)
- Kth element / order statistics using binary search
Explain the general template for "Binary Search on Answer" problems with a worked example. Then solve with C++ code: LeetCode 704, 33, 81, 34, 153, 4 (Median of Two Sorted Arrays — explain intuition fully), 1011, 875, 410.
```

### Day 9 Prompt
```
Explain all major Sorting algorithms in C++ with code, dry run, and time/space complexity table comparing them all at the end:
- Bubble Sort, Selection Sort, Insertion Sort
- Merge Sort (also show how to count inversions using merge sort)
- Quick Sort (also explain Quickselect for Kth largest/smallest)
- Counting Sort, Radix Sort, Bucket Sort (concept level with example)
Then solve with C++ code: LeetCode 912, 148, 215, 493, 56, 57, 452.
```

### Day 10 Prompt
```
Teach me Recursion and Backtracking fundamentals in C++:
- How recursion works internally (call stack, recursion tree diagram in text)
- Generating Subsets / Subsequences (with and without duplicates)
- Generating Permutations (with and without duplicates)
- Combination Sum pattern (allow reuse vs no reuse)
- Brief intro to N-Queens as a backtracking problem
Explain the backtracking template (choose, explore, un-choose) clearly. Then solve with full C++ code: LeetCode 78, 90, 46, 47, 39, 40, 77, 22.
```

### Day 11 Prompt
```
Teach me advanced Backtracking problems in C++ with full explanation, decision tree reasoning, and code:
- N-Queens full solution with pruning
- Sudoku Solver
- Rat in a Maze
- Word Search on a grid
- Palindrome Partitioning
Explain how to identify time complexity of backtracking solutions. Then solve with C++ code: LeetCode 51, 52, 37, 79, 131, 17, 93.
```

### Day 12 Prompt
```
Teach me Linked List fundamentals in C++ with node structure code and diagrams-in-text:
- Singly Linked List: insertion, deletion, traversal (all cases: head, middle, tail)
- Doubly Linked List basics
- Reversing a Linked List (iterative and recursive)
- Detecting a cycle using Floyd's Cycle Detection (Tortoise and Hare)
- Finding the middle of a linked list (slow-fast pointer)
Then solve with full C++ code: LeetCode 206, 141, 142, 876, 21, 83, 19.
```

### Day 13 Prompt
```
Teach me advanced Linked List problems in C++ with detailed explanation and code:
- Merging K Sorted Linked Lists (multiple approaches: brute force, heap-based, divide and conquer)
- Add Two Numbers represented as linked lists
- Reordering a Linked List
- Copying a Linked List with Random Pointers
- Reversing Nodes in groups of K
- Finding Intersection Point of Two Linked Lists
- Checking if a Linked List is a Palindrome
Then solve with full C++ code: LeetCode 23, 2, 143, 138, 25, 160, 234.
```

### Day 14 Prompt
```
Teach me Stack and Queue concepts in C++ in depth:
- Implementing Stack and Queue using array and linked list from scratch
- Implementing a Stack using Queue and a Queue using Stack
- Next Greater Element / Next Smaller Element pattern using Monotonic Stack
- Min Stack design (O(1) getMin)
- Valid Parentheses / Balanced Brackets checking
- Explain the Monotonic Stack pattern in general and how to recognize when to use it
Then solve with full C++ code: LeetCode 20, 155, 496, 503, 739, 84, 42, 232, 225.
```

### Day 15 Prompt
```
Teach me Binary Tree basics in C++ in depth with a tree node structure and diagrams-in-text:
- Preorder, Inorder, Postorder traversal (recursive and iterative using stack)
- Level Order Traversal (BFS using queue)
- Height and Diameter of a Binary Tree
- Checking if a Binary Tree is height-balanced
- Comparing trees (Same Tree), Inverting a Binary Tree, Symmetric Tree check
Then solve with full C++ code: LeetCode 144, 94, 145, 102, 104, 543, 110, 100, 226, 101.
```

### Day 16 Prompt
```
Teach me advanced Binary Tree problems in C++ with detailed explanation and code:
- Zigzag Level Order Traversal
- Top View, Bottom View, Left View, Right View of a Binary Tree
- Boundary Traversal of a Binary Tree
- Lowest Common Ancestor (LCA) in a Binary Tree
- Path Sum problems (I and II)
- Maximum Path Sum in a Binary Tree
- Constructing a Binary Tree from Preorder and Inorder traversal
Then solve with full C++ code: LeetCode 103, 199, 236, 112, 113, 124, 105, 662.
```

### Day 17 Prompt
```
Teach me Binary Search Tree (BST) concepts in C++ in depth:
- BST insertion, deletion, and search operations with code
- Validating a Binary Search Tree
- Finding Kth Smallest and Kth Largest element in a BST
- Converting a BST to a sorted array (inorder traversal property)
- Lowest Common Ancestor in a BST (optimized approach vs binary tree approach)
- Constructing a BST from Preorder traversal
Then solve with full C++ code: LeetCode 98, 230, 235, 108, 450, 700, 173, 99.
```

### Day 18 Prompt
```
Teach me Heap / Priority Queue concepts in C++ in depth:
- How a Min-Heap and Max-Heap work internally (heapify, build heap operations)
- Finding Kth Largest/Smallest element using heap
- Top K Frequent Elements problem
- Merging K Sorted Arrays/Lists using heap
- Finding median in a stream of numbers using two heaps
Then solve with full C++ code using STL priority_queue: LeetCode 215, 347, 23, 295, 973, 621, 1046.
```

### Day 19 Prompt
```
Teach me Trie (Prefix Tree) data structure in C++ in depth:
- Trie node structure and how insert/search/startsWith work internally
- Implementing a Trie from scratch in C++
- Solving prefix-based search problems using Trie
- Word Search II using Trie + backtracking on a grid
Then solve with full C++ code: LeetCode 208, 211, 212, 648, 676.
```

### Day 20 Prompt
```
Teach me Graph fundamentals in C++ in depth:
- Graph representation: Adjacency List and Adjacency Matrix (with code)
- BFS and DFS traversal (recursive and iterative) with code
- Finding Connected Components in a graph
- Cycle Detection in Directed Graphs and Undirected Graphs (both BFS and DFS based approaches)
- Checking if a Graph is Bipartite
Then solve with full C++ code: LeetCode 200, 133, 207, 210, 785, 994, 130, 733.
```

### Day 21 Prompt
```
Teach me advanced Graph algorithms in C++ in full depth with step-by-step dry runs:
- Topological Sort (Kahn's Algorithm using BFS, and DFS-based approach)
- Dijkstra's Algorithm for shortest path (using priority_queue)
- Bellman-Ford Algorithm (and how it detects negative weight cycles)
- Floyd-Warshall Algorithm for all-pairs shortest path
- Minimum Spanning Tree: Prim's Algorithm and Kruskal's Algorithm
- Disjoint Set Union (Union-Find) with Path Compression and Union by Rank/Size
Then solve with full C++ code: LeetCode 210, 743, 787, 1584, 684, 1319, 1631, 542.
```

### Day 22 Prompt
```
Teach me Dynamic Programming from the basics in C++:
- Difference between Memoization (Top-Down) and Tabulation (Bottom-Up) with code examples of both for the same problem
- Fibonacci-style DP
- Climbing Stairs pattern
- House Robber pattern (linear DP)
Explain how to identify a DP problem and how to define the state and transition. Then solve with full C++ code (both memoization and tabulation): LeetCode 70, 198, 213, 91, 62, 63, 279, 322, 518.
```

### Day 23 Prompt
```
Teach me 2D Dynamic Programming and Subsequence DP patterns in C++ in depth:
- Longest Common Subsequence (LCS) with full DP table dry run
- Longest Increasing Subsequence (LIS) - both O(n^2) and O(n log n) approaches
- Edit Distance
- Matrix Chain Multiplication concept (interval DP intro)
Then solve with full C++ code and DP table walkthroughs: LeetCode 1143, 300, 72, 583, 97, 115, 1035, 673.
```

### Day 24 Prompt
```
Teach me the Knapsack DP pattern in C++ in full depth:
- 0/1 Knapsack (with DP table dry run)
- Unbounded Knapsack
- Subset Sum problem
- Partition Equal Subset Sum
- Target Sum problem (relate it back to subset sum)
Explain how to recognize a Knapsack-pattern problem. Then solve with full C++ code: LeetCode 416, 494, 474, 1049, 139, 377.
```

### Day 25 Prompt
```
Teach me these advanced Dynamic Programming patterns in C++ with detailed explanation and code:
- Buy/Sell Stock DP variations (with cooldown, with transaction fee, at most K transactions)
- Palindromic Substrings DP approach
- Matrix Chain Multiplication / Interval DP pattern
- Burst Balloons problem (why reversing the interval DP thinking is needed)
Then solve with full C++ code: LeetCode 123, 188, 309, 714, 647, 132, 312, 96.
```

### Day 26 Prompt
```
Teach me Greedy Algorithms in C++ in depth, and explain how to prove/justify a greedy choice is correct:
- Activity Selection Problem
- Interval Scheduling
- Fractional Knapsack
- Job Sequencing Problem
- Gas Station problem
Then solve with full C++ code: LeetCode 55, 45, 435, 452, 763, 134, 860, 402, 738.
```

### Day 27 Prompt
```
Teach me these Advanced Data Structures in C++ in full depth with code implementation from scratch:
- Segment Tree (build, range query, point update) with a worked example
- Binary Indexed Tree / Fenwick Tree (build, update, prefix sum query)
- LRU Cache design (using unordered_map + doubly linked list)
- LFU Cache design
- Sparse Table concept for Range Minimum Query
Then solve with full C++ code: LeetCode 307, 315, 146, 460, 218.
```

### Day 28 Prompt
```
Teach me advanced Sliding Window and Two Pointer problems in C++ in depth:
- Longest Substring with K Distinct Characters
- Minimum Window Substring (explain the shrink/expand window logic clearly)
- Fruit Into Baskets pattern
- Counting subarrays/substrings with exact constraints (e.g. "exactly K" using "at most K - at most K-1" trick)
Then solve with full C++ code: LeetCode 76, 3, 424, 567, 209, 992, 904.
```

### Day 29 Prompt
```
I have covered Arrays, Strings, Linked List, Stacks/Queues, Trees, Graphs, DP, Greedy, Heaps, and Tries over the past 28 days in C++. Give me a mixed hard-level revision session: for each of the following LeetCode problems, ask me to first think about the approach, then give me a hint, then the full C++ solution with explanation only after the hint: LeetCode 84, 42, 32, 4, 76, 124, 200, 322, 45, 295.
Also quiz me on time/space complexity of each of my solutions.
```

### Day 30 Prompt
```
Act as my technical interviewer. I have completed a 30-day DSA course in C++ covering STL, Arrays, Strings, Searching/Sorting, Recursion/Backtracking, Linked List, Stack/Queue, Trees, BST, Heaps, Trie, Graphs, DP, Greedy, and Advanced Data Structures. Conduct two 45-minute mock interviews with me: each should have 2 problems of mixed difficulty (easy-medium and medium-hard) drawn from these topics, presented one at a time without giving the answer first. Wait for my approach, then give feedback on my approach before I code it, then review my final C++ code for correctness, edge cases, and complexity. At the end, summarize my weak topics based on how I performed.
```