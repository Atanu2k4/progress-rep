const fs = require('fs');

const input = `Day 1: Setup — Python, pip, editor, venv
Day 2: Variables, data types, operators
Day 3: Input/output, comments, indentation
Day 4: if/elif/else
Day 5: for/while loops, break/continue/pass
Day 6: list, tuple
Day 7: dict, set
Day 8: indexing, slicing, list comprehensions
Day 9: functions — def, return, args, defaults
Day 10: *args, **kwargs, scope, lambda, recursion
Day 11: string methods, f-strings, regex basics
Day 12: file handling — open, read/write, with
Day 13: CSV, JSON file handling
Day 14: Practice — mini project (to-do app using files)
Day 15: try/except/finally, raising/custom exceptions
Day 16: OOP — classes, objects, init
Day 17: instance vs class vars, inheritance
Day 18: polymorphism, magic methods, encapsulation
Day 19: import, standard library — os, sys, math, random, datetime
Day 20: pip, requirements.txt, own modules
Day 21: map, filter, reduce, decorators
Day 22: generators, yield, iterators
Day 23: custom context managers, pdb debugging
Day 24: requests library, calling APIs
Day 25: unittest/pytest basics, writing test cases
Day 26: Practice — write tests for earlier mini projects
Day 27-30: Project — pick one: calculator, to-do app, web scraper, quiz game, budget tracker (build end to end)`;

const lines = input.split('\n');
const roadmap = [];

const getPhase = (day) => {
  if (day <= 7) return "Python Basics";
  if (day <= 14) return "Data Structures & Functions";
  if (day <= 20) return "OOP & Modules";
  if (day <= 26) return "Advanced Concepts & Testing";
  return "Final Projects";
};

for (const line of lines) {
  const matchSingle = line.match(/^Day (\d+):\s*(.*)/);
  if (matchSingle) {
    const day = parseInt(matchSingle[1]);
    const title = matchSingle[2];
    roadmap.push({
      day,
      week: Math.ceil(day / 7),
      phase: getPhase(day),
      title,
      topics: [],
      practice: title.toLowerCase().includes('practice') || title.toLowerCase().includes('project') ? title : "",
      isProject: title.toLowerCase().includes('project')
    });
    continue;
  }
  
  const matchRange = line.match(/^Day (\d+)-(\d+):\s*(.*)/);
  if (matchRange) {
    const startDay = parseInt(matchRange[1]);
    const endDay = parseInt(matchRange[2]);
    const title = matchRange[3];
    
    for (let d = startDay; d <= endDay; d++) {
      roadmap.push({
        day: d,
        week: Math.ceil(d / 7),
        phase: getPhase(d),
        title: d === startDay ? title : title + " (Cont.)",
        topics: [],
        practice: title,
        isProject: true
      });
    }
  }
}

fs.writeFileSync('d:/PROJECTS/Progress/progress/data/python-roadmap.json', JSON.stringify(roadmap, null, 2));
console.log('Python roadmap created!');
