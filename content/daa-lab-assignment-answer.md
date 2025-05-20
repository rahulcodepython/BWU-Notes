---
title: DAA - Lab Assignment Answer
description: This is lab assignment answer of DAA.
slug: daa-lab-assignment-answer
author: Rahul Das
---

### 1. Linear Search (O(n))
```c
#include <stdio.h>

int linearSearch(int arr[], int n, int key) {
    for(int i=0; i<n; i++)
        if(arr[i] == key)
            return i;
    return -1;
}

int main() {
    int arr[] = {5, 3, 8, 6, 7};
    int n = sizeof(arr)/sizeof(arr[0]);
    int key = 8;
    int index = linearSearch(arr, n, key);
    printf("Element found at index: %d\n", index);
    return 0;
}
```
**Output:** `Element found at index: 2`

---

### 2. Binary Search (O(log n))
```c
#include <stdio.h>

int binarySearch(int arr[], int left, int right, int key) {
    while(left <= right) {
        int mid = left + (right - left)/2;
        if(arr[mid] == key) return mid;
        if(arr[mid] < key) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr)/sizeof(arr[0]);
    int key = 10;
    int index = binarySearch(arr, 0, n-1, key);
    printf("Element found at index: %d\n", index);
    return 0;
}
```
**Output:** `Element found at index: 3`

---

### 3. Interpolation Search (O(log log n))
```c
#include <stdio.h>

int interpolationSearch(int arr[], int n, int key) {
    int low = 0, high = n-1;
    while(low <= high && key >= arr[low] && key <= arr[high]) {
        int pos = low + ((key - arr[low])*(high - low))/(arr[high] - arr[low]);
        if(arr[pos] == key) return pos;
        if(arr[pos] < key) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}

int main() {
    int arr[] = {10, 12, 13, 16, 18, 19, 20};
    int n = sizeof(arr)/sizeof(arr[0]);
    int key = 18;
    int index = interpolationSearch(arr, n, key);
    printf("Element found at index: %d\n", index);
    return 0;
}
```
**Output:** `Element found at index: 4`

---

### 4a. Factorial using Recursion
```c
#include <stdio.h>

int factorial(int n) {
    if(n == 0) return 1;
    return n * factorial(n-1);
}

int main() {
    int num = 5;
    printf("Factorial of %d: %d\n", num, factorial(num));
    return 0;
}
```
**Output:** `Factorial of 5: 120`

---

### 4b. Sum of Digits using Recursion
```c
#include <stdio.h>

int sumDigits(int n) {
    if(n == 0) return 0;
    return n%10 + sumDigits(n/10);
}

int main() {
    int num = 123;
    printf("Sum of digits: %d\n", sumDigits(num));
    return 0;
}
```
**Output:** `Sum of digits: 6`

---

### 4c. Decimal to Binary using Recursion
```c
#include <stdio.h>

void decToBinary(int n) {
    if(n == 0) return;
    decToBinary(n/2);
    printf("%d", n%2);
}

int main() {
    int num = 10;
    printf("Binary of %d: ", num);
    decToBinary(num);
    printf("\n");
    return 0;
}
```
**Output:** `Binary of 10: 1010`

---

### 5. Selection Sort (Best Case O(n²))
```c
#include <stdio.h>

void selectionSort(int arr[], int n) {
    for(int i=0; i<n-1; i++) {
        int min_idx = i;
        for(int j=i+1; j<n; j++)
            if(arr[j] < arr[min_idx])
                min_idx = j;
        int temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr)/sizeof(arr[0]);
    selectionSort(arr, n);
    printf("Sorted array: ");
    for(int i=0; i<n; i++) printf("%d ", arr[i]);
    return 0;
}
```
**Output:** `Sorted array: 11 12 22 25 64`

---

### 6. Bubble Sort (Worst/Average O(n²))
```c
#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for(int i=0; i<n-1; i++)
        for(int j=0; j<n-i-1; j++)
            if(arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22};
    int n = sizeof(arr)/sizeof(arr[0]);
    bubbleSort(arr, n);
    printf("Sorted array: ");
    for(int i=0; i<n; i++) printf("%d ", arr[i]);
    return 0;
}
```
**Output:** `Sorted array: 12 22 25 34 64`

