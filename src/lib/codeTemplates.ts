export const codeTemplates: Record<string, string> = {
  python: `# Python Example
def greet(name):
    return f"Hello, {name}!"

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Main execution
print(greet("World"))
print("Fibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
`,

  javascript: `// JavaScript Example
function greet(name) {
  return \`Hello, \${name}!\`;
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Main execution
console.log(greet("World"));
console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}
`,

  typescript: `// TypeScript Example
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Main execution
console.log(greet("World"));
console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}
`,

  java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println(greet("World"));
        System.out.println("Fibonacci sequence:");
        for (int i = 0; i < 10; i++) {
            System.out.println("F(" + i + ") = " + fibonacci(i));
        }
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
`,

  cpp: `// C++ Example
#include <iostream>
#include <string>
using namespace std;

string greet(const string& name) {
    return "Hello, " + name + "!";
}

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << greet("World") << endl;
    cout << "Fibonacci sequence:" << endl;
    for (int i = 0; i < 10; i++) {
        cout << "F(" << i << ") = " << fibonacci(i) << endl;
    }
    return 0;
}
`,

  c: `// C Example
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("Hello, World!\\n");
    printf("Fibonacci sequence:\\n");
    for (int i = 0; i < 10; i++) {
        printf("F(%d) = %d\\n", i, fibonacci(i));
    }
    return 0;
}
`,

  csharp: `// C# Example
using System;

class Program {
    static void Main() {
        Console.WriteLine(Greet("World"));
        Console.WriteLine("Fibonacci sequence:");
        for (int i = 0; i < 10; i++) {
            Console.WriteLine($"F({i}) = {Fibonacci(i)}");
        }
    }
    
    static string Greet(string name) {
        return $"Hello, {name}!";
    }
    
    static int Fibonacci(int n) {
        if (n <= 1) return n;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
}
`,

  go: `// Go Example
package main

import "fmt"

func greet(name string) string {
    return "Hello, " + name + "!"
}

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    fmt.Println(greet("World"))
    fmt.Println("Fibonacci sequence:")
    for i := 0; i < 10; i++ {
        fmt.Printf("F(%d) = %d\\n", i, fibonacci(i))
    }
}
`,

  rust: `// Rust Example
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn fibonacci(n: u32) -> u32 {
    if n <= 1 { return n; }
    fibonacci(n - 1) + fibonacci(n - 2)
}

fn main() {
    println!("{}", greet("World"));
    println!("Fibonacci sequence:");
    for i in 0..10 {
        println!("F({}) = {}", i, fibonacci(i));
    }
}
`,

  ruby: `# Ruby Example
def greet(name)
  "Hello, #{name}!"
end

def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

puts greet("World")
puts "Fibonacci sequence:"
(0...10).each do |i|
  puts "F(#{i}) = #{fibonacci(i)}"
end
`,

  php: `<?php
// PHP Example
function greet($name) {
    return "Hello, $name!";
}

function fibonacci($n) {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

echo greet("World") . "\\n";
echo "Fibonacci sequence:\\n";
for ($i = 0; $i < 10; $i++) {
    echo "F($i) = " . fibonacci($i) . "\\n";
}
?>
`,

  swift: `// Swift Example
func greet(_ name: String) -> String {
    return "Hello, \\(name)!"
}

func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

print(greet("World"))
print("Fibonacci sequence:")
for i in 0..<10 {
    print("F(\\(i)) = \\(fibonacci(i))")
}
`,

  kotlin: `// Kotlin Example
fun greet(name: String): String = "Hello, ${"$"}name!"

fun fibonacci(n: Int): Int = if (n <= 1) n else fibonacci(n - 1) + fibonacci(n - 2)

fun main() {
    println(greet("World"))
    println("Fibonacci sequence:")
    for (i in 0 until 10) {
        println("F(${"$"}i) = ${"$"}{fibonacci(i)}")
    }
}
`,
};
