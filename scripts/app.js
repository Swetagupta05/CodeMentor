// ==========================================================================
// CODEMENTOR APPLICATION LOGIC & INTERACTION ENGINE
// Product-First Student Learning & Placement Preparation Hub
// Refined Developer-Focused Edition
// ==========================================================================

// Application State
const state = {
  currentView: 'dashboard',
  dsaFilter: 'All Problems',
  dsaSearch: '',
  dsaDifficulty: 'All',
  selectedProblem: null,
  activeLanguage: 'java',
  currentQuestionIndex: 0,
  activeInterviewTopic: 'Java',
  activeCourseId: 'java-backend',
  activeLessonId: { courseId: 'java-backend', moduleId: 'm3', lessonId: 'l24' },
  activeResourceId: 1,
  authMode: 'signin',
  courseProgress: {
    'java-backend': 60,
    'full-stack': 35,
    'frontend-architecture': 62,
    'dsa-mastery': 44
  },
  completedLessonsSet: new Set(['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10', 'fs-l1', 'fs-l2', 'fs-l3']),
  goals: [
    { id: 1, text: 'Solve 3 DSA problems', count: '1/3', done: false },
    { id: 2, text: 'Complete one Java lesson', count: '0/1', done: false },
    { id: 3, text: 'Revise OOP concepts', count: '1/1', done: true },
    { id: 4, text: 'Practise one interview question', count: '0/1', done: false }
  ],
  bookmarkedResources: new Set([1, 3, 5]),
  ideOutput: null
};

// DSA Problem Dataset
const dsaProblems = [
  {
    id: 1,
    title: 'Find Missing Number in Array',
    difficulty: 'Easy',
    topic: 'Arrays',
    acceptance: '64.2%',
    companies: ['Amazon', 'Microsoft', 'Flipkart'],
    status: 'Not Solved',
    timeEst: '15 mins',
    desc: 'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array. Can you implement a solution using O(1) extra space complexity and O(n) runtime complexity?',
    starterCode: {
      java: `class Solution {\n    public int missingNumber(int[] nums) {\n        int n = nums.length;\n        int expectedSum = n * (n + 1) / 2;\n        int actualSum = 0;\n        for (int num : nums) {\n            actualSum += num;\n        }\n        return expectedSum - actualSum;\n    }\n}`,
      python: `class Solution:\n    def missingNumber(self, nums: List[int]) -> int:\n        n = len(nums)\n        return (n * (n + 1)) // 2 - sum(nums)`,
      cpp: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        int n = nums.size();\n        int sum = n * (n + 1) / 2;\n        for (int x : nums) sum -= x;\n        return sum;\n    }\n};`
    }
  },
  {
    id: 2,
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    acceptance: '49.2%',
    companies: ['Google', 'Amazon', 'Meta'],
    status: 'Solved',
    timeEst: '15 mins',
    desc: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution.',
    starterCode: {
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        throw new IllegalArgumentException("No two sum solution");\n    }\n}`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            comp = target - num\n            if comp in seen: return [seen[comp], i]\n            seen[num] = i\n        return []`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (seen.count(diff)) return {seen[diff], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};`
    }
  },
  {
    id: 3,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stacks',
    acceptance: '45.3%',
    companies: ['Bloomberg', 'Amazon'],
    status: 'Solved',
    timeEst: '20 mins',
    desc: 'Given a string `s` containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    starterCode: {
      java: `class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        map = {')': '(', '}': '{', ']': '['}\n        for char in s:\n            if char in map:\n                if not stack or stack.pop() != map[char]: return False\n            else: stack.append(char)\n        return not stack`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                if (c == ')' && st.top() != '(') return false;\n                if (c == '}' && st.top() != '{') return false;\n                if (c == ']' && st.top() != '[') return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};`
    }
  },
  {
    id: 4,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Medium',
    topic: 'Linked Lists',
    acceptance: '42.0%',
    companies: ['Microsoft', 'Uber'],
    status: 'Not Solved',
    timeEst: '25 mins',
    desc: 'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list by splicing together the nodes.',
    starterCode: {
      java: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        if (list1 == null) return list2;\n        if (list2 == null) return list1;\n        if (list1.val < list2.val) {\n            list1.next = mergeTwoLists(list1.next, list2);\n            return list1;\n        } else {\n            list2.next = mergeTwoLists(list1, list2.next);\n            return list2;\n        }\n    }\n}`,
      python: `class Solution:\n    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode()\n        curr = dummy\n        while l1 and l2:\n            if l1.val < l2.val: curr.next = l1; l1 = l1.next\n            else: curr.next = l2; l2 = l2.next\n            curr = curr.next\n        curr.next = l1 or l2\n        return dummy.next`,
      cpp: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n        if (!l1) return l2;\n        if (!l2) return l1;\n        if (l1->val < l2->val) { l1->next = mergeTwoLists(l1->next, l2); return l1; }\n        else { l2->next = mergeTwoLists(l1, l2->next); return l2; }\n    }\n};`
    }
  },
  {
    id: 5,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    acceptance: '34.5%',
    companies: ['Meta', 'Amazon', 'Netflix'],
    status: 'Solved',
    timeEst: '30 mins',
    desc: 'Given a string `s`, find the length of the longest substring without repeating characters using an optimal sliding window approach.',
    starterCode: {
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int[] chars = new int[128];\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            char r = s.charAt(right);\n            chars[r]++;\n            while (chars[r] > 1) {\n                char l = s.charAt(left);\n                chars[l]--;\n                left++;\n            }\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        char_set = set()\n        l = res = 0\n        for r in range(len(s)):\n            while s[r] in char_set:\n                char_set.remove(s[l])\n                l += 1\n            char_set.add(s[r])\n            res = max(res, r - l + 1)\n        return res`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        vector<int> dict(256, -1);\n        int maxLen = 0, start = -1;\n        for (int i = 0; i != s.length(); i++) {\n            if (dict[s[i]] > start) start = dict[s[i]];\n            dict[s[i]] = i;\n            maxLen = max(maxLen, i - start);\n        }\n        return maxLen;\n    }\n};`
    }
  },
  {
    id: 6,
    title: 'Climbing Stairs (Dynamic Programming)',
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    acceptance: '52.1%',
    companies: ['Amazon', 'Adobe', 'Apple'],
    status: 'Solved',
    timeEst: '15 mins',
    desc: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    starterCode: {
      java: `class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int temp = a + b;\n            a = b;\n            b = temp;\n        }\n        return b;\n    }\n}`,
      python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2: return n\n        a, b = 1, 2\n        for _ in range(3, n + 1):\n            a, b = b, a + b\n        return b`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; ++i) {\n            int c = a + b;\n            a = b; b = c;\n        }\n        return b;\n    }\n};`
    }
  },
  {
    id: 7,
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topic: 'Trees',
    acceptance: '46.8%',
    companies: ['Microsoft', 'Oracle', 'LinkedIn'],
    status: 'Not Solved',
    timeEst: '25 mins',
    desc: 'Given the `root` of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level) using BFS.',
    starterCode: {
      java: `class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>> res = new ArrayList<>();\n        if (root == null) return res;\n        Queue<TreeNode> q = new LinkedList<>();\n        q.offer(root);\n        while (!q.isEmpty()) {\n            int size = q.size();\n            List<Integer> level = new ArrayList<>();\n            for (int i = 0; i < size; i++) {\n                TreeNode cur = q.poll();\n                level.add(cur.val);\n                if (cur.left != null) q.offer(cur.left);\n                if (cur.right != null) q.offer(cur.right);\n            }\n            res.add(level);\n        }\n        return res;\n    }\n}`,
      python: `class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        if not root: return []\n        q = collections.deque([root])\n        res = []\n        while q:\n            level = []\n            for _ in range(len(q)):\n                node = q.popleft()\n                level.append(node.val)\n                if node.left: q.append(node.left)\n                if node.right: q.append(node.right)\n            res.append(level)\n        return res`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        vector<vector<int>> res;\n        if (!root) return res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> level;\n            while (sz--) {\n                TreeNode* cur = q.front(); q.pop();\n                level.push_back(cur->val);\n                if (cur->left) q.push(cur->left);\n                if (cur->right) q.push(cur->right);\n            }\n            res.push_back(level);\n        }\n        return res;\n    }\n};`
    }
  },
  {
    id: 8,
    title: 'Course Schedule (Cycle in Directed Graph)',
    difficulty: 'Medium',
    topic: 'Graphs',
    acceptance: '41.2%',
    companies: ['Google', 'Twitter', 'Amazon'],
    status: 'Not Solved',
    timeEst: '35 mins',
    desc: 'There are a total of `numCourses` courses you have to take, labeled from 0 to `numCourses - 1`. You are given an array `prerequisites` where prerequisites[i] = [ai, bi] indicates that you must take bi first if you want to take ai. Return true if you can finish all courses.',
    starterCode: {
      java: `class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        int[] inDegree = new int[numCourses];\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            inDegree[p[0]]++;\n        }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);\n        int count = 0;\n        while (!q.isEmpty()) {\n            int cur = q.poll();\n            count++;\n            for (int next : adj.get(cur)) {\n                if (--inDegree[next] == 0) q.offer(next);\n            }\n        }\n        return count == numCourses;\n    }\n}`,
      python: `class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        in_degree = [0] * numCourses\n        adj = collections.defaultdict(list)\n        for dest, src in prerequisites:\n            adj[src].append(dest)\n            in_degree[dest] += 1\n        q = collections.deque([i for i in range(numCourses) if in_degree[i] == 0])\n        visited = 0\n        while q:\n            node = q.popleft()\n            visited += 1\n            for nxt in adj[node]:\n                in_degree[nxt] -= 1\n                if in_degree[nxt] == 0: q.append(nxt)\n        return visited == numCourses`,
      cpp: `class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<int> inDegree(numCourses, 0);\n        vector<vector<int>> adj(numCourses);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; ++i) if (inDegree[i] == 0) q.push(i);\n        int count = 0;\n        while (!q.empty()) {\n            int cur = q.front(); q.pop();\n            count++;\n            for (int nxt : adj[cur]) {\n                if (--inDegree[nxt] == 0) q.push(nxt);\n            }\n        }\n        return count == numCourses;\n    }\n};`
    }
  }
];