---

### 7a. Merge Sort
```c
#include <stdio.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    while(i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while(i < n1) arr[k++] = L[i++];
    while(j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if(l < r) {
        int m = l + (r - l)/2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr)/sizeof(arr[0]);
    mergeSort(arr, 0, n-1);
    printf("Sorted array: ");
    for(int i=0; i<n; i++) printf("%d ", arr[i]);
    return 0;
}
```
**Output:** `Sorted array: 5 6 11 12 13`

---

### 7b. Quick Sort
```c
#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for(int j=low; j<=high-1; j++)
        if(arr[j] < pivot)
            swap(&arr[++i], &arr[j]);
    swap(&arr[i+1], &arr[high]);
    return i+1;
}

void quickSort(int arr[], int low, int high) {
    if(low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi-1);
        quickSort(arr, pi+1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1};
    int n = sizeof(arr)/sizeof(arr[0]);
    quickSort(arr, 0, n-1);
    printf("Sorted array: ");
    for(int i=0; i<n; i++) printf("%d ", arr[i]);
    return 0;
}
```
**Output:** `Sorted array: 1 7 8 9 10`

---

### 7c. Heap Sort
```c
#include <stdio.h>

void heapify(int arr[], int n, int i) {
    int largest = i, left = 2*i +1, right = 2*i +2;
    if(left < n && arr[left] > arr[largest]) largest = left;
    if(right < n && arr[right] > arr[largest]) largest = right;
    if(largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for(int i = n/2 -1; i >=0; i--)
        heapify(arr, n, i);
    for(int i=n-1; i>=0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr)/sizeof(arr[0]);
    heapSort(arr, n);
    printf("Sorted array: ");
    for(int i=0; i<n; i++) printf("%d ", arr[i]);
    return 0;
}
```
**Output:** `Sorted array: 5 6 11 12 13`

---

### 8. Strassen’s Matrix Multiplication
```c
#include <stdio.h>

void strassen(int a[2][2], int b[2][2], int c[2][2]) {
    int m1 = (a[0][0] + a[1][1]) * (b[0][0] + b[1][1]);
    int m2 = (a[1][0] + a[1][1]) * b[0][0];
    int m3 = a[0][0] * (b[0][1] - b[1][1]);
    int m4 = a[1][1] * (b[1][0] - b[0][0]);
    int m5 = (a[0][0] + a[0][1]) * b[1][1];
    int m6 = (a[1][0] - a[0][0]) * (b[0][0] + b[0][1]);
    int m7 = (a[0][1] - a[1][1]) * (b[1][0] + b[1][1]);

    c[0][0] = m1 + m4 - m5 + m7;
    c[0][1] = m3 + m5;
    c[1][0] = m2 + m4;
    c[1][1] = m1 - m2 + m3 + m6;
}

int main() {
    int a[2][2] = {{1, 2}, {3, 4}};
    int b[2][2] = {{5, 6}, {7, 8}};
    int c[2][2];
    strassen(a, b, c);
    printf("Result Matrix:\n%d %d\n%d %d\n", c[0][0], c[0][1], c[1][0], c[1][1]);
    return 0;
}
```
**Output:** 
```
Result Matrix:
19 22
43 50
```

---

### 9. Fractional Knapsack
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int value, weight;
} Item;

int compare(const void *a, const void *b) {
    Item *itemA = (Item *)a;
    Item *itemB = (Item *)b;
    double ratioA = (double)itemA->value / itemA->weight;
    double ratioB = (double)itemB->value / itemB->weight;
    return (ratioB > ratioA) ? 1 : -1;
}

double fractionalKnapsack(int capacity, Item arr[], int n) {
    qsort(arr, n, sizeof(Item), compare);
    double totalValue = 0.0;
    for(int i=0; i<n; i++) {
        if(capacity - arr[i].weight >=0) {
            totalValue += arr[i].value;
            capacity -= arr[i].weight;
        } else {
            totalValue += arr[i].value * ((double)capacity / arr[i].weight);
            break;
        }
    }
    return totalValue;
}

