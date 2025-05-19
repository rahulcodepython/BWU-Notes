---
title: PHP - Lab Assignment Answer
description: This is lab assignment answer of php.
slug: php-lab-assignment-answer
author: Rahul Das
---

### 1. Create a PHP webpage and print your name

```php
<?php
echo "My name is Rahul Das";
?>
```

⏳ Output:  
My name is Rahul Das

---

### 2. Get name from a form and show greeting

```php
<!-- form_name.php -->
<form method="POST">
  Enter your name: <input type="text" name="name">
  <input type="submit" value="Greet">
</form>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    echo "Hello, $name!";
}
?>
```

⏳ Output (Example Input: John):  
Hello, John!

---

### 3. Get name and phone number from a form and greet

```php
<!-- form_name_phone.php -->
<form method="POST">
  Name: <input type="text" name="name"><br>
  Phone: <input type="text" name="phone"><br>
  <input type="submit" value="Submit">
</form>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo "Welcome " . $_POST['name'] . "! Your phone number is " . $_POST['phone'];
}
?>
```

---

### 4. Check if a number is odd or even

```php
<?php
$number = 7;
if ($number % 2 == 0) {
    echo "$number is Even";
} else {
    echo "$number is Odd";
}
?>
```

⏳ Output:  
7 is Odd

---

### 8. Mathematical Calculator

```php
<form method="post">
  Number 1: <input type="number" name="num1"><br>
  Number 2: <input type="number" name="num2"><br>
  Operation (+, -, *, /): <input type="text" name="op"><br>
  <input type="submit" value="Calculate">
</form>

<?php
if ($_POST) {
  $a = $_POST['num1'];
  $b = $_POST['num2'];
  $op = $_POST['op'];
  switch ($op) {
    case '+': echo $a + $b; break;
    case '-': echo $a - $b; break;
    case '*': echo $a * $b; break;
    case '/': echo $b != 0 ? $a / $b : "Cannot divide by 0"; break;
    default: echo "Invalid operator";
  }
}
?>
```

---

### 16. Create Chess Board using for loop

```php
<table border="1" cellspacing="0" cellpadding="20">
<?php
for ($row = 1; $row <= 8; $row++) {
    echo "<tr>";
    for ($col = 1; $col <= 8; $col++) {
        $color = ($row + $col) % 2 == 0 ? 'white' : 'black';
        echo "<td style='background-color:$color; width:40px; height:40px;'></td>";
    }
    echo "</tr>";
}
?>
</table>
```

🟧 Output: A chessboard of alternating black and white cells

---

### 17. Electricity Bill Calculator

```php
<?php
$units = 300;
$bill = 0;

if ($units <= 50) {
    $bill = $units * 3.5;
} elseif ($units <= 150) {
    $bill = 50 * 3.5 + ($units - 50) * 4.0;
} elseif ($units <= 250) {
    $bill = 50 * 3.5 + 100 * 4.0 + ($units - 150) * 5.2;
} else {
    $bill = 50 * 3.5 + 100 * 4.0 + 100 * 5.2 + ($units - 250) * 6.5;
}

echo "Total Electricity Bill for $units units = ₹$bill";
?>
```

💡 Output:  
Total Electricity Bill for 300 units = ₹1560

---

### 22. Array operations with 10 names

```php
<?php
$names = ["Rahul", "Ankit", "Suman", "Rahul", "Zara", "Bala", "David", "Ankit", "Pooja", "Neha"];

echo "<b>Original Array:</b><br>";
foreach ($names as $name) echo "$name<br>";

echo "<b>Sorted:</b><br>";
$sorted = $names;
sort($sorted);
print_r($sorted);

echo "<b>No Duplicates:</b><br>";
$unique = array_unique($names);
print_r($unique);

echo "<b>After removing last element:</b><br>";
array_pop($names);
print_r($names);

echo "<b>Reversed:</b><br>";
print_r(array_reverse($names));

echo "<b>Insert at 2nd position:</b><br>";
array_splice($names, 1, 0, "InsertedName");
print_r($names);

echo "<b>Search 'Zara':</b><br>";
$pos = array_search("Zara", $names);
echo "Zara found at index: $pos";
?>
```

---

### 23. String operations

```php
<?php
$str = "php Program - the complete SOLUTION for WEB development";

echo strtoupper($str) . "<br>"; // Uppercase
echo strtolower($str) . "<br>"; // Lowercase
echo ucfirst($str) . "<br>";    // First character uppercase
echo ucwords($str) . "<br>";    // First char of all words uppercase
echo substr($str, -11) . "<br>";// Last 11 chars
echo preg_replace('/\bthe\b/', 'best', $str, 1) . "<br>"; // Replace first 'the'

$words = explode(" ", $str);
echo "Second word: " . $words[1] . "<br>"; // Second word

$newStr = substr_replace($str, "AWESOME ", 15, 0); // Insert string
echo "After Insert: " . $newStr;
?>
```

📦 Output:

- PHP PROGRAM - THE COMPLETE SOLUTION FOR WEB DEVELOPMENT
    
- php program - the complete solution for web development
    
- Php Program - the complete SOLUTION for WEB development
    
- Php Program - The Complete SOLUTION For WEB Development
    
- WEB development
    
- php Program - best complete SOLUTION for WEB development
    
- Second word: Program
    
- After Insert: php Program - the AWESOME complete SOLUTION for WEB development