// Technical Interview Preparation Questions Dataset
const interviewQuestions = {
  'Java': [
    {
      q: 'Explain the internal working of HashMap in Java. How is collision resolved in Java 8?',
      difficulty: 'Medium',
      frequency: 'Asked by Google, Amazon, Microsoft',
      answer: 'A HashMap in Java operates on the principle of hashing. It uses an internal array of Node<K,V> objects where each node stores the key, value, hash code, and reference to the next node. When `put(key, value)` is called, hashCode() is calculated, hashed, and mapped to an index. If multiple keys hash to the same bucket, a linked list is formed. In Java 8+, once the number of items in a bucket exceeds the threshold `TREEIFY_THRESHOLD = 8` and total capacity >= 64, the linked list is converted into a Red-Black Tree (O(log n) lookup instead of O(n)).',
      keyPoints: ['Bucket indexing: index = (n - 1) & hash', 'equals() and hashCode() contract must be maintained', 'Java 8 converts linked list to balanced Red-Black tree after 8 elements']
    },
    {
      q: 'What is the difference between String, StringBuilder, and StringBuffer?',
      difficulty: 'Easy',
      frequency: 'Asked by TCS, Infosys, Wipro, Cognizant',
      answer: '`String` is immutable; any modification creates a new object in the String Constant Pool or Heap. `StringBuilder` is mutable and not thread-safe, making it significantly faster for single-threaded string concatenation. `StringBuffer` is mutable and thread-safe because its methods are synchronized, introducing synchronization overhead.',
      keyPoints: ['String: Immutable', 'StringBuilder: Mutable, not synchronized (Fastest)', 'StringBuffer: Mutable, synchronized (Thread-safe)']
    },
    {
      q: 'Explain Garbage Collection and the generational hypothesis in the JVM.',
      difficulty: 'Hard',
      frequency: 'Asked by Goldman Sachs, Morgan Stanley, Atlassian',
      answer: 'The JVM heap is split into Young Generation (Eden, Survivor 0, Survivor 1) and Old Generation (Tenured). Most objects die young (generational hypothesis). Minor GC collects unreachable objects in Eden and copies survivors to survivor spaces. After surviving multiple GC cycles (default threshold 15), objects are promoted to the Old Generation. Major GC / Full GC collects the Old Generation using algorithms like G1 GC or ZGC.',
      keyPoints: ['Generational hypothesis: Most objects die shortly after creation', 'Stop-the-World pauses during certain phases', 'G1 GC partitions heap into equal-sized regions']
    }
  ],
  'OOP': [
    {
      q: 'Explain SOLID design principles with concise real-world examples.',
      difficulty: 'Medium',
      frequency: 'Asked by Microsoft, Uber, PhonePe',
      answer: 'S - Single Responsibility: A class should have only one reason to change. O - Open/Closed: Open for extension, closed for modification. L - Liskov Substitution: Subtypes must be substitutable for their base types without altering correctness. I - Interface Segregation: Clients should not be forced to depend on interfaces they do not use. D - Dependency Inversion: Depend on abstractions rather than concrete implementations.',
      keyPoints: ['Single Responsibility Principle', 'Open-Closed Principle', 'Liskov Substitution Principle', 'Interface Segregation Principle', 'Dependency Inversion Principle']
    }
  ],
  'DBMS': [
    {
      q: 'What are ACID properties in relational databases and how does isolation level affect transactions?',
      difficulty: 'Medium',
      frequency: 'Asked by Amazon, Oracle, Adobe',
      answer: 'Atomicity: All operations succeed or all roll back. Consistency: DB transitions from one valid state to another. Isolation: Concurrent transactions do not interfere. Durability: Committed data survives system crashes. Isolation levels range from Read Uncommitted (dirty reads possible), Read Committed (phantom reads possible), Repeatable Read (lost updates prevented), to Serializable (strict ordering).',
      keyPoints: ['Atomicity via WAL (Write-Ahead Logging)', 'Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable', 'MVCC (Multi-Version Concurrency Control)']
    }
  ],
  'Operating Systems': [
    {
      q: 'What is the difference between a Process and a Thread? How does Context Switching work?',
      difficulty: 'Easy',
      frequency: 'Asked by Qualcomm, Intel, Cisco',
      answer: 'A Process is an executing program with its own dedicated memory space (code, data, heap, stack, PCB). A Thread is a lightweight unit of execution within a process that shares code and heap memory. Context switching between threads of the same process is faster because memory address space mapping does not need to be flushed.',
      keyPoints: ['Process has independent virtual memory space', 'Threads share heap and global variables', 'Context switch requires saving CPU registers and program counter']
    }
  ],
  'System Design': [
    {
      q: 'How would you design a distributed URL Shortener (like TinyURL or Bitly)?',
      difficulty: 'Hard',
      frequency: 'Asked by Google, Meta, Amazon',
      answer: 'Functional requirements: Generate unique short alias (6-7 chars); redirect with low latency (<10ms). Non-functional: 100M URLs/month, high availability (99.99%). Solution: Base62 encoding of 64-bit integer IDs allocated by distributed counter (Snowflake/ZooKeeper). Redis cluster for caching popular redirects; partitioned NoSQL/RDBMS for persistent key-value lookup.',
      keyPoints: ['Base62 encoding of unique auto-incremented token IDs', 'Redis caching layer for sub-10ms redirection', 'Rate limiting and database sharding by hash(short_key)']
    }
  ]
};

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeatmap();
  renderDsaTable();
  initGoals();
  initQuestionViewer();
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Sidebar-Driven Application Navigation
function initNavigation() {
  const navItems = document.querySelectorAll('[data-view-target]');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view-target');
      switchView(targetView);
    });
  });
}

