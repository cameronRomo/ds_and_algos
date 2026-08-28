### O(1):
* Single operation
* Constant amount of time to run
* Size of input doesn't matter

### O(n):
* Size of input matters (n === size of input)
* Touches every item in array
* Time increases linearly

### O(n^2):
* Runs in quadratic time
* Nested loops

### O(log n):
* logarithmic
* Slows down at some point
* Binary Search
  * Start in middle second half, then search next half to reduce number of lookups

### O(2^n):
* Opposite of log n
* Not scaleable
* 
### Arrays:
* Strengths:
  * Access by index
* Weaknesses:
  * Some languages you need to allocate space

### Linked Lists:
* Store objects in sequence
* o(n) Head to Tail
* Each node references the next node
* Insert at begining and end O(1)
* Insert in the middle is O(n)
* 