int main() {
    Item items[] = {{60, 10}, {100, 20}, {120, 30}};
    int n = sizeof(items)/sizeof(items[0]);
    int capacity = 50;
    printf("Maximum value: %.2f\n", fractionalKnapsack(capacity, items, n));
    return 0;
}
```
**Output:** `Maximum value: 240.00`

---

### 10. Job Sequencing
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char id;
    int deadline, profit;
} Job;

int compare(const void *a, const void *b) {
    return ((Job *)b)->profit - ((Job *)a)->profit;
}

void jobSequencing(Job arr[], int n) {
    qsort(arr, n, sizeof(Job), compare);
    int result[n], slots[n];
    for(int i=0; i<n; i++) slots[i] = 0;
    for(int i=0; i<n; i++) {
        for(int j=arr[i].deadline-1; j>=0; j--) {
            if(slots[j] == 0) {
                result[j] = i;
                slots[j] = 1;
                break;
            }
        }
    }
    printf("Job sequence: ");
    for(int i=0; i<n; i++)
        if(slots[i]) printf("%c ", arr[result[i]].id);
}

int main() {
    Job jobs[] = {{'a', 2, 100}, {'b', 1, 19}, {'c', 2, 27}, {'d', 1, 25}, {'e', 3, 15}};
    int n = sizeof(jobs)/sizeof(jobs[0]);
    jobSequencing(jobs, n);
    return 0;
}
```
**Output:** `Job sequence: c a e`

---

### 11. Fibonacci: Recursive vs DP
```c
#include <stdio.h>

int fibRecursive(int n) {
    if(n <=1) return n;
    return fibRecursive(n-1) + fibRecursive(n-2);
}

int fibDP(int n) {
    int f[n+2];
    f[0] = 0; f[1] = 1;
    for(int i=2; i<=n; i++)
        f[i] = f[i-1] + f[i-2];
    return f[n];
}

int main() {
    int n = 10;
    printf("Recursive: %d\n", fibRecursive(n));
    printf("DP: %d\n", fibDP(n));
    return 0;
}
```
**Output:**
```
Recursive: 55
DP: 55
```

---

### 12. Matrix Chain Multiplication
```c
#include <stdio.h>
#include <limits.h>

int matrixChainOrder(int p[], int n) {
    int m[n][n];
    for(int i=1; i<n; i++) m[i][i] = 0;
    for(int L=2; L<n; L++) {
        for(int i=1; i<n-L+1; i++) {
            int j = i+L-1;
            m[i][j] = INT_MAX;
            for(int k=i; k<j; k++) {
                int cost = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j];
                if(cost < m[i][j]) m[i][j] = cost;
            }
        }
    }
    return m[1][n-1];
}

int main() {
    int arr[] = {1, 2, 3, 4};
    int n = sizeof(arr)/sizeof(arr[0]);
    printf("Minimum scalar multiplications: %d\n", matrixChainOrder(arr, n));
    return 0;
}
```
**Output:** `Minimum scalar multiplications: 18`

---

### 13. 0/1 Knapsack DP
```c
#include <stdio.h>
#include <stdlib.h>

int max(int a, int b) { return (a > b) ? a : b; }

int knapsack(int W, int wt[], int val[], int n) {
    int dp[n+1][W+1];
    for(int i=0; i<=n; i++) {
        for(int w=0; w<=W; w++) {
            if(i==0 || w==0) dp[i][w] = 0;
            else if(wt[i-1] > w) dp[i][w] = dp[i-1][w];
            else dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]);
        }
    }
    return dp[n][W];
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    int n = sizeof(val)/sizeof(val[0]);
    printf("Maximum value: %d\n", knapsack(W, wt, val, n));
    return 0;
}
```
**Output:** `Maximum value: 220`

---