function switchView(viewId) {
  state.currentView = viewId;

  // Hide all view containers
  const views = document.querySelectorAll('.cm-view-container');
  views.forEach(v => {
    v.classList.add('hidden');
    v.classList.remove('active-view');
  });

  // Display target view container
  const target = document.getElementById(`view-${viewId}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active-view');
  }

  // Update sidebar active item
  document.querySelectorAll('.cm-nav-item').forEach(nav => {
    if (nav.getAttribute('data-view-target') === viewId) {
      nav.classList.add('active');
    } else {
      nav.classList.remove('active');
    }
  });

  // Update top application breadcrumb
  const breadcrumbEl = document.getElementById('top-breadcrumb-title');
  if (breadcrumbEl) {
    const titles = {
      'dashboard': 'Student Dashboard',
      'learning-paths': 'Learning Paths',
      'resources': 'Courses & Resources',
      'dsa': 'DSA Practice Hub',
      'interview-prep': 'Interview Preparation',
      'coding-challenges': 'Coding Challenges',
      'projects': 'Real-World Projects',
      'analytics': 'Progress & Analytics',
      'bookmarks': 'My Bookmarks & Saved Topics',
      'profile': 'Student Profile & Portfolio',
      'settings': 'Account & Preferences',
      'landing': 'Public SaaS Platform',
      'auth': 'Sign In & Registration Portal',
      'course-detail': 'Course Curriculum & Detail',
      'lesson-detail': 'Interactive Lesson Experience',
      'resource-detail': 'Curated Resource & Reference'
    };
    breadcrumbEl.textContent = titles[viewId] || 'CodeMentor Hub';
  }

  // Auto-close mobile sidebar if open
  closeMobileSidebar();

  // Scroll ONLY the main content container to top
  const mainContent = document.getElementById('main-content-scroll');
  if (mainContent) {
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Re-initialize icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

window.toggleMobileSidebar = function() {
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.toggle('mobile-open');
  if (backdrop) backdrop.classList.toggle('active');
};

window.closeMobileSidebar = function() {
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (backdrop) backdrop.classList.remove('active');
};

window.switchAuthTab = function(tab) {
  const signinForm = document.getElementById('auth-signin-form');
  const registerForm = document.getElementById('auth-register-form');
  const tabSignin = document.getElementById('tab-btn-signin');
  const tabRegister = document.getElementById('tab-btn-register');
  if (!signinForm || !registerForm) return;

  if (tab === 'signin') {
    signinForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    if (tabSignin) {
      tabSignin.classList.add('bg-[#1B2822]', 'text-[#77D0B8]', 'border-[#2B6555]');
      tabSignin.classList.remove('text-[#75857B]', 'border-transparent');
    }
    if (tabRegister) {
      tabRegister.classList.remove('bg-[#1B2822]', 'text-[#77D0B8]', 'border-[#2B6555]');
      tabRegister.classList.add('text-[#75857B]', 'border-transparent');
    }
  } else {
    signinForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    if (tabRegister) {
      tabRegister.classList.add('bg-[#1B2822]', 'text-[#77D0B8]', 'border-[#2B6555]');
      tabRegister.classList.remove('text-[#75857B]', 'border-transparent');
    }
    if (tabSignin) {
      tabSignin.classList.remove('bg-[#1B2822]', 'text-[#77D0B8]', 'border-[#2B6555]');
      tabSignin.classList.add('text-[#75857B]', 'border-transparent');
    }
  }
};

// ==========================================================================
// FULL-WIDTH GITHUB-STYLE LEARNING ACTIVITY HEATMAP ENGINE
// 52 Weekly Columns x 7 Weekday Rows • Month Alignment • Rich Tooltips
// ==========================================================================

let currentHeatmapRange = 'Last 12 Months';

function initHeatmap() {
  renderHeatmap();
}

window.setHeatmapRange = function(range, btnEl) {
  currentHeatmapRange = range;
  document.querySelectorAll('.heatmap-range-btn').forEach(btn => {
    btn.classList.remove('bg-[#1B2822]', 'text-[#77D0B8]', 'border-[#2B6555]');
    btn.classList.add('text-[#75857B]', 'border-transparent');
  });
  if (btnEl) {
    btnEl.classList.add('bg-[#1B2822]', 'text-[#77D0B8]', 'border-[#2B6555]');
    btnEl.classList.remove('text-[#75857B]', 'border-transparent');
  }
  renderHeatmap();
  showToast(`Switched activity view to ${range}`);
};

function renderHeatmap() {
  const gridContainer = document.getElementById('dashboard-heatmap');
  const monthsContainer = document.getElementById('heatmap-months-row');
  const totalCountEl = document.getElementById('heatmap-total-contributions');
  if (!gridContainer || !monthsContainer) return;

  gridContainer.innerHTML = '';
  monthsContainer.innerHTML = '';

  const weeks = 52;
  const daysPerWeek = 7;
  const totalDays = weeks * daysPerWeek; // 364 days
  const shades = ['var(--cm-heat-0)', 'var(--cm-heat-1)', 'var(--cm-heat-2)', 'var(--cm-heat-3)', 'var(--cm-heat-4)'];

  // Tooltip element
  let tooltip = document.getElementById('heatmap-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'heatmap-tooltip';
    tooltip.className = 'hidden';
    document.body.appendChild(tooltip);
  }

  // End Date calculation based on range selection
  let endDate = new Date(2026, 10, 1); // Baseline: Nov 1, 2026
  if (currentHeatmapRange === '2025') {
    endDate = new Date(2025, 11, 31);
  } else if (currentHeatmapRange === '2026') {
    endDate = new Date(2026, 10, 1);
  }

  // Calculate start date (363 days before end date)
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (totalDays - 1));

  let totalContributions = 0;
  let lastRecordedMonth = -1;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Build 52 weekly columns
  for (let w = 0; w < weeks; w++) {
    // Dynamic month label: place at column where month transitions
    const midWeekDate = new Date(startDate);
    midWeekDate.setDate(midWeekDate.getDate() + (w * 7 + 3));
    const m = midWeekDate.getMonth();

    if (m !== lastRecordedMonth) {
      lastRecordedMonth = m;
      const monthLabel = document.createElement('span');
      monthLabel.textContent = monthNames[m];
      monthLabel.style.gridColumn = `${w + 1}`;
      monthsContainer.appendChild(monthLabel);
    }

    // 7 Days per week (Sun to Sat)
    for (let d = 0; d < 7; d++) {
      const dayOffset = w * 7 + d;
      const cellDate = new Date(startDate);
      cellDate.setDate(cellDate.getDate() + dayOffset);

      const cell = document.createElement('div');
      cell.className = 'activity-cell';

      // Deterministic pseudo-randomness based on date
      const dateNum = cellDate.getFullYear() * 10000 + (cellDate.getMonth() + 1) * 100 + cellDate.getDate();
      const pseudoRand = Math.sin(dateNum * 997.13) * 10000;
      const r = pseudoRand - Math.floor(pseudoRand);

      const daysDiffFromEnd = Math.floor((endDate - cellDate) / (1000 * 60 * 60 * 24));
      let level = 0;

      // Active streak over last 18 days
      if (currentHeatmapRange !== '2025' && daysDiffFromEnd >= 0 && daysDiffFromEnd < 18) {
        level = (r > 0.6) ? 4 : (r > 0.3) ? 3 : 2;
      } else if (r > 0.72) {
        level = 4;
      } else if (r > 0.52) {
        level = 3;
      } else if (r > 0.35) {
        level = 2;
      } else if (r > 0.20) {
        level = 1;
      } else {
        level = 0;
      }

      // Counts per level
      let problems = 0;
      let lessons = 0;
      let dayTotal = 0;

      if (level === 1) {
        problems = 1;
        lessons = (r > 0.6) ? 1 : 0;
      } else if (level === 2) {
        problems = Math.floor(r * 2) + 2;
        lessons = 1;
      } else if (level === 3) {
        problems = Math.floor(r * 2) + 4;
        lessons = (r > 0.5) ? 2 : 1;
      } else if (level === 4) {
        problems = Math.floor(r * 3) + 6;
        lessons = 2;
      }
      dayTotal = problems + lessons;
      totalContributions += dayTotal;

      cell.style.backgroundColor = shades[level];

      const fullDateStr = cellDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      // Hover interaction for tooltip
      cell.addEventListener('mouseenter', (e) => {
        if (dayTotal === 0) {
          tooltip.innerHTML = `
            <div class="text-[#75857B] text-[10px] font-mono">${fullDateStr}</div>
            <div class="text-[#F1F5F2] font-medium mt-0.5">No learning activity</div>
          `;
        } else {
          tooltip.innerHTML = `
            <div class="text-[#75857B] text-[10px] font-mono">${fullDateStr}</div>
            <div class="text-[#77D0B8] font-semibold text-xs mt-0.5">${dayTotal} learning contribution${dayTotal > 1 ? 's' : ''}</div>
            <div class="text-[#A8B5AD] text-[10px] mt-0.5 flex items-center gap-1.5 font-mono">
              <span>${problems} problem${problems > 1 ? 's' : ''} solved</span>
              <span>•</span>
              <span>${lessons} lesson${lessons > 1 ? 's' : ''}</span>
            </div>
          `;
        }
        tooltip.classList.remove('hidden');
        positionTooltip(e);
      });

      cell.addEventListener('mousemove', (e) => {
        positionTooltip(e);
      });

      cell.addEventListener('mouseleave', () => {
        tooltip.classList.add('hidden');
      });

      gridContainer.appendChild(cell);
    }
  }

  // Update total counter in header
  if (totalCountEl) {
    totalCountEl.textContent = totalContributions.toLocaleString();
  }
}

function positionTooltip(e) {
  const tooltip = document.getElementById('heatmap-tooltip');
  if (!tooltip) return;
  const padding = 12;
  let x = e.clientX + padding;
  let y = e.clientY - 46;

  const tooltipWidth = tooltip.offsetWidth || 180;
  if (x + tooltipWidth > window.innerWidth - 12) {
    x = e.clientX - tooltipWidth - padding;
  }
  if (y < 10) {
    y = e.clientY + 22;
  }

  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}

// Goals Checklist Logic
function initGoals() {
  renderGoals();
}

function renderGoals() {
  const goalsContainer = document.getElementById('goals-list-container');
  if (!goalsContainer) return;

  const completedCount = state.goals.filter(g => g.done).length;
  const counterBadge = document.getElementById('goals-count-badge');
  if (counterBadge) {
    counterBadge.textContent = `${completedCount} of ${state.goals.length} completed`;
  }

  goalsContainer.innerHTML = state.goals.map(goal => `
    <div class="flex items-center justify-between p-2 rounded-lg hover:bg-[#1F2F27] transition-colors cursor-pointer group" onclick="toggleGoal(${goal.id})">
      <div class="flex items-center gap-2.5">
        <div class="w-4 h-4 rounded border ${goal.done ? 'bg-[#63C995] border-[#63C995]' : 'border-[#2A3931] group-hover:border-[#77D0B8]'} flex items-center justify-center transition-all">
          ${goal.done ? '<i data-lucide="check" class="w-3 h-3 text-[#0E1613]"></i>' : ''}
        </div>
        <span class="text-xs ${goal.done ? 'line-through text-[#75857B]' : 'text-[#F1F5F2] font-medium'}">${goal.text}</span>
      </div>
      <span class="text-[11px] font-mono text-[#75857B] bg-[#14201A] px-2 py-0.5 rounded border border-[#223129]">
        ${goal.done ? 'Done' : goal.count}
      </span>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

window.toggleGoal = function(goalId) {
  const goal = state.goals.find(g => g.id === goalId);
  if (goal) {
    goal.done = !goal.done;
    renderGoals();
    showToast(goal.done ? `Goal completed: ${goal.text} 🎯` : 'Goal updated');
  }
};

// DSA Practice Hub Table & Filtering
function renderDsaTable() {
  const tableBody = document.getElementById('dsa-table-body');
  if (!tableBody) return;

  const filtered = dsaProblems.filter(p => {
    const matchesTopic = state.dsaFilter === 'All Problems' || p.topic.toLowerCase() === state.dsaFilter.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(state.dsaSearch.toLowerCase()) ||
                          p.topic.toLowerCase().includes(state.dsaSearch.toLowerCase()) ||
                          p.companies.some(c => c.toLowerCase().includes(state.dsaSearch.toLowerCase()));
    const matchesDiff = state.dsaDifficulty === 'All' || p.difficulty === state.dsaDifficulty;
    return matchesTopic && matchesSearch && matchesDiff;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-10 text-[#75857B]">
          No problems found matching current search filters.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(p => `
    <tr class="hover:bg-[#1E2D27] transition-colors cursor-pointer group" onclick="openProblemModal(${p.id})">
      <td class="w-10 text-center">
        ${p.status === 'Solved' 
          ? '<i data-lucide="check-circle-2" class="w-4 h-4 text-[#63C995] mx-auto inline"></i>'
          : '<div class="w-3.5 h-3.5 rounded-full border border-[#46554C] mx-auto"></div>'}
      </td>
      <td class="font-medium text-[14px] text-[#F1F5F2] group-hover:text-[#77D0B8] transition-colors">
        ${p.id}. ${p.title}
      </td>
      <td>
        <span class="cm-badge ${p.difficulty === 'Easy' ? 'cm-badge-easy' : p.difficulty === 'Medium' ? 'cm-badge-medium' : 'cm-badge-hard'}">
          ${p.difficulty}
        </span>
      </td>
      <td>
        <span class="text-xs px-2.5 py-1 rounded bg-[#14201A] border border-[#223129] text-[#A8B5AD] font-mono">
          ${p.topic}
        </span>
      </td>
      <td class="font-mono text-xs text-[#A8B5AD]">${p.acceptance}</td>
      <td>
        <div class="flex gap-1.5 flex-wrap">
          ${p.companies.slice(0, 2).map(c => `
            <span class="text-xs font-mono bg-[#14201A] text-[#75857B] px-2 py-0.5 rounded border border-[#223129]">
              ${c}
            </span>
          `).join('')}
          ${p.companies.length > 2 ? `<span class="text-xs font-mono text-[#75857B]">+${p.companies.length - 2}</span>` : ''}
        </div>
      </td>
      <td class="text-right">
        <button class="w-8 h-8 rounded-md bg-[#1B2822] hover:bg-[#77D0B8] text-[#A8B5AD] hover:text-[#0E1613] inline-flex items-center justify-center transition-all border border-[#2A3931]">
          <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
        </button>
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

window.filterDsaTopic = function(topic, btnEl) {
  state.dsaFilter = topic;
  document.querySelectorAll('.cm-filter-chip').forEach(btn => btn.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderDsaTable();
};

window.handleDsaSearch = function(val) {
  state.dsaSearch = val;
  renderDsaTable();
};

window.handleDsaDifficulty = function(val) {
  state.dsaDifficulty = val;
  renderDsaTable();
};

// Dedicated Full-Screen Coding Workspace Modal
window.openProblemModal = function(problemId) {
  const problem = dsaProblems.find(p => p.id === problemId) || dsaProblems[0];
  state.selectedProblem = problem;

  const modal = document.getElementById('problem-ide-modal');
  if (!modal) return;

  document.getElementById('ide-problem-title').textContent = `${problem.id}. ${problem.title}`;
  document.getElementById('ide-problem-desc').innerHTML = `
    <p class="mb-4 text-xs text-[#A8B5AD] leading-relaxed">${problem.desc}</p>
    <div class="p-3 rounded-lg bg-[#14201A] border border-[#223129] mb-4 space-y-1">
      <div class="text-[11px] font-bold text-[#77D0B8] uppercase tracking-wider">Example 1:</div>
      <div class="font-mono text-xs text-[#A8B5AD]">
        Input: nums = [3,0,1]<br>
        Output: 2<br>
        Explanation: n = 3 since there are 3 numbers. 2 is missing in range [0, 3].
      </div>
    </div>
    <div class="p-2.5 rounded-lg bg-[#14201A] border border-[#223129] text-xs text-[#75857B]">
      <strong class="text-[#F1F5F2]">Constraints:</strong> n == nums.length, 1 &lt;= n &lt;= 10<sup>4</sup>, 0 &lt;= nums[i] &lt;= n
    </div>
  `;

  document.getElementById('ide-problem-diff-badge').className = `cm-badge ${problem.difficulty === 'Easy' ? 'cm-badge-easy' : problem.difficulty === 'Medium' ? 'cm-badge-medium' : 'cm-badge-hard'}`;
  document.getElementById('ide-problem-diff-badge').textContent = problem.difficulty;

  updateIdeCode();

  document.getElementById('ide-console-output').innerHTML = `
    <span class="text-[#75857B]">Ready. Click "Run Code" or "Submit Solution" to test against test cases.</span>
  `;

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
};

window.closeProblemModal = function() {
  const modal = document.getElementById('problem-ide-modal');
  if (modal) modal.classList.add('hidden');
};

window.changeIdeLanguage = function(lang) {
  state.activeLanguage = lang;
  updateIdeCode();
};

function updateIdeCode() {
  const textarea = document.getElementById('ide-code-editor');
  if (!textarea || !state.selectedProblem) return;
  textarea.value = state.selectedProblem.starterCode[state.activeLanguage] || '// Write your solution here...';
  updateLineNumbers();
}

function updateLineNumbers() {
  const textarea = document.getElementById('ide-code-editor');
  const gutter = document.getElementById('ide-gutter');
  if (!textarea || !gutter) return;

  const lines = textarea.value.split('\n').length;
  let gutterHtml = '';
  for (let i = 1; i <= Math.max(lines, 16); i++) {
    gutterHtml += `<div>${i}</div>`;
  }
  gutter.innerHTML = gutterHtml;
}

window.runIdeCode = function() {
  const consoleEl = document.getElementById('ide-console-output');
  if (!consoleEl) return;

  consoleEl.innerHTML = `<span class="text-[#83C9C5] animate-pulse">⚡ Compiling and executing test cases...</span>`;

  setTimeout(() => {
    consoleEl.innerHTML = `
      <div class="text-[#63C995] font-semibold flex items-center gap-2 mb-2">
        <i data-lucide="check-circle" class="w-4 h-4 inline"></i> All Test Cases Passed (3/3)
      </div>
      <div class="font-mono text-xs text-[#A8B5AD] space-y-1">
        <div>Case 1: nums = [3,0,1]           👉 <span class="text-[#63C995]">Passed (Output: 2)</span></div>
        <div>Case 2: nums = [0,1]             👉 <span class="text-[#63C995]">Passed (Output: 2)</span></div>
        <div>Case 3: nums = [9,6,4,2,3,5,7,0,1] 👉 <span class="text-[#63C995]">Passed (Output: 8)</span></div>
        <div class="pt-2 text-[#75857B]">Execution time: 0.8 ms | Memory: 41.2 MB</div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    showToast('Code executed: All test cases passed! 🎉');
  }, 400);
};

window.submitIdeCode = function() {
  const consoleEl = document.getElementById('ide-console-output');
  if (!consoleEl) return;

  consoleEl.innerHTML = `<span class="text-[#77D0B8] animate-pulse">🚀 Running official placement benchmark suite (54/54 test cases)...</span>`;

  setTimeout(() => {
    if (state.selectedProblem) {
      state.selectedProblem.status = 'Solved';
      renderDsaTable();
    }
    consoleEl.innerHTML = `
      <div class="p-3 rounded-lg bg-[#182B21] border border-[#2B6555]">
        <div class="text-[#63C995] text-sm font-bold flex items-center gap-2 mb-1">
          <i data-lucide="trophy" class="w-4 h-4"></i> Accepted!
        </div>
        <div class="text-xs text-[#F1F5F2]">
          Congratulations Sweta! Your solution passed all test cases.
        </div>
        <div class="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#223129] font-mono text-xs">
          <div>Runtime: <strong class="text-[#77D0B8]">0 ms</strong> (Top 100%)</div>
          <div>Memory: <strong class="text-[#77D0B8]">40.9 MB</strong> (Optimal O(1) space)</div>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    showToast('Accepted! +50 XP and streak maintained 🔥');
  }, 650);
};

// Learning Path Detailed Roadmap Modal
window.openRoadmapModal = function(pathName) {
  const modal = document.getElementById('roadmap-detail-modal');
  if (!modal) return;
  document.getElementById('roadmap-path-title').textContent = pathName;
  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
};

window.closeRoadmapModal = function() {
  const modal = document.getElementById('roadmap-detail-modal');
  if (modal) modal.classList.add('hidden');
};

// Project Detailed Specifications Modal
window.openProjectModal = function(projectName, difficulty, duration) {
  const modal = document.getElementById('project-detail-modal');
  if (!modal) return;
  document.getElementById('project-modal-title').textContent = projectName;
  document.getElementById('project-modal-diff').textContent = difficulty;
  document.getElementById('project-modal-duration').textContent = duration;
  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-detail-modal');
  if (modal) modal.classList.add('hidden');
};

// Technical Interview Question Viewer
function initQuestionViewer() {
  renderInterviewQuestion();
}

window.selectInterviewTopic = function(topic) {
  state.activeInterviewTopic = topic;
  state.currentQuestionIndex = 0;
  renderInterviewQuestion();
  showToast(`Switched topic to ${topic}`);
};

function renderInterviewQuestion() {
  const container = document.getElementById('interview-question-container');
  if (!container) return;

  const questions = interviewQuestions[state.activeInterviewTopic] || interviewQuestions['Java'];
  const q = questions[state.currentQuestionIndex % questions.length];

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-[#184D3F]">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#D6A94F]/15 border border-[#D6A94F] text-[#E7C77E]">${state.activeInterviewTopic}</span>
          <span class="cm-badge ${q.difficulty === 'Easy' ? 'cm-badge-easy' : q.difficulty === 'Medium' ? 'cm-badge-medium' : 'cm-badge-hard'}">${q.difficulty}</span>
        </div>
        <span class="text-xs text-[#82958A] font-mono">${state.currentQuestionIndex + 1} of ${questions.length} questions</span>
      </div>

      <div>
        <h3 class="text-xl font-serif font-bold text-[#F7F2E7] leading-snug">${q.q}</h3>
        <p class="text-[12.5px] text-[#D6A94F] mt-1 font-mono">${q.frequency}</p>
      </div>

      <div class="pt-1">
        <button onclick="toggleAnswerExplanation()" class="cm-btn-secondary text-xs h-9 px-4">
          <i data-lucide="eye" class="w-4 h-4"></i> <span id="answer-toggle-text">Reveal Comprehensive Answer</span>
        </button>
      </div>

      <!-- Warm Ivory Answer Card (Contrast Focus) -->
      <div id="answer-explanation-box" class="hidden p-5 rounded-xl bg-[#F7F2E7] text-[#18251F] border border-[#E6D5B7] shadow-md space-y-3.5">
        <div class="text-[14px] text-[#18251F] leading-relaxed font-sans">${q.answer}</div>
        <div class="pt-3 border-t border-[#E6D5B7]">
          <div class="text-xs font-mono font-bold text-[#075B45] uppercase tracking-wider mb-2">Key Concepts to Mention:</div>
          <ul class="list-disc list-inside space-y-1.5 text-xs text-[#4A6356]">
            ${q.keyPoints.map(kp => `<li class="font-medium">${kp}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="flex items-center justify-between pt-3.5 border-t border-[#184D3F]">
        <button onclick="showToast('Marked as mastered! ✅')" class="cm-btn-secondary text-xs h-8 px-3">
          <i data-lucide="check" class="w-3.5 h-3.5 text-[#D6A94F]"></i> Mark as Mastered
        </button>
        <button onclick="nextInterviewQuestion()" class="cm-btn-primary text-xs h-8 px-4">
          <span>Next Question</span> <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

window.toggleAnswerExplanation = function() {
  const box = document.getElementById('answer-explanation-box');
  const btnText = document.getElementById('answer-toggle-text');
  if (!box) return;

  if (box.classList.contains('hidden')) {
    box.classList.remove('hidden');
    if (btnText) btnText.textContent = 'Hide Answer';
  } else {
    box.classList.add('hidden');
    if (btnText) btnText.textContent = 'Reveal Comprehensive Answer';
  }
};

window.nextInterviewQuestion = function() {
  const questions = interviewQuestions[state.activeInterviewTopic] || interviewQuestions['Java'];
  state.currentQuestionIndex = (state.currentQuestionIndex + 1) % questions.length;
  renderInterviewQuestion();
};

// Bookmarking Toggle
window.toggleBookmark = function(resourceId, btnEl) {
  if (state.bookmarkedResources.has(resourceId)) {
    state.bookmarkedResources.delete(resourceId);
    showToast('Bookmark removed');
    btnEl.classList.remove('text-[#77D0B8]');
    btnEl.classList.add('text-[#75857B]');
  } else {
    state.bookmarkedResources.add(resourceId);
    showToast('Resource bookmarked! 📌');
    btnEl.classList.add('text-[#77D0B8]');
    btnEl.classList.remove('text-[#75857B]');
  }
};

// Toast Notifications
function showToast(message) {
  let toast = document.getElementById('cm-toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cm-toast-notification';
    toast.className = 'fixed bottom-5 right-5 z-50 bg-[#16251E] text-[#F1F5F2] px-3.5 py-2 rounded-lg border border-[#2B6555] shadow-lg flex items-center gap-2.5 text-xs font-medium transform transition-all duration-200 translate-y-10 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i data-lucide="sparkles" class="w-3.5 h-3.5 text-[#77D0B8]"></i> <span>${message}</span>`;
  if (window.lucide) lucide.createIcons();

  toast.classList.remove('translate-y-10', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 2400);
}

// ==========================================================================
// COURSE DETAIL & CURRICULUM DATASET
// ==========================================================================
const coursesData = {
  'java-backend': {
    id: 'java-backend',
    title: 'Java Backend & Microservices Architecture',
    tagline: 'Master Java 17, Spring Boot 3, Hibernate ORM, PostgreSQL, Kafka & Distributed Architectures',
    intro: 'An enterprise-grade curriculum designed to take computer science students from core object-oriented principles to building scalable, production-ready microservices capable of handling millions of concurrent requests.',
    level: 'Intermediate to Advanced',
    duration: '5 Months • 38 Modules • 140 Lessons',
    modulesCount: 38,
    lessonsCount: 140,
    progress: 60,
    tags: ['Java 17', 'Spring Boot 3', 'Spring Security', 'Hibernate 6', 'PostgreSQL', 'Apache Kafka', 'Docker', 'JUnit 5'],
    outcomes: [
      'JVM Architecture, Memory Model, Garbage Collection tuning (G1, ZGC) & JIT compilation internals',
      'Modern Java 17 features: Records, Pattern Matching, Sealed Classes, and Virtual Threads (Project Loom)',
      'Spring Boot 3 ecosystem: IoC Container, Dependency Injection, Auto-configuration & Starters',
      'Production REST APIs with Spring Security 6, Stateless JWT filters, and OAuth2 authorization',
      'Relational schema design, PostgreSQL indexing, ACID transaction isolation & JPA/Hibernate 6',
      'Event-driven architecture with Apache Kafka clusters, consumer groups, offsets & idempotent producers',
      'Microservice resilience patterns: Circuit Breakers (Resilience4j), Rate Limiting & Distributed Tracing',
      'Test-Driven Development (TDD) using JUnit 5, Mockito and real database integration with Testcontainers'
    ],
    modules: [
      {
        id: 'm1',
        num: 1,
        title: 'Java Core & Modern JVM Internals',
        desc: 'Generics, Collections Framework, Multithreading, Memory Model, and Stream APIs.',
        lessonsCount: 8,
        duration: '14 hours',
        status: 'Completed',
        lessons: [
          { id: 'l1', title: 'JVM Architecture: ClassLoader, Memory Areas & JIT Compiler', duration: '45 mins', completed: true },
          { id: 'l2', title: 'Java Memory Model: Heap, Stack, Metaspace & GC Algorithms', duration: '55 mins', completed: true },
          { id: 'l3', title: 'Deep Dive into Collections: HashMap collision resolution (Red-Black Trees)', duration: '60 mins', completed: true },
          { id: 'l4', title: 'Concurrency Utilities: ExecutorService, CompletableFuture & Synchronization', duration: '75 mins', completed: true }
        ]
      },
      {
        id: 'm2',
        num: 2,
        title: 'Advanced Object-Oriented Design & GoF Patterns',
        desc: 'SOLID principles, Factory, Singleton, Strategy, Observer, and Decorator patterns in enterprise Java.',
        lessonsCount: 10,
        duration: '18 hours',
        status: 'Completed',
        lessons: [
          { id: 'l5', title: 'SOLID Principles in Enterprise Software Engineering', duration: '50 mins', completed: true },
          { id: 'l6', title: 'Creational Patterns: Factory, Builder & Thread-Safe Singleton', duration: '65 mins', completed: true },
          { id: 'l7', title: 'Behavioral Patterns: Strategy, Observer & Chain of Responsibility', duration: '70 mins', completed: true }
        ]
      },
      {
        id: 'm3',
        num: 3,
        title: 'Relational Databases, PostgreSQL & Hibernate ORM',
        desc: 'PostgreSQL normalization, indexing, ACID transactions, and JPA entity relationship mappings.',
        lessonsCount: 12,
        duration: '22 hours',
        status: 'In Progress',
        lessons: [
          { id: 'l8', title: 'Database Indexing: B-Tree internals, Composite Indexes & Query Plans', duration: '60 mins', completed: true },
          { id: 'l9', title: 'JPA Entity Lifecycle: Transient, Managed, Detached & Removed states', duration: '55 mins', completed: true },
          { id: 'l10', title: 'Entity Mappings: @OneToMany, @ManyToMany with JoinTables & Cascade types', duration: '70 mins', completed: true },
          {
            id: 'l24',
            title: 'JWT Filter Chains & Stateless Security Architecture',
            duration: '65 mins',
            completed: false,
            isCurrent: true,
            objectives: [
              'Understand stateless session management in distributed REST APIs without server-side state',
              'Implement OncePerRequestFilter to intercept incoming HTTP authorization headers',
              'Extract, validate, and parse cryptographic JWT claims using RSA public keys',
              'Populate Spring Security\'s SecurityContextHolder with the authenticated Student Principal'
            ],
            explanation: 'In monolithic applications, authentication state was typically stored in server memory via HttpSession. However, in modern distributed microservice clusters, stateful sessions break horizontal autoscaling because incoming requests can be routed by the load balancer to any server instance.\n\nStateless JWT authentication solves this: upon successful login, the authentication server signs a compact, cryptographically verifiable token containing claims (subject, authorities, expiry). Every subsequent client request supplies this token in the Authorization: Bearer <token> header. A custom Spring Security filter intercepts the request, verifies the signature using public-key cryptography without querying the database, and establishes user identity for the lifecycle of that request thread.',
            codeSnippet: `@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenService jwtTokenService, CustomUserDetailsService userDetailsService) {
        this.jwtTokenService = jwtTokenService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        final String userEmail = jwtTokenService.extractUsername(jwt);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            
            if (jwtTokenService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Establish user in current thread's SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}`,
            takeaways: [
              'Always extend OncePerRequestFilter to guarantee that authentication logic runs strictly once per request dispatch cycle.',
              'Never store sensitive credentials (passwords, PII) inside the JWT payload since base64url is easily decoded.',
              'Combine short-lived Access Tokens (15 minutes) with Refresh Tokens stored in HTTP-Only, Secure cookies.',
              'Thread local security contexts are cleaned up automatically at the end of the request filter chain.'
            ]
          },
          { id: 'l11', title: 'Solving the N+1 Query Problem with JOIN FETCH & EntityGraphs', duration: '50 mins', completed: false }
        ]
      },
      {
        id: 'm4',
        num: 4,
        title: 'Spring Boot 3 & RESTful API Engineering',
        desc: 'Dependency injection, Global Exception Handling, DTOs, Bean Validation and OpenAPI 3.',
        lessonsCount: 14,
        duration: '26 hours',
        status: 'In Progress',
        lessons: [
          { id: 'l12', title: 'Spring Bean Scopes: Singleton, Prototype, Request & Thread Safety', duration: '45 mins', completed: false },
          { id: 'l13', title: 'REST Best Practices: Idempotency, HTTP Status Codes & ErrorDTOs', duration: '60 mins', completed: false },
          { id: 'l14', title: 'Spring Validation with @Valid, @NotNull & Custom Constraints', duration: '50 mins', completed: false }
        ]
      },
      {
        id: 'm5',
        num: 5,
        title: 'Distributed Messaging with Apache Kafka',
        desc: 'Event sourcing, Kafka topics, partitions, consumer groups, serialization, and idempotency.',
        lessonsCount: 16,
        duration: '32 hours',
        status: 'Locked',
        lessons: [
          { id: 'l15', title: 'Kafka Cluster Architecture: Brokers, Zookeeper vs KRaft, Partitions', duration: '60 mins', completed: false },
          { id: 'l16', title: 'Producer Deep Dive: Acks, Retries, Idempotence & Partitioner', duration: '75 mins', completed: false }
        ]
      },
      {
        id: 'm6',
        num: 6,
        title: 'Docker Containerization & Cloud Microservices',
        desc: 'Docker multi-stage builds, Docker Compose, Kubernetes deployments, and CI/CD pipelines.',
        lessonsCount: 8,
        duration: '16 hours',
        status: 'Locked',
        lessons: [
          { id: 'l17', title: 'Multi-Stage Dockerfile Optimization for JVM Applications', duration: '55 mins', completed: false },
          { id: 'l18', title: 'Docker Compose: Orchestrating Spring Boot, PostgreSQL & Kafka', duration: '70 mins', completed: false }
        ]
      }
    ]
  },
  'full-stack': {
    id: 'full-stack',
    title: 'Full Stack Web Developer & Cloud Systems',
    tagline: 'Modern TypeScript, React 19, Next.js App Router, Node.js, PostgreSQL and Docker',
    intro: 'A complete end-to-end curriculum designed to transform students into job-ready full stack engineers proficient in building reactive interfaces and scalable backend services.',
    level: 'Beginner to Advanced',
    duration: '6 Months • 42 Modules • 160 Lessons',
    modulesCount: 42,
    lessonsCount: 160,
    progress: 35,
    tags: ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS'],
    outcomes: [
      'Full-stack architecture: client-side hydration, server components, and streaming HTTP',
      'React 19 compiler, Server Actions, optimistic UI updates and custom hooks',
      'Strict TypeScript development: interfaces, generics, discriminated unions and type guards',
      'Node.js asynchronous event loop, streams, worker threads and Express middleware',
      'Relational modeling in PostgreSQL, database indexing and Prisma ORM migrations',
      'Container packaging with Docker, multi-container compose, and AWS cloud deployment'
    ],
    modules: [
      {
        id: 'fs-m1',
        num: 1,
        title: 'Modern JavaScript & TypeScript Essentials',
        desc: 'ES6+, Event Loop, Promises, Async/Await and TypeScript Generics.',
        lessonsCount: 10,
        duration: '16 hours',
        status: 'Completed',
        lessons: [
          { id: 'fs-l1', title: 'JavaScript Execution Context, Call Stack & Event Loop', duration: '45 mins', completed: true },
          { id: 'fs-l2', title: 'TypeScript Generics, Discriminated Unions & Utility Types', duration: '60 mins', completed: true }
        ]
      },
      {
        id: 'fs-m2',
        num: 2,
        title: 'React 19 Architecture & State Management',
        desc: 'Hooks, memoization, Context API, Zustand, and Server Actions.',
        lessonsCount: 12,
        duration: '24 hours',
        status: 'In Progress',
        lessons: [
          { id: 'fs-l3', title: 'React 19 Compiler, Actions and Optimistic Updates', duration: '65 mins', completed: true },
          { id: 'fs-l4', title: 'Scalable Client State Management with Zustand & React Query', duration: '55 mins', completed: false }
        ]
      },
      {
        id: 'fs-m3',
        num: 3,
        title: 'Node.js, Express & Microservice Endpoints',
        desc: 'Building high-throughput RESTful backends and middleware architectures.',
        lessonsCount: 10,
        duration: '20 hours',
        status: 'Locked',
        lessons: []
      },
      {
        id: 'fs-m4',
        num: 4,
        title: 'PostgreSQL & Database Systems with Prisma',
        desc: 'Schema migrations, indexing, and complex relational queries.',
        lessonsCount: 10,
        duration: '18 hours',
        status: 'Locked',
        lessons: []
      }
    ]
  },
  'frontend-architecture': {
    id: 'frontend-architecture',
    title: 'Frontend Architecture & React 19 Performance',
    tagline: 'Design systems, state machines, Webpack/Vite bundlers, and web vitals optimization',
    intro: 'Master high-performance frontend engineering: design systems, micro-frontends, accessibility compliance, and sub-millisecond interaction speeds.',
    level: 'Intermediate',
    duration: '4 Months • 28 Modules • 110 Lessons',
    modulesCount: 28,
    lessonsCount: 110,
    progress: 62,
    tags: ['React 19', 'Tailwind CSS', 'Vite', 'Performance', 'Web Vitals', 'Accessibility'],
    outcomes: [
      'Component architecture, tokens and compound components in production design systems',
      'Core Web Vitals profiling: optimizing LCP, CLS, and Interaction to Next Paint (INP)',
      'Advanced responsive layouts with CSS Grid, Flexbox, Container Queries and hardware animations',
      'Finite State Machines with XState for complex asynchronous form flows',
      'WCAG 2.1 AA accessibility standards and keyboard focus management'
    ],
    modules: [
      {
        id: 'fe-m1',
        num: 1,
        title: 'Modern Design Systems & Atomic Components',
        desc: 'Tokens, compound components, polymorphic components and Tailwind.',
        lessonsCount: 8,
        duration: '14 hours',
        status: 'Completed',
        lessons: [
          { id: 'fe-l1', title: 'Design Tokens & CSS Variables Architecture', duration: '40 mins', completed: true }
        ]
      },
      {
        id: 'fe-m2',
        num: 2,
        title: 'Core Web Vitals & Runtime Performance',
        desc: 'Code splitting, bundle analysis, image optimization and virtualized lists.',
        lessonsCount: 10,
        duration: '18 hours',
        status: 'Completed',
        lessons: [
          { id: 'fe-l2', title: 'INP & LCP Diagnostic Optimization in Chrome DevTools', duration: '50 mins', completed: true }
        ]
      },
      {
        id: 'fe-m3',
        num: 3,
        title: 'Micro-frontends & Module Federation',
        desc: 'Independent deployment of web applications using Vite and Webpack 5.',
        lessonsCount: 10,
        duration: '20 hours',
        status: 'In Progress',
        lessons: [
          { id: 'fe-l3', title: 'Webpack 5 Module Federation Architecture', duration: '60 mins', completed: false }
        ]
      }
    ]
  },
  'dsa-mastery': {
    id: 'dsa-mastery',
    title: 'Data Structures & Algorithms Placement Track',
    tagline: '14 essential coding interview patterns, dynamic programming, and FAANG tactics',
    intro: 'A rigorous pattern-oriented algorithmic curriculum engineered specifically for cracking technical coding rounds at top-tier software companies.',
    level: 'All Levels',
    duration: '4 Months • 34 Modules • 220 Problems',
    modulesCount: 34,
    lessonsCount: 220,
    progress: 44,
    tags: ['Two Pointers', 'Sliding Window', 'Trees', 'Graphs', 'DP', 'Greedy', 'Backtracking'],
    outcomes: [
      'Pattern recognition: identify the right algorithmic technique in under 60 seconds',
      'Two Pointers & Sliding Window techniques for optimal O(n) array and string operations',
      'Fast & Slow Pointers for cycle detection and middle node resolution in linked lists',
      'Binary Search Tree operations, Morris Inorder Traversal, and Lowest Common Ancestor',
      'Graph algorithms: BFS, DFS, Dijkstra, Topological Sort, and Disjoint Set Union',
      'Dynamic Programming mastery: Memoization vs Tabulation, Knapsack, and 2D Grids'
    ],
    modules: [
      {
        id: 'dsa-m1',
        num: 1,
        title: 'Pattern 1 & 2: Two Pointers & Sliding Window',
        desc: 'Master subarray and substring problems with optimal O(n) runtime.',
        lessonsCount: 12,
        duration: '16 hours',
        status: 'Completed',
        lessons: [
          { id: 'dsa-l1', title: 'Two Pointers: Pair with Target Sum & Remove Duplicates', duration: '45 mins', completed: true },
          { id: 'dsa-l2', title: 'Sliding Window: Longest Substring with K Distinct Characters', duration: '50 mins', completed: true }
        ]
      },
      {
        id: 'dsa-m2',
        num: 2,
        title: 'Pattern 3 & 4: Fast/Slow Pointers & In-Place Reversal',
        desc: 'Linked list cycle detection, palindrome lists, and node re-ordering.',
        lessonsCount: 8,
        duration: '12 hours',
        status: 'Completed',
        lessons: [
          { id: 'dsa-l3', title: 'Floyd Cycle-Finding Algorithm & Start of Cycle Detection', duration: '40 mins', completed: true }
        ]
      },
      {
        id: 'dsa-m3',
        num: 3,
        title: 'Pattern 5 & 6: Tree BFS, DFS & Path Finding',
        desc: 'Level-order traversals, lowest common ancestor, and path sum problems.',
        lessonsCount: 14,
        duration: '22 hours',
        status: 'In Progress',
        lessons: [
          { id: 'dsa-l4', title: 'Tree BFS: Level Order Traversal & Zigzag Traversal', duration: '55 mins', completed: false }
        ]
      }
    ]
  }
};

// ==========================================================================
// CURATED RESOURCE DATASET
// ==========================================================================
const resourcesData = [
  {
    id: 1,
    title: 'DSA Time & Space Complexity Blueprint',
    category: 'Cheatsheet & Foundations',
    provider: 'CodeMentor Engineering Curators',
    providerType: 'CodeMentor Internal Reference',
    difficulty: 'Essential for All Levels',
    readingTime: '8 mins read',
    externalUrl: null,
    intro: 'An exhaustive reference mapping Big-O time and space complexities across fundamental data structures and sorting algorithms, including amortized costs and memory footprint.',
    whyUseful: 'Tier-1 interviewers evaluate optimal algorithmic complexity before allowing you to write a single line of code. Being able to explain why QuickSort degrades to O(n²) or why HashMap operations are amortized O(1) demonstrates engineering rigor.',
    topics: ['Big-O Notation', 'Amortized Analysis', 'Sorting Complexities', 'Hash Table Collisions', 'Tree Traversals'],
    contentSections: [
      {
        heading: '1. Asymptotic Complexity in Technical Interviews',
        body: 'Big-O notation describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In programming interviews, you must analyze runtime and auxiliary space in terms of input size N.',
        codeSnippet: `// Linear O(n) Time, Constant O(1) Auxiliary Space
public int findMax(int[] nums) {
    int max = nums[0];
    for (int num : nums) {
        if (num > max) max = num;
    }
    return max;
}`
      },
      {
        heading: '2. Data Structure Operations Comparison',
        body: 'Understanding the memory layout of arrays vs linked structures is fundamental: contiguous memory arrays provide O(1) random access due to cache locality, whereas node-based linked lists require pointer chasing.',
        table: [
          { name: 'Array', access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)', space: 'O(n)' },
          { name: 'Linked List', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', space: 'O(n)' },
          { name: 'Hash Table', access: 'N/A', search: 'O(1)*', insert: 'O(1)*', delete: 'O(1)*', space: 'O(n)' },
          { name: 'Binary Search Tree', access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', space: 'O(n)' }
        ]
      },
      {
        heading: '3. Amortized Cost: Why ArrayList.add() is O(1)',
        body: 'When a dynamic array reaches capacity, it allocates a new array of double the size (growth factor 1.5x in Java, 2x in C++) and copies all elements. While this resize operation takes O(n), it occurs so infrequently that across N insertions, the total copying work is 2n, making each insertion cost an amortized O(1).'
      }
    ]
  },
  {
    id: 2,
    title: 'Microservices Architecture & Distributed Systems Primer',
    category: 'System Design',
    provider: 'CodeMentor System Design Labs',
    providerType: 'CodeMentor Internal Guide',
    difficulty: 'Intermediate to Advanced',
    readingTime: '16 mins read',
    externalUrl: null,
    intro: 'A comprehensive architectural walkthrough covering API gateways, service discovery, database-per-service isolation, asynchronous event streaming with Kafka, and the Saga pattern for distributed transactions.',
    whyUseful: 'System design rounds at FAANG and high-growth startups test your ability to build fault-tolerant, horizontally scalable software systems. This primer gives you the exact architectural blueprints and vocabulary to ace High-Level Design (HLD) interviews.',
    topics: ['API Gateway Pattern', 'Service Discovery (Eureka/Consul)', 'Database per Service', 'Saga Pattern', 'Eventual Consistency'],
    contentSections: [
      {
        heading: '1. Decomposing Monoliths into Microservices',
        body: 'Microservices partition software by business domains rather than technical layers. Each service owns its domain logic, its own datastore (Database-per-Service pattern), and communicates via lightweight REST APIs or asynchronous event brokers.'
      },
      {
        heading: '2. The API Gateway & Reverse Proxy Layer',
        body: 'Direct client-to-service communication creates tight coupling and exposes internal network topology. An API Gateway acts as a single reverse-proxy entry point providing SSL termination, rate limiting, token validation, and request routing.'
      },
      {
        heading: '3. Managing Distributed Transactions with the Saga Pattern',
        body: 'Two-Phase Commit (2PC) does not scale across distributed cloud microservices. Instead, the Saga pattern coordinates a sequence of local database transactions: if any local step fails, compensating transactions are executed in reverse order to rollback state.'
      }
    ]
  },
  {
    id: 3,
    title: 'Top 100 SQL Queries for Tech Interviews',
    category: 'Database Engineering',
    provider: 'CodeMentor Database Team',
    providerType: 'CodeMentor Curated Practice',
    difficulty: 'Intermediate',
    readingTime: '22 mins read',
    externalUrl: null,
    intro: 'The 100 most frequently tested SQL problems in product engineering drives: N-th highest salary using DENSE_RANK(), self-joins for hierarchical reporting structures, Common Table Expressions (CTEs), and window functions.',
    whyUseful: 'SQL is a mandatory round for backend, data engineering, and fullstack placement drives. Companies like Amazon, Razorpay, and Microsoft test edge cases like duplicate salaries, null handling, and partitioned aggregates.',
    topics: ['Window Functions (ROW_NUMBER, DENSE_RANK)', 'Common Table Expressions (WITH RECURSIVE)', 'Self Joins & Outer Joins', 'Grouping Sets & Having Clauses'],
    contentSections: [
      {
        heading: '1. Finding the N-th Highest Salary with DENSE_RANK()',
        body: 'Using LIMIT with an OFFSET fails when there are duplicate salaries. DENSE_RANK() assigns consecutive rank values to unique salaries, handling ties correctly.',
        codeSnippet: `WITH RankedSalaries AS (
    SELECT employee_id, name, department_id, salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) as rank_pos
    FROM employees
)
SELECT salary FROM RankedSalaries
WHERE rank_pos = 2; -- Returns exact 2nd highest salary even with ties`
      },
      {
        heading: '2. Recursive CTEs for Hierarchical Management Trees',
        body: 'Recursive queries allow navigating parent-child relationships like employee-manager hierarchies without knowing the depth in advance.'
      }
    ]
  },
  {
    id: 4,
    title: 'Official Java 17 Documentation & SE API Specification',
    category: 'Language Specification',
    provider: 'Oracle Corporation',
    providerType: 'External Official Documentation',
    difficulty: 'Reference Document',
    readingTime: 'Official Oracle Documentation',
    externalUrl: 'https://docs.oracle.com/en/java/javase/17/docs/api/index.html',
    intro: 'The authoritative technical documentation for Java Platform, Standard Edition 17 LTS, detailing all package specifications, core class libraries, java.util.concurrent, and JVM bytecode semantics.',
    whyUseful: 'Nothing beats learning directly from the official language source. Understanding how java.util.concurrent.ConcurrentHashMap achieves thread-safe bucket locking or how the Garbage Collection interface is structured directly from Oracle\'s engineers.',
    topics: ['java.lang & java.util', 'java.util.concurrent', 'Stream API Spec', 'Module System (JPMS)', 'Virtual Machine Spec'],
    contentSections: [
      {
        heading: 'Official Oracle Java SE 17 Reference Overview',
        body: 'This curated link connects to Oracle\'s official documentation for Java SE 17 (LTS). Java 17 is the primary Long-Term Support release targeted by modern enterprise platforms, Spring Boot 3, and cloud microservices.'
      }
    ]
  },
  {
    id: 5,
    title: 'Spring Boot 3 Official Reference Guide',
    category: 'Framework Reference',
    provider: 'VMware Tanzu / Spring.io',
    providerType: 'External Official Documentation',
    difficulty: 'Reference Document',
    readingTime: 'Official Spring Documentation',
    externalUrl: 'https://docs.spring.io/spring-boot/docs/current/reference/html/',
    intro: 'Comprehensive official documentation for Spring Boot 3, covering core features, web applications, security auto-configuration, actuators, and GraalVM native image compilation.',
    whyUseful: 'Spring Boot 3 introduces fundamental changes including Spring Framework 6 baseline, Java 17 minimum requirements, and native compilation. Knowing the official conventions gives you a distinct advantage in backend interviews.',
    topics: ['Spring Boot Auto-Configuration', 'Spring Security 6 Integration', 'Production Actuators & Metrics', 'GraalVM AOT Compilation', 'Spring Cloud Components'],
    contentSections: [
      {
        heading: 'Spring.io Official Documentation Index',
        body: 'Curated link to the official Spring Boot 3 reference documentation maintained by VMware Tanzu. Covers starter parent dependencies, autoconfiguration conditions, and embedded server tuning.'
      }
    ]
  },
  {
    id: 6,
    title: 'System Design Primer by Donne Martin',
    category: 'System Design Curriculum',
    provider: 'Donne Martin / GitHub Open Source',
    providerType: 'External Open Source Curriculum',
    difficulty: 'Comprehensive (All Levels)',
    readingTime: 'Full Study Guide (280k+ Stars)',
    externalUrl: 'https://github.com/donnemartin/system-design-primer',
    intro: 'An internationally acclaimed open-source curriculum providing visual diagrams, step-by-step interview blueprints, latency numbers every engineer should know, and FAANG-level problem breakdowns.',
    whyUseful: 'Widely regarded as the industry standard open-source guide for technical interviews. It bridges the gap between theoretical computer science and real-world distributed infrastructure.',
    topics: ['Scalability Fundamentals', 'Load Balancers & Reverse Proxies', 'Caching Strategies (Redis, Memcached)', 'Asynchronism & Message Queues', 'CAP Theorem & PACELC'],
    contentSections: [
      {
        heading: 'GitHub Open Source Curriculum Overview',
        body: 'A curated link to Donne Martin\'s repository, spanning performance trade-offs, database replication models (Master-Slave, Master-Master), and architectural blueprints for URL shorteners, Pastebin, and social feeds.'
      }
    ]
  }
];

// ==========================================================================
// COURSE & LESSON DETAIL CONTROLLERS
// ==========================================================================
window.openCourseDetail = function(courseId) {
  state.activeCourseId = courseId || 'java-backend';
  renderCourseDetail(state.activeCourseId);
  switchView('course-detail');
};

window.renderCourseDetail = function(courseId) {
  const course = coursesData[courseId] || coursesData['java-backend'];
  const container = document.getElementById('view-course-detail');
  if (!container) return;

  const progress = state.courseProgress[course.id] || course.progress || 0;

  container.innerHTML = `
    <!-- Top Back Navigation -->
    <div class="flex items-center justify-between pb-3 border-b border-[#315B4C]">
      <button onclick="switchView('learning-paths')" class="text-xs text-[#B7C8BE] hover:text-[#D6A94F] flex items-center gap-2 transition-colors font-medium">
        <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Learning Paths
      </button>
      <div class="flex items-center gap-3 text-xs font-mono text-[#82958A]">
        <span>Track ID: #${course.id}</span>
        <span>•</span>
        <span class="text-[#63A982] flex items-center gap-1.5"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Verified Curriculum</span>
      </div>
    </div>

    <!-- Course Hero Surface -->
    <div class="cm-course-hero text-[#F7F2E7] space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <span class="px-3 py-1 rounded-full bg-[#003D30]/80 border border-[#315B4C] text-xs font-mono text-[#D6A94F] uppercase tracking-wider font-semibold">
            ${course.level}
          </span>
          <span class="text-xs text-[#B7C8BE] font-mono flex items-center gap-1.5">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${course.duration}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="showToast('Curriculum syllabus downloaded! 📄')" class="px-3.5 py-1.5 rounded-lg bg-[#003D30]/80 border border-[#315B4C] text-xs text-[#B7C8BE] hover:text-[#F7F2E7] flex items-center gap-1.5 transition-colors">
            <i data-lucide="download" class="w-3.5 h-3.5"></i> Syllabus PDF
          </button>
          <button onclick="openLessonDetail('${course.id}', 'm3', 'l24')" class="cm-btn-emerald-pill !h-9 !w-auto !px-4 text-xs">
            <span>Continue Learning</span> <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <div>
        <h1 class="text-3xl lg:text-4xl font-serif font-bold tracking-tight text-[#F7F2E7] leading-tight">
          ${course.title}
        </h1>
        <p class="text-sm lg:text-base text-[#B7C8BE] mt-2 max-w-3xl leading-relaxed">
          ${course.tagline}
        </p>
      </div>

      <!-- Tech Tags -->
      <div class="flex flex-wrap gap-2 pt-1">
        ${course.tags.map(t => `
          <span class="px-2.5 py-1 rounded bg-[#003D30]/70 border border-[#315B4C] text-xs font-mono text-[#D6A94F]">
            ${t}
          </span>
        `).join('')}
      </div>

      <!-- Course Progress Indicator -->
      <div class="pt-4 border-t border-[#315B4C]/80 space-y-2">
        <div class="flex items-center justify-between text-xs font-mono">
          <span class="text-[#B7C8BE]">Overall Track Mastery Progress</span>
          <span class="text-[#D6A94F] font-bold">${progress}% Completed</span>
        </div>
        <div class="h-2 w-full bg-[#003D30] rounded-full overflow-hidden border border-[#315B4C]">
          <div class="h-full bg-gradient-to-r from-[#087653] via-[#63A982] to-[#D6A94F] rounded-full transition-all duration-500" style="width: ${progress}%"></div>
        </div>
      </div>
    </div>

    <!-- Main Two Column Grid: Left Outcomes & Modules / Right Metadata -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Left 2 Cols: What You Will Learn + Expandable Syllabus -->
      <div class="lg:col-span-2 space-y-8">
        
        <!-- What You Will Master Section -->
        <div class="cm-card p-6 space-y-4">
          <div class="flex items-center gap-2">
            <i data-lucide="check-circle-2" class="w-5 h-5 text-[#D6A94F]"></i>
            <h2 class="text-xl font-serif font-bold text-[#F7F2E7]">What You Will Master in This Track</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            ${course.outcomes.map(outcome => `
              <div class="flex items-start gap-2.5 p-3 rounded-xl bg-[#05271F]/80 border border-[#315B4C] text-xs text-[#B7C8BE] leading-relaxed">
                <i data-lucide="check" class="w-4 h-4 text-[#63A982] flex-shrink-0 mt-0.5"></i>
                <span>${outcome}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Curriculum Expandable Module Accordion -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-serif font-bold text-[#F7F2E7]">Course Curriculum &amp; Modules</h2>
              <p class="text-xs text-[#82958A] mt-0.5">Click any module header to expand lessons.</p>
            </div>
            <span class="text-xs font-mono text-[#D6A94F] bg-[#003D30] px-3 py-1 rounded-full border border-[#315B4C]">
              ${course.modules.length} Modules Available
            </span>
          </div>

          <div class="space-y-3">
            ${course.modules.map((m, idx) => `
              <div class="cm-module-card" id="module-card-${m.id}">
                <div class="cm-module-header" onclick="toggleModuleAccordion('${m.id}')">
                  <div class="flex items-center gap-3.5">
                    <div class="w-8 h-8 rounded-lg ${m.status === 'Completed' ? 'bg-[#63A982]/20 border border-[#63A982] text-[#63A982]' : m.status === 'In Progress' ? 'bg-[#D6A94F]/20 border border-[#D6A94F] text-[#D6A94F]' : 'bg-[#003D30] border border-[#315B4C] text-[#82958A]'} flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                      0${m.num}
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <h3 class="text-sm font-bold text-[#F7F2E7]">${m.title}</h3>
                        <span class="cm-badge ${m.status === 'Completed' ? 'cm-badge-easy' : m.status === 'In Progress' ? 'cm-badge-medium' : 'cm-badge-hard'} !text-[11px]">
                          ${m.status}
                        </span>
                      </div>
                      <p class="text-xs text-[#B7C8BE] mt-0.5">${m.desc}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4 text-xs font-mono text-[#82958A] flex-shrink-0">
                    <span class="hidden sm:inline">${m.lessonsCount} lessons • ${m.duration}</span>
                    <i data-lucide="chevron-down" id="chevron-${m.id}" class="w-4 h-4 text-[#B7C8BE] transition-transform duration-200"></i>
                  </div>
                </div>

                <!-- Accordion Body with Lessons -->
                <div class="cm-module-body ${idx === 2 ? 'expanded' : ''}" id="module-body-${m.id}">
                  ${(m.lessons && m.lessons.length > 0) ? m.lessons.map(lesson => `
                    <div class="cm-lesson-row ${lesson.isCurrent ? 'active-lesson' : ''}" onclick="openLessonDetail('${course.id}', '${m.id}', '${lesson.id}')">
                      <div class="flex items-center gap-3">
                        <div class="w-6 h-6 rounded flex items-center justify-center text-xs">
                          ${lesson.completed ? '<i data-lucide="check-circle-2" class="w-4 h-4 text-[#63A982]"></i>' : lesson.isCurrent ? '<i data-lucide="play" class="w-3.5 h-3.5 text-[#D6A94F] fill-current"></i>' : '<i data-lucide="circle" class="w-3.5 h-3.5 text-[#82958A]"></i>'}
                        </div>
                        <div>
                          <div class="text-xs font-medium text-[#F7F2E7] hover:text-[#D6A94F] transition-colors flex items-center gap-2">
                            <span>${lesson.title}</span>
                            ${lesson.isCurrent ? '<span class="px-1.5 py-0.5 rounded bg-[#D6A94F]/20 text-[#D6A94F] text-[10px] font-mono">Current</span>' : ''}
                          </div>
                          <div class="text-[11px] text-[#82958A] font-mono mt-0.5">Estimated: ${lesson.duration}</div>
                        </div>
                      </div>

                      <button class="text-xs font-mono text-[#D6A94F] hover:underline flex items-center gap-1">
                        ${lesson.completed ? 'Review' : 'Open Lesson'} &rarr;
                      </button>
                    </div>
                  `).join('') : `
                    <div class="p-4 text-xs text-[#82958A] text-center font-mono">
                      Additional lessons unlock upon completing prerequisite modules.
                    </div>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- Right 1 Col: Metadata & Placement Target Readiness -->
      <div class="space-y-5">
        
        <!-- Track Readiness Card -->
        <div class="cm-card p-5 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-[#315B4C]">
            <h3 class="text-sm font-serif font-bold text-[#F7F2E7]">Career Track Details</h3>
            <span class="px-2 py-0.5 rounded bg-[#63A982]/20 text-[#63A982] text-xs font-mono">Active</span>
          </div>

          <div class="space-y-3 text-xs">
            <div class="flex justify-between py-1 border-b border-[#315B4C]/50">
              <span class="text-[#82958A]">Estimated Pace:</span>
              <span class="text-[#F7F2E7] font-mono font-medium">8-10 hrs / week</span>
            </div>
            <div class="flex justify-between py-1 border-b border-[#315B4C]/50">
              <span class="text-[#82958A]">Classroom Cohort:</span>
              <span class="text-[#D6A94F] font-mono">2026-2027 Placements</span>
            </div>
            <div class="flex justify-between py-1 border-b border-[#315B4C]/50">
              <span class="text-[#82958A]">Certification:</span>
              <span class="text-[#63A982] font-mono">Tier-1 Verified Badge</span>
            </div>
          </div>

          <div class="pt-2">
            <div class="text-xs font-semibold text-[#82958A] uppercase tracking-wider mb-2 font-mono">Target Company Drives:</div>
            <div class="flex flex-wrap gap-1.5">
              <span class="px-2 py-1 rounded bg-[#003D30] border border-[#315B4C] text-[11px] text-[#D6A94F]">Amazon</span>
              <span class="px-2 py-1 rounded bg-[#003D30] border border-[#315B4C] text-[11px] text-[#D6A94F]">Microsoft</span>
              <span class="px-2 py-1 rounded bg-[#003D30] border border-[#315B4C] text-[11px] text-[#D6A94F]">Google</span>
              <span class="px-2 py-1 rounded bg-[#003D30] border border-[#315B4C] text-[11px] text-[#D6A94F]">Razorpay</span>
              <span class="px-2 py-1 rounded bg-[#003D30] border border-[#315B4C] text-[11px] text-[#D6A94F]">Atlassian</span>
            </div>
          </div>
        </div>

        <!-- Prerequisites Card -->
        <div class="cm-card p-5 space-y-3">
          <h3 class="text-sm font-serif font-bold text-[#F7F2E7]">Prerequisites &amp; Environment</h3>
          <ul class="space-y-2 text-xs text-[#B7C8BE]">
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="w-3.5 h-3.5 text-[#63A982]"></i> Basic Object-Oriented Programming
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="w-3.5 h-3.5 text-[#63A982]"></i> JDK 17+ installed locally
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="w-3.5 h-3.5 text-[#63A982]"></i> Git version control basics
            </li>
          </ul>
        </div>

        <!-- Instructor Support Banner -->
        <div class="cm-callout-ivory !my-0 space-y-2">
          <div class="flex items-center gap-2 font-serif font-bold text-sm text-[#18251F]">
            <i data-lucide="award" class="w-4 h-4 text-[#075B45]"></i> Placement Mentorship Included
          </div>
          <p class="text-xs text-[#556E62] leading-relaxed">
            Get personalized code reviews on your microservice projects directly from senior engineers before company referral submissions.
          </p>
        </div>

      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();
};

window.toggleModuleAccordion = function(moduleId) {
  const body = document.getElementById(`module-body-${moduleId}`);
  const chevron = document.getElementById(`chevron-${moduleId}`);
  if (!body) return;

  if (body.classList.contains('expanded')) {
    body.classList.remove('expanded');
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  } else {
    body.classList.add('expanded');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
};

// ==========================================================================
// DEDICATED LESSON DETAIL CONTROLLER
// ==========================================================================
window.openLessonDetail = function(courseId, moduleId, lessonId) {
  state.activeLessonId = { courseId, moduleId, lessonId };
  renderLessonDetail(courseId, moduleId, lessonId);
  switchView('lesson-detail');
};

window.renderLessonDetail = function(courseId, moduleId, lessonId) {
  const course = coursesData[courseId] || coursesData['java-backend'];
  const moduleObj = course.modules.find(m => m.id === moduleId) || course.modules[2];
  const lesson = (moduleObj.lessons && moduleObj.lessons.find(l => l.id === lessonId)) || moduleObj.lessons[3] || {
    id: lessonId,
    title: 'JWT Filter Chains & Stateless Security Architecture',
    duration: '65 mins',
    completed: false
  };

  const container = document.getElementById('view-lesson-detail');
  if (!container) return;

  const isCompleted = state.completedLessonsSet.has(lesson.id) || lesson.completed;

  container.innerHTML = `
    <!-- Top Lesson Breadcrumb & Navigation -->
    <div class="flex items-center justify-between pb-3.5 border-b border-[#315B4C]">
      <button onclick="openCourseDetail('${course.id}')" class="text-xs text-[#B7C8BE] hover:text-[#D6A94F] flex items-center gap-2 transition-colors font-medium">
        <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to ${course.title}
      </button>

      <div class="flex items-center gap-3">
        <button onclick="markLessonCompleted('${course.id}', '${moduleObj.id}', '${lesson.id}')" id="lesson-complete-toggle-btn" class="px-4 py-1.5 rounded-full ${isCompleted ? 'bg-[#63A982]/20 border border-[#63A982] text-[#63A982]' : 'cm-btn-emerald-pill !h-8 !w-auto !px-4'} text-xs font-medium flex items-center gap-2 transition-all">
          <i data-lucide="${isCompleted ? 'check-circle' : 'check'}" class="w-3.5 h-3.5"></i>
          <span>${isCompleted ? 'Completed' : 'Mark as Completed'}</span>
        </button>
      </div>
    </div>

    <!-- Lesson Header -->
    <div class="space-y-3 pt-2">
      <div class="flex items-center gap-2 text-xs font-mono text-[#D6A94F]">
        <span>Module ${moduleObj.num}: ${moduleObj.title}</span>
        <span>•</span>
        <span>Lesson Duration: ${lesson.duration || '60 mins'}</span>
      </div>

      <h1 class="text-3xl lg:text-4xl font-serif font-bold text-[#F7F2E7] tracking-tight leading-snug">
        ${lesson.title}
      </h1>
    </div>

    <!-- Main Editorial Prose Article Content -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
      
      <!-- Left 3 Cols: Learning Objectives, Explanation, Code, Takeaways -->
      <div class="lg:col-span-3 space-y-6">
        
        <!-- Objectives Card -->
        <div class="cm-card p-5 space-y-3">
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#D6A94F] flex items-center gap-2">
            <i data-lucide="target" class="w-4 h-4"></i> Core Learning Objectives
          </div>
          <ul class="space-y-2 text-xs text-[#B7C8BE] leading-relaxed">
            ${(lesson.objectives || [
              'Understand stateless session management in distributed REST APIs without server-side memory overhead',
              'Implement OncePerRequestFilter to intercept incoming HTTP authorization headers',
              'Extract, validate, and parse cryptographic JWT claims using RSA public keys',
              'Populate Spring Security SecurityContextHolder with the authenticated Student Principal'
            ]).map(obj => `
              <li class="flex items-start gap-2.5">
                <i data-lucide="check" class="w-4 h-4 text-[#63A982] flex-shrink-0 mt-0.5"></i>
                <span>${obj}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Technical Explanation -->
        <div class="cm-prose space-y-4">
          <h2>1. Stateless Authentication in Distributed Microservices</h2>
          <p>
            In monolithic applications, authentication state was typically stored in server memory via <code>HttpSession</code>. However, in modern distributed microservice clusters, stateful sessions break horizontal autoscaling because incoming requests can be routed by the load balancer to any server instance.
          </p>
          <p>
            Stateless JWT authentication solves this: upon successful login, the authentication server signs a compact, cryptographically verifiable token containing claims (subject, authorities, expiry). Every subsequent client request supplies this token in the <code>Authorization: Bearer &lt;token&gt;</code> header.
          </p>

          <h2>2. Spring Security 6 Filter Chain Architecture</h2>
          <p>
            Spring Security processes requests through a delegated chain of servlet filters (<code>SecurityFilterChain</code>). To inject our token verification, we extend <code>OncePerRequestFilter</code> and register it before the standard <code>UsernamePasswordAuthenticationFilter</code>.
          </p>

          <!-- Production Code Snippet in JetBrains Mono -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs font-mono text-[#82958A] px-1">
              <span>JwtAuthenticationFilter.java</span>
              <button onclick="showToast('Code copied to clipboard! 📋')" class="text-[#D6A94F] hover:underline flex items-center gap-1">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Code
              </button>
            </div>
            <pre class="cm-code-block"><code>${lesson.codeSnippet || `@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenService jwtTokenService, CustomUserDetailsService userDetailsService) {
        this.jwtTokenService = jwtTokenService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        final String userEmail = jwtTokenService.extractUsername(jwt);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            
            if (jwtTokenService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Establish user in current thread's SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}`}</code></pre>
          </div>

          <!-- Warm Ivory Architectural Callout Box -->
          <div class="cm-callout-ivory space-y-2">
            <div class="font-serif font-bold text-base text-[#18251F] flex items-center gap-2">
              <i data-lucide="lightbulb" class="w-4 h-4 text-[#075B45]"></i> Architectural Takeaways &amp; Production Best Practices
            </div>
            <ul class="space-y-1.5 text-xs text-[#556E62] list-disc list-inside">
              ${(lesson.takeaways || [
                'Always extend OncePerRequestFilter to guarantee that authentication logic runs strictly once per request dispatch cycle.',
                'Never store sensitive credentials (passwords, PII) inside the JWT payload since base64url is easily decoded.',
                'Combine short-lived Access Tokens (15 minutes) with Refresh Tokens stored in HTTP-Only, Secure cookies.',
                'Thread local security contexts are cleaned up automatically at the end of the request filter chain.'
              ]).map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Next / Prev Lesson Navigation Footer -->
        <div class="pt-6 border-t border-[#315B4C] flex items-center justify-between">
          <button onclick="showToast('Opening previous lesson...')" class="cm-btn-secondary text-xs">
            &larr; Previous Lesson
          </button>
          <button onclick="showToast('Opening next lesson in module...')" class="cm-btn-primary text-xs">
            Next Lesson &rarr;
          </button>
        </div>

      </div>

      <!-- Right 1 Col: Module Outline & Quick Nav -->
      <div class="space-y-5">
        <div class="cm-card p-5 space-y-3">
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#82958A] pb-2 border-b border-[#315B4C]">
            Lessons in this Module
          </div>
          <div class="space-y-2">
            ${(moduleObj.lessons || []).map(l => `
              <div onclick="openLessonDetail('${course.id}', '${moduleObj.id}', '${l.id}')" class="p-2.5 rounded-lg ${l.id === lesson.id ? 'bg-[#D6A94F]/15 border border-[#D6A94F] text-[#F7F2E7]' : 'hover:bg-[#05271F] text-[#B7C8BE]'} text-xs cursor-pointer transition-all flex items-center justify-between">
                <span class="truncate pr-2">${l.title}</span>
                <span class="text-[10px] font-mono text-[#82958A] flex-shrink-0">${l.duration}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="cm-card p-5 space-y-2 text-center">
          <i data-lucide="code" class="w-6 h-6 text-[#D6A94F] mx-auto"></i>
          <h4 class="text-xs font-bold text-[#F7F2E7]">Practise in IDE Sandbox</h4>
          <p class="text-xs text-[#82958A]">Test this JWT implementation against real unit test suites in our browser IDE.</p>
          <button onclick="openProblemModal(1)" class="cm-btn-secondary text-xs w-full mt-2">
            Open Code Sandbox
          </button>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();
};

window.markLessonCompleted = function(courseId, moduleId, lessonId) {
  state.completedLessonsSet.add(lessonId);
  if (state.courseProgress[courseId]) {
    state.courseProgress[courseId] = Math.min(100, state.courseProgress[courseId] + 5);
  }
  showToast('Lesson marked as completed! +40 XP earned 🎯');
  renderLessonDetail(courseId, moduleId, lessonId);
};

// ==========================================================================
// CURATED RESOURCE DETAIL CONTROLLER
// ==========================================================================
window.openResourceDetail = function(resourceId) {
  state.activeResourceId = resourceId;
  renderResourceDetail(resourceId);
  switchView('resource-detail');
};

window.renderResourceDetail = function(resourceId) {
  const resource = resourcesData.find(r => r.id === resourceId) || resourcesData[0];
  const container = document.getElementById('view-resource-detail');
  if (!container) return;

  const isBookmarked = state.bookmarkedResources.has(resource.id);

  container.innerHTML = `
    <!-- Top Back Navigation -->
    <div class="flex items-center justify-between pb-3.5 border-b border-[#315B4C]">
      <button onclick="switchView('resources')" class="text-xs text-[#B7C8BE] hover:text-[#D6A94F] flex items-center gap-2 transition-colors font-medium">
        <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Courses &amp; Resources
      </button>

      <div class="flex items-center gap-2.5">
        <button onclick="toggleBookmark(${resource.id}, this)" class="px-3 py-1.5 rounded-lg bg-[#003D30] border border-[#315B4C] text-xs ${isBookmarked ? 'text-[#D6A94F]' : 'text-[#B7C8BE]'} hover:text-[#F7F2E7] flex items-center gap-1.5 transition-colors">
          <i data-lucide="bookmark" class="w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}"></i>
          <span>${isBookmarked ? 'Bookmarked' : 'Bookmark Resource'}</span>
        </button>

        ${resource.externalUrl ? `
          <a href="${resource.externalUrl}" target="_blank" rel="noopener noreferrer" class="cm-btn-emerald-pill !h-8 !w-auto !px-3.5 text-xs">
            <span>Open Official Source</span> <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        ` : ''}
      </div>
    </div>

    <!-- Resource Hero Surface -->
    <div class="cm-resource-hero space-y-4 text-[#F7F2E7]">
      <div class="flex flex-wrap items-center gap-3">
        <span class="px-3 py-1 rounded-full bg-[#003D30] border border-[#315B4C] text-xs font-mono text-[#D6A94F] uppercase tracking-wider font-semibold">
          ${resource.category}
        </span>
        <span class="px-2.5 py-0.5 rounded bg-[#075B45] text-xs font-mono text-[#F7F2E7]">
          ${resource.providerType}
        </span>
        <span class="text-xs text-[#82958A] font-mono flex items-center gap-1.5">
          <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${resource.readingTime}
        </span>
      </div>

      <h1 class="text-3xl lg:text-4xl font-serif font-bold text-[#F7F2E7] tracking-tight leading-snug">
        ${resource.title}
      </h1>

      <p class="text-sm lg:text-base text-[#B7C8BE] max-w-3xl leading-relaxed">
        ${resource.intro}
      </p>

      <!-- Topics Chips -->
      <div class="flex flex-wrap gap-2 pt-1">
        ${resource.topics.map(t => `
          <span class="px-2.5 py-1 rounded bg-[#003D30] border border-[#315B4C] text-xs font-mono text-[#B7C8BE]">
            #${t}
          </span>
        `).join('')}
      </div>
    </div>

    <!-- Content Layout: Main Reading + Sticky Sidebar -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
      
      <!-- Main 3 Cols: Editorial Reading Article -->
      <div class="lg:col-span-3 space-y-6">
        
        <!-- Why This Resource is Useful Callout -->
        <div class="cm-callout-ivory space-y-2">
          <div class="font-serif font-bold text-base text-[#18251F] flex items-center gap-2">
            <i data-lucide="sparkles" class="w-4 h-4 text-[#075B45]"></i> Why This Resource is Essential for Placement
          </div>
          <p class="text-xs text-[#556E62] leading-relaxed">
            ${resource.whyUseful}
          </p>
        </div>

        <!-- Render Content Sections -->
        <div class="cm-prose space-y-6">
          ${resource.contentSections.map(sec => `
            <div class="space-y-3">
              <h2>${sec.heading}</h2>
              <p>${sec.body}</p>
              ${sec.codeSnippet ? `
                <pre class="cm-code-block"><code>${sec.codeSnippet}</code></pre>
              ` : ''}
              ${sec.table ? `
                <div class="overflow-x-auto my-4 border border-[#315B4C] rounded-lg">
                  <table class="w-full text-xs font-mono text-left">
                    <thead class="bg-[#003D30] text-[#D6A94F] border-b border-[#315B4C]">
                      <tr>
                        <th class="p-3">Data Structure</th>
                        <th class="p-3">Access</th>
                        <th class="p-3">Search</th>
                        <th class="p-3">Insertion</th>
                        <th class="p-3">Deletion</th>
                        <th class="p-3">Space</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#315B4C]/40 text-[#B7C8BE]">
                      ${sec.table.map(row => `
                        <tr class="hover:bg-[#075B45]/40 transition-colors">
                          <td class="p-3 font-bold text-[#F7F2E7]">${row.name}</td>
                          <td class="p-3">${row.access}</td>
                          <td class="p-3">${row.search}</td>
                          <td class="p-3 text-[#63A982]">${row.insert}</td>
                          <td class="p-3 text-[#63A982]">${row.delete}</td>
                          <td class="p-3">${row.space}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

        ${resource.externalUrl ? `
          <!-- Clear External Identification Banner -->
          <div class="p-5 rounded-xl bg-[#003D30] border border-[#315B4C] space-y-2">
            <div class="flex items-center gap-2 text-xs font-mono text-[#D6A94F] uppercase font-bold">
              <i data-lucide="info" class="w-4 h-4"></i> Official External Resource
            </div>
            <p class="text-xs text-[#B7C8BE] leading-relaxed">
              This curriculum item connects to the official technical documentation hosted by <strong>${resource.provider}</strong>. CodeMentor curates and indexes these resources to ensure students study verified industry standards without obsolete tutorials.
            </p>
            <div class="pt-2">
              <a href="${resource.externalUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-xs font-medium text-[#D6A94F] hover:underline">
                Visit ${resource.externalUrl} &rarr;
              </a>
            </div>
          </div>
        ` : ''}

      </div>

      <!-- Right 1 Col: Provider Meta & Related Resources -->
      <div class="space-y-5">
        <div class="cm-card p-5 space-y-3.5">
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#82958A] pb-2 border-b border-[#315B4C]">
            Resource Attribution
          </div>
          <div class="space-y-2 text-xs">
            <div>
              <span class="text-[#82958A] block">Source / Curator:</span>
              <span class="text-[#F7F2E7] font-medium">${resource.provider}</span>
            </div>
            <div>
              <span class="text-[#82958A] block">Resource Nature:</span>
              <span class="text-[#D6A94F] font-mono">${resource.providerType}</span>
            </div>
            <div>
              <span class="text-[#82958A] block">Target Level:</span>
              <span class="text-[#B7C8BE]">${resource.difficulty}</span>
            </div>
          </div>
        </div>

        <!-- Related Resources List -->
        <div class="cm-card p-5 space-y-3">
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#82958A] pb-2 border-b border-[#315B4C]">
            Related Materials
          </div>
          <div class="space-y-2.5">
            ${resourcesData.filter(r => r.id !== resource.id).slice(0, 3).map(rel => `
              <div onclick="openResourceDetail(${rel.id})" class="p-2.5 rounded-lg hover:bg-[#003D30] cursor-pointer transition-colors border border-transparent hover:border-[#315B4C]">
                <div class="text-xs font-medium text-[#F7F2E7] hover:text-[#D6A94F] transition-colors line-clamp-1">${rel.title}</div>
                <div class="text-[11px] text-[#82958A] font-mono mt-0.5">${rel.readingTime}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) lucide.createIcons();
};

// ==========================================================================
// THE SIGNATURE GREEN BLADE ANIMATION CONTROLLERS
// ==========================================================================
window.authSetMode = function(mode) {
  state.authMode = mode;
  const card = document.getElementById('auth-main-card');
  if (!card) return;

  if (mode === 'signup') {
    card.classList.remove('mode-signin');
    card.classList.add('mode-signup');
  } else {
    card.classList.remove('mode-signup');
    card.classList.add('mode-signin');
  }

  if (window.lucide) lucide.createIcons();
};

window.toggleAuthPassword = function(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.setAttribute('data-lucide', 'eye-off');
  } else {
    input.type = 'password';
    if (icon) icon.setAttribute('data-lucide', 'eye');
  }
  if (window.lucide) lucide.createIcons();
};

window.handleSignInSubmit = function(e) {
  e.preventDefault();
  const btn = document.getElementById('signin-submit-btn');
  const emailInput = document.getElementById('signin-email');
  const passwordInput = document.getElementById('signin-password');

  if (!emailInput || !passwordInput) return;

  if (!emailInput.value || !passwordInput.value) {
    showToast('Please provide both student email and password');
    return;
  }

  // Simulate loading state
  if (btn) {
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline"></i> <span>Authenticating...</span>`;
    btn.disabled = true;
    if (window.lucide) lucide.createIcons();
  }

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = `<span>Sign in</span>`;
      btn.disabled = false;
    }
    showToast('Signed in successfully! Welcome back, Sweta 👋');
    switchView('dashboard');
  }, 650);
};

window.handleSignUpSubmit = function(e) {
  e.preventDefault();
  const btn = document.getElementById('signup-submit-btn');
  const nameInput = document.getElementById('signup-name');
  const emailInput = document.getElementById('signup-email');
  const pass1 = document.getElementById('signup-password');
  const pass2 = document.getElementById('signup-confirm-password');
  const terms = document.getElementById('signup-terms');

  if (!nameInput.value || !emailInput.value || !pass1.value) {
    showToast('Please fill in all required fields');
    return;
  }

  if (pass1.value !== pass2.value) {
    showToast('Passwords do not match. Please re-enter.');
    return;
  }

  if (!terms.checked) {
    showToast('Please accept the CodeMentor Terms & Honor Code');
    return;
  }

  if (btn) {
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline"></i> <span>Creating Account...</span>`;
    btn.disabled = true;
    if (window.lucide) lucide.createIcons();
  }

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = `<span>Create account</span>`;
      btn.disabled = false;
    }
    showToast('Account created successfully! Welcome to CodeMentor 🚀');
    switchView('dashboard');
  }, 750);
};

window.openForgotPasswordModal = function() {
  const modal = document.getElementById('forgot-password-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeForgotPasswordModal = function() {
  const modal = document.getElementById('forgot-password-modal');
  if (modal) modal.classList.add('hidden');
};

window.handleForgotPasswordSubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('forgot-password-email');
  if (!email || !email.value) return;

  closeForgotPasswordModal();
  showToast(`Password reset link sent to ${email.value}! Check your inbox ✉️`);
};

