import { GameLesson } from '@/types/game';
import GameMode from '@/components/GameMode';

async function loadGameLessons(): Promise<GameLesson[]> {
  const lessons: GameLesson[] = [
    {
      id: 'game-1',
      chapter: 1,
      title: 'Chapter 1: Meet Your First Zombie',
      description: 'Learn Rust basics by creating your first zombie!',
      unlocked: true,
      story: `Welcome to Rust Zombies! 🧟

In this game, you'll learn Rust programming by building a zombie army. Each zombie is a struct that you'll create and customize.

Your mission: Create your first zombie and learn about Rust structs, variables, and basic types.`,
      challenges: [
        {
          id: 'challenge-1-1',
          title: 'Create Your First Zombie',
          description: 'Create a Zombie struct with a name and DNA',
          instructions: `Create a struct called Zombie with:
- name: String
- dna: u32

Then create a function create_zombie that takes a name and returns a Zombie with that name and a random DNA (use 100 for now).

fn main() {
    let zombie = create_zombie(String::from("Zombie1"));
    println!("Created zombie: {} with DNA: {}", zombie.name, zombie.dna);
}`,
          starterCode: `struct Zombie {
    // TODO: Add name and dna fields
}

fn create_zombie(name: String) -> Zombie {
    // TODO: Create and return a Zombie
    todo!()
}

fn main() {
    let zombie = create_zombie(String::from("Zombie1"));
    println!("Created zombie: {} with DNA: {}", zombie.name, zombie.dna);
}`,
          solution: `struct Zombie {
    name: String,
    dna: u32,
}

fn create_zombie(name: String) -> Zombie {
    Zombie {
        name,
        dna: 100,
    }
}

fn main() {
    let zombie = create_zombie(String::from("Zombie1"));
    println!("Created zombie: {} with DNA: {}", zombie.name, zombie.dna);
}`,
          tests: [
            {
              id: 'test-1',
              description: 'Zombie struct has name field',
              input: '',
              expectedOutput: 'Created zombie: Zombie1 with DNA: 100',
            },
            {
              id: 'test-2',
              description: 'Zombie struct has dna field',
              input: '',
              expectedOutput: 'Created zombie: Zombie1 with DNA: 100',
            },
          ],
          hints: [
            'Structs in Rust use the struct keyword',
            'Fields are defined with their type',
            'You can create a struct instance using StructName { field: value }',
          ],
          difficulty: 'easy',
          xpReward: 50,
        },
        {
          id: 'challenge-1-2',
          title: 'Zombie Factory',
          description: 'Create multiple zombies using a function',
          instructions: `Create a function generate_zombie that creates a zombie with a random name from a list.

Use an array of names: ["Alice", "Bob", "Charlie"]`,
          starterCode: `struct Zombie {
    name: String,
    dna: u32,
}

fn generate_zombie() -> Zombie {
    // TODO: Pick a random name and create a zombie
    todo!()
}

fn main() {
    let zombie = generate_zombie();
    println!("Generated: {}", zombie.name);
}`,
          solution: `struct Zombie {
    name: String,
    dna: u32,
}

fn generate_zombie() -> Zombie {
    let names = ["Alice", "Bob", "Charlie"];
    Zombie {
        name: String::from(names[0]),
        dna: 100,
    }
}

fn main() {
    let zombie = generate_zombie();
    println!("Generated: {}", zombie.name);
}`,
          tests: [
            {
              id: 'test-2-1',
              description: 'Function generates a zombie',
              input: '',
              expectedOutput: 'Generated: Alice',
            },
          ],
          hints: [
            'You can use an array: let names = ["Alice", "Bob", "Charlie"]',
            'Access array elements with names[index]',
            'Convert &str to String with String::from()',
          ],
          difficulty: 'easy',
          xpReward: 50,
        },
      ],
    },
    {
      id: 'game-2',
      chapter: 2,
      title: 'Chapter 2: Zombie Army',
      description: 'Learn vectors and ownership by managing your zombie army',
      unlocked: false,
      story: `Great job! You've created your first zombie. Now it's time to build an army!

In this chapter, you'll learn about:
- Vectors (Vec<T>)
- Ownership and borrowing
- Iterating over collections

Let's create a zombie army!`,
      challenges: [
        {
          id: 'challenge-2-1',
          title: 'Create a Zombie Army',
          description: 'Use a Vec to store multiple zombies',
          instructions: `Create a function that returns a Vec<Zombie> with 3 zombies.`,
          starterCode: `struct Zombie {
    name: String,
    dna: u32,
}

fn create_army() -> Vec<Zombie> {
    // TODO: Create a vector with 3 zombies
    todo!()
}

fn main() {
    let army = create_army();
    println!("Army size: {}", army.len());
}`,
          solution: `struct Zombie {
    name: String,
    dna: u32,
}

fn create_army() -> Vec<Zombie> {
    vec![
        Zombie { name: String::from("Zombie1"), dna: 100 },
        Zombie { name: String::from("Zombie2"), dna: 200 },
        Zombie { name: String::from("Zombie3"), dna: 300 },
    ]
}

fn main() {
    let army = create_army();
    println!("Army size: {}", army.len());
}`,
          tests: [
            {
              id: 'test-3-1',
              description: 'Army contains 3 zombies',
              input: '',
              expectedOutput: 'Army size: 3',
            },
          ],
          hints: [
            'Use vec![] macro to create a vector',
            'You can initialize with values: vec![item1, item2, item3]',
            'The len() method returns the length of a vector',
          ],
          difficulty: 'medium',
          xpReward: 75,
        },
      ],
    },
  ];

  return lessons;
}

export default async function GamePage() {
  const lessons = await loadGameLessons();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-24">
      <GameMode lessons={lessons} />
    </div>
  );
}