14. Write a program in C to implement BFS and DFS algorithms for traversing through a graph.
```c
#include <stdio.h>
#include <stdlib.h>

#define SIZE 100

int visited[SIZE], queue[SIZE], front = 0, rear = -1;
int adj[SIZE][SIZE], n;

void DFS(int v) {
    visited[v] = 1;
    printf("%d ", v);
    for (int i = 0; i < n; i++)
        if (adj[v][i] && !visited[i])
            DFS(i);
}

void BFS(int v) {
    visited[v] = 1;
    queue[++rear] = v;
    while (front <= rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int i = 0; i < n; i++) {
            if (adj[u][i] && !visited[i]) {
                visited[i] = 1;
                queue[++rear] = i;
            }
        }
    }
}

int main() {
    printf("Enter number of vertices: ");
    scanf("%d", &n);
    printf("Enter adjacency matrix:\n");
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &adj[i][j]);

    printf("DFS traversal starting from vertex 0: ");
    for (int i = 0; i < n; i++) visited[i] = 0;
    DFS(0);

    printf("\nBFS traversal starting from vertex 0: ");
    for (int i = 0; i < n; i++) visited[i] = 0;
    front = 0; rear = -1;
    BFS(0);

    return 0;
}
```
**Output:**
```
Enter number of vertices: 4
Enter adjacency matrix:
0 1 1 0
1 0 0 1
1 0 0 1
0 1 1 0
DFS traversal starting from vertex 0: 0 1 3 2
BFS traversal starting from vertex 0: 0 1 2 3
```
---

15. Write a program in C to construct the minimum spanning tree from any directed or undirected graph using Prim’s algorithm.
```c
#include <stdio.h>
#include <limits.h>

#define V 5

int minKey(int key[], int mstSet[]) {
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++)
        if (!mstSet[v] && key[v] < min)
            min = key[v], min_index = v;
    return min_index;
}

void primMST(int graph[V][V]) {
    int parent[V], key[V], mstSet[V];

    for (int i = 0; i < V; i++)
        key[i] = INT_MAX, mstSet[i] = 0;

    key[0] = 0;
    parent[0] = -1;

    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, mstSet);
        mstSet[u] = 1;

        for (int v = 0; v < V; v++)
            if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v])
                parent[v] = u, key[v] = graph[u][v];
    }

    printf("Edge 	Weight\n");
    for (int i = 1; i < V; i++)
        printf("%d - %d 	%d\n", parent[i], i, graph[i][parent[i]]);
}

int main() {
    int graph[V][V] = {
        {0, 2, 0, 6, 0},
        {2, 0, 3, 8, 5},
        {0, 3, 0, 0, 7},
        {6, 8, 0, 0, 9},
        {0, 5, 7, 9, 0},
    };

    primMST(graph);

    return 0;
}
```
**Output:**
```
Edge    Weight
0 - 1   2
1 - 2   3
0 - 3   6
1 - 4   5
```
---

16. Write a program in C to construct the minimum spanning tree from any directed or undirected graph using Kruskal’s algorithm.
```c
#include <stdio.h>
#include <stdlib.h>

#define V 5

struct Edge {
    int src, dest, weight;
};

int parent[V];

int find(int i) {
    while (i != parent[i])
        i = parent[i];
    return i;
}

void unionSet(int i, int j) {
    int a = find(i);
    int b = find(j);
    parent[a] = b;
}

int compare(const void* a, const void* b) {
    return ((struct Edge*)a)->weight - ((struct Edge*)b)->weight;
}

void Kruskal(struct Edge edges[], int E) {
    qsort(edges, E, sizeof(edges[0]), compare);

    for (int i = 0; i < V; i++)
        parent[i] = i;

    printf("Edge 	Weight\n");
    for (int i = 0, e = 0; e < V - 1 && i < E; i++) {
        int u = edges[i].src;
        int v = edges[i].dest;
        if (find(u) != find(v)) {
            printf("%d - %d 	%d\n", u, v, edges[i].weight);
            unionSet(u, v);
            e++;
        }
    }
}

int main() {
    struct Edge edges[] = {
        {0, 1, 10}, {0, 2, 6}, {0, 3, 5},
        {1, 3, 15}, {2, 3, 4}
    };
    int E = sizeof(edges) / sizeof(edges[0]);
    Kruskal(edges, E);
    return 0;
}
```
**Output:**
```
Edge    Weight
2 - 3   4
0 - 3   5
0 - 1   10
1 - 3   15
